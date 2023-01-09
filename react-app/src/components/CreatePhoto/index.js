import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { createPhoto } from '../../store/photo';
import './CreatePhoto.css'

function CreatePhoto() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file_path, setFile_Path] = useState("")
    const [tags, setTags] = useState("")
    const [errors, setErrors] = useState([]);
    const [showErrors, setShowErrors] = useState(false)

    useEffect(() => {
        console.log(errors.length, "ERRORS ON LOAD")
        const validationErrors = [];
        // if (!title) validationErrors.push("You must give this photograph a title.")
        if (title.length < 2 || title.length > 40) validationErrors.push("The title must be greater than 2 characters and less than 40.")
        if (title.trim() == '') validationErrors.push("Letters or numbers are required in the title.")
        if (description.trim() == '') validationErrors.push("Letters or numbers are required in the description.")
        if (description.length > 255) validationErrors.push("The description must be shorter than 255 characters.")
        if (tags.length > 25) validationErrors.push("The tag can't be longer than 25 characters.")
        if (tags.trim() == '') validationErrors.push("Can't start tag with whitespace.")
        if (!file_path?.match(/\.(gif|png|jpeg|jpg)$/)) validationErrors.push("The photo's URL must end in .gif, .png, .jpeg, or .jpg");
        setErrors(validationErrors)
    }, [title, description, file_path, tags])

    // useEffect(()=>{
    //     dispatch(createPhoto())
    // }, [dispatch])

    const handleSubmit = async (e) => {
        setShowErrors(true)
        e.preventDefault();
        if (!errors.length) {
            const formValues = {
                title, description, file_path, tags
            }
            const newPhoto = await dispatch(createPhoto(formValues))
            // console.log("NEWPHOTO ====== ", newPhoto)
            if (newPhoto) {
                history.push(`/photos`)

            }
        }
    }

    return (
        <div className='main'>
            <div className='background-img'>
            <form className='login-form' onSubmit={handleSubmit}>
                <h2 className='login-head'>Upload a new photo</h2>
                <label>
                    <input
                        type="text"
                        placeholder='Title (required)'
                        className='titleInput'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                </label>
                <div className='char-counter'>
                    {title.length}/40 characters
                </div>
                <label>
                    <textarea
                        type="text"
                        className='create-photo-input'
                        value={description}
                        placeholder="Describe this photo... (required)"
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                </label>
                <div className='char-counter'>
                    {description.length}/255 characters
                </div>
                <label>
                    {/* File_path */}
                    <input
                        type="text"
                        className='file_pathInput'
                        value={file_path}
                        placeholder="Image URL for your photo (required)"
                        onChange={(e) => setFile_Path(e.target.value)}
                        required />
                </label>
                <label>
                    {/* Tags */}
                    <input
                        type="text"
                        className='tagInput'
                        value={tags}
                        placeholder="Tags for this photo (optional)"
                        onChange={(e) => setTags(e.target.value)} />
                </label>
                <button type='submit'
                    className='submitButton'>
                    Publish Photo
                </button>
                <ul className='login-errors'>
                    {
                        showErrors ?
                            errors.map(error => (
                                <li key={error}>{error}</li>
                            ))
                            : null
                    }
                </ul>
            </form>
            </div>
        </div>
    )
}

export default CreatePhoto
