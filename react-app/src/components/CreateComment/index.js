import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createComment } from "../../store/comment";

function CreateComment() {
    const currentPhoto = useSelector(state => state.photo.viewOnePhoto)

    // console.log("THIS IS CURRENT PHOTO STATE ======= ", currentPhoto)
    const currentUser = useSelector(state => state.session.user)
    const { photoId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [comment, setComment] = useState("")
    const [errors, setErrors] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    useEffect(() => {
        const validationErrors = [];
        if(!currentUser) validationErrors.push('You must be logged in to post a comment.')
        if (comment.length > 500) validationErrors.push("Comment must be shorter than 500 characters.")
        if (comment.trim() == '') validationErrors.push("Letters or numbers are required to post a comment.")
        setErrors(validationErrors)
    }, [currentUser, comment])

    const handleSubmit = async (e) => {
        setShowErrors(true)
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
        <div className="create-comment-div">
            <form onSubmit={handleSubmit} >
                <div>
                    {/* Leave a comment on this photograph */}
                </div>
                <div className="error-list">
                    {
                        showErrors ?
                            errors.map((error, idx) => <li className='create-comment-errors' key={idx}>{error}</li>)
                            : null}
                </div>
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
                    <div className="char-counter-post">
                        {comment.length}/500 characters
                    </div>
                    <button type="submit" className="post-comment-button">Comment</button>
                </div>
            </form>
        </div>
    )
}

export default CreateComment
