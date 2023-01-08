import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editCommentThunk, deleteCommentThunk, getOneComment } from "../../store/comment";

function EditComment({ photoDetails, comment_id }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [comment, setComment] = useState("")
    const [errors, setErrors] = useState([])
    const updateThisComment = useSelector(state => state.comment.allComments)
    const [showErrors, setShowErrors] = useState(false)
    // console.log("updateThisComment ============", updateThisComment)
    // console.log(photoDetails,"00000000000000000000000 photoDETAILS")
    // console.log(comment_id, "99999999999999999999 commentID")


    useEffect(() => {
        const validationErrors = [];
        if (comment.length > 500) validationErrors.push("Comment must be shorter than 500 characters.")
        if (comment.trim() == '') validationErrors.push("Letters or numbers are required in the comment.")
        setErrors(validationErrors)

    }, [comment])


    const handleSubmit = async (e) => {
        setShowErrors(true)
        e.preventDefault();
        if (!errors.length) {
            const formValues = {
                "body": comment, comment_id
            }
            await dispatch(editCommentThunk(formValues))
            // .then(()=>{
            //     dispatch(getOneComment(photoDetails, comment_id))
            // })

            setComment("")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >

                <ul>
                    {
                        showErrors ?
                            errors.map((error, idx) => <li key={idx}>{error}</li>)
                            : null}
                </ul>
                <div>
                    <label>
                        <textarea className="create-comment-input"
                            type="text"
                            placeholder="Edit your comment here!"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </label>
                    <div className="char-counter">
                        {comment.length}/500 characters
                    </div>
                    <button className="edit-comment-button" type="submit">Edit Comment </button>
                    &nbsp;
                    <i class="fa fa-trash" aria-hidden="true" onClick={async (e) => {
                        e.preventDefault()
                        await dispatch(deleteCommentThunk(comment_id))
                    }}>
                        {/* Delete Comment */}
                        </i>
                    {/* </button> */}
                </div>
            </form>
        </div>
    )
}

export default EditComment
