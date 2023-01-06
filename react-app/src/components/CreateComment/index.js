import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createComment } from "../../store/comment";

function CreateComment() {
    const currentPhoto = useSelector(state => state.photo.viewOnePhoto)

    // console.log("THIS IS CURRENT PHOTO STATE ======= ", currentPhoto)

    const { photoId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [comment, setComment] = useState("")
    const [errors, setErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    useEffect(()=> {
        const validationErrors = [];
        if (comment.length > 500) validationErrors.push("Comment must be shorter than 500 characters.")
        if (comment.trim() == '') validationErrors.push("Letters or numbers are required in the comment.")
        setErrors(validationErrors)
    }, [comment])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!errors.length) {
            const formValues = {
                comment, photoId
            }
            const newComment = await dispatch(createComment(formValues))

            if (newComment) {
                history.push(`/photos/${photoId}`)
            }
            setComment("")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div>Leave a comment on this photograph</div>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div>
                    <label>
                        <input
                            type="text"
                            placeholder="Write a comment here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Post Comment</button>
                </div>
            </form>
        </div>
    )
}

export default CreateComment
