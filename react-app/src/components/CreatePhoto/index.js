import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { createPhoto } from '../../store/photo';

function CreatePhoto() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file_path, setFile_Path] = useState("")
    const [tags, setTags] = useState("")
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        const validationErrors = [];
        // if (!title) validationErrors.push("You must give this photograph a title.")
        if (title.length < 2 || title.length > 40) validationErrors.push("The title must be greater than 2 characters and less than 40.")
        if (description.length > 255) validationErrors.push("The description must be shorter than 255 characters.")
        if (file_path.length > 255) validationErrors.push("The file path of your image must be shorter than 255 characters.")
        setErrors(validationErrors)
    }, [title, description, file_path])

    useEffect(()=>{
        dispatch(createPhoto())
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formValues = {
            title, description, file_path
        }
        const newPhoto = await dispatch(createPhoto(formValues))
        if (newPhoto){
            history.push(`/photos/${newPhoto.id}`)

        }
    }

    return (
        <div>
            <h1>Hi</h1>
            <form className='photo-form' onSubmit={handleSubmit}>
                <label>
                    {/* Title */}
                    <input
                        type="text"
                        placeholder='Title'
                        className='titleInput'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required />
                </label>
                <label>
                    {/* Description */}
                    <textarea
                        type="text"
                        className='descriptionInput'
                        value={description}
                        placeholder="Describe this photo..."
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                </label>
                <label>
                    {/* File_path */}
                    <input
                        type="text"
                        className='file_pathInput'
                        value={file_path}
                        placeholder="Image URL for your story"
                        onChange={(e) => setFile_Path(e.target.value)} />
                </label>
                <label>
                    {/* Tags */}
                    <input
                        type="text"
                        className='tagInput'
                        value={tags}
                        placeholder="Image URL for your story"
                        onChange={(e) => setTags(e.target.value)} />
                </label>
                <button type='submit'
                    className='submitButton'
                    disabled={errors.length > 0}>
                    Publish Photo
                </button>
                <ul className='errors'>
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </form>
        </div>
    )
}

export default CreatePhoto
