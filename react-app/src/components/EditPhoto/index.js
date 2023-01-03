import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { edittingPhoto, getOnePhoto } from '../../store/photo'

function EditPhoto() {
    const updatedThisPhoto = useSelector(state => state.photo.viewOnePhoto)
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
        if (title?.length > 100) validationErrors.push("The title must be greater than 2 characters and less than 40.")
        if (description?.length > 255) validationErrors.push("The description must be shorter than 255 characters.")
        if (!file_path?.match(/\.(gif|png|jpeg|jpg)$/)) validationErrors.push("The photo's URL must end in .gif, .png, .jpeg, or .jpg");
        setErrors(validationErrors)
    }, [title, description, file_path])

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
        const formValues = {
            title, description, file_path
        }
        const edittedPhoto = await dispatch(edittingPhoto(formValues, updatedThisPhoto.id))
        if (edittedPhoto) history.push('/photos')
    }

    return (
        <div>

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
                        placeholder="Image URL for your photo"
                        onChange={(e) => setFile_Path(e.target.value)} />
                </label>
                <label>
                    {/* Tags */}
                    <input
                        type="text"
                        className='tagInput'
                        value={tags}
                        placeholder="Tags"
                        onChange={(e) => setTags(e.target.value)} />
                </label>
                <button type='submit'
                    className='submitButton'
                    disabled={errors.length > 0}>
                    Publish Edited Photo
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

export default EditPhoto
