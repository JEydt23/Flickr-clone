import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editCommentThunk, deleteCommentThunk, getOneComment } from "../../store/comment";

function EditComment( {photoDetails, comment_id }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [comment, setComment] = useState("")
    const [errors, setErrors] = useState([])

    useEffect(()=> {
        const validationErrors = [];
        if (comment.length > 500) validationErrors.push("Comment must be shorter than 255 characters.")
        setErrors(validationErrors)
    }, [comment])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!errors.length) {
            const formValues = {
                comment
            }
            await dispatch(editCommentThunk(formValues)).then(()=>{
                dispatch(getOneComment(photoDetails.id, comment_id))
            })
            setComment("")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >

                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div>
                    <label>
                        <input
                            type="text"
                            placeholder="Edit your comment here!"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Edit Comment</button>
                    <button onClick={async (e) => {
                        e.preventDefault()
                        await dispatch(deleteCommentThunk(comment_id))
                    }}>
                        Delete Comment
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditComment
