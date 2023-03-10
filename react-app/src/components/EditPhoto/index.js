import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { edittingPhoto, getOnePhoto, deletingPhoto } from '../../store/photo'

function EditPhoto() {
    const updatedThisPhoto = useSelector(state => state.photo.viewOnePhoto)
    const currentUser = useSelector(state => state.session.user)
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file_path, setFile_Path] = useState("")
    const [tags, setTags] = useState("")
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const validationErrors = [];
        // if (title?.length < 2 ) validationErrors.push("The title must be greater than 2 characters.")
        if (title?.length > 40) validationErrors.push("The title must be less than 40 characters.")
        if (title?.trim() == '') validationErrors.push("Letters or numbers are required in the title.")
        if (description?.length > 255) validationErrors.push("Description must be shorter than 255 characters.")
        if (description?.trim() == '') validationErrors.push("Letters or numbers are required in the description.")
        // if (tags?.trim() == '') validationErrors.push("Can't start tag with whitespace.")
        if (tags?.length > 25) validationErrors.push("The tag can't be longer than 25 characters.")
        if (!file_path?.match(/\.(gif|png|jpeg|jpg)$/)) validationErrors.push("The photo's URL must end in .gif, .png, .jpeg, or .jpg");
        setErrors(validationErrors)
    }, [title, description, file_path, tags])

    useEffect(() => {
        dispatch(getOnePhoto(id))
    }, [dispatch, id])

    useEffect(() => {
        setTitle(updatedThisPhoto.title)
        setDescription(updatedThisPhoto.description)
        setFile_Path(updatedThisPhoto.file_path)
        setTags(updatedThisPhoto.tags)
    }, [updatedThisPhoto])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!errors.length) {

            const formValues = {
                title, description, file_path, tags
            }
            const edittedPhoto = await dispatch(edittingPhoto(formValues, updatedThisPhoto.id))
            if (edittedPhoto) history.push(`/photos/user/${currentUser.id}/current`)
        }
    }

    return (
        <div className='edit-form-main'>
            <h4>Edit your photo</h4>
            <form className='edit-photo-form' onSubmit={handleSubmit}>
                <label>
                    {/* Title */}
                    <input
                        type="text"
                        placeholder='Title'
                        className='editInput'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                </label>
                <label>
                    {/* Description */}


                    <textarea
                        type="text"
                        className='editInput'
                        value={description}
                        placeholder="Describe this photo..."
                        // oninput="this.style.height = ''; this.style.height = this.scrollHeight +'px'"
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                </label>
                <label>
                    {/* File_path */}
                    <input
                        type="url"
                        className='editInput'
                        value={file_path}
                        placeholder="Image URL for your photo"
                        onChange={(e) => setFile_Path(e.target.value)} />
                </label>
                <label>
                    {/* Tags */}
                    <input
                        type="text"
                        className='editInput'
                        value={tags}
                        placeholder="Tags"
                        onChange={(e) => setTags(e.target.value)} />
                </label>
                <div className='errors'>
                    {errors.map(error => (
                        <li className='edit-photo-error' key={error}>{error}</li>
                    ))}
                </div>
                <div className='edit-button-div'>
                    <button type='submit'
                        className='submitButton'
                    // disabled={errors.length > 0}
                    >
                        Publish Edited Photo
                    </button>
                    <div >
                        {currentUser?.id === updatedThisPhoto.user_id &&
                            <button className='delete-photo-button' onClick={async (e) => {
                                e.preventDefault()
                                await dispatch(deletingPhoto(updatedThisPhoto.id))
                                await history.push(`/photos/user/${currentUser.id}/current`)
                            }}>Delete Photo</button>}
                    </div>
                </div>
            </form>
        </div>
    )

}

export default EditPhoto
