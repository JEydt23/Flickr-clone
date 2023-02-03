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
    const [photo, setPhoto] = useState(null);
    const [photoLoading, setPhotoLoading] = useState(false)
    const [photoPreview, setPhotoPreview] = useState(null)

    useEffect(() => {
        console.log(errors.length, "ERRORS ON LOAD")
        const validationErrors = [];
        // if (!title) validationErrors.push("You must give this photograph a title.")
        // if (title.length < 2 ) validationErrors.push("The title must be greater than 2 characters.")
        if (title.length > 40) validationErrors.push("The title must be less than 40 characters.")
        if (title.trim() == '') validationErrors.push("Letters or numbers are required in the title.")
        if (description.trim() == '') validationErrors.push("Letters or numbers are required in the description.")
        if (description.length > 255) validationErrors.push("The description must be shorter than 255 characters.")
        if (tags.length > 25) validationErrors.push("The tag can't be longer than 25 characters.")
        // if (tags.trim() == '') validationErrors.push("Can't start tag with whitespace.")
        // if (!file_path?.match(/\.(gif|png|jpeg|jpg)$/)) validationErrors.push("The photo's URL must end in .gif, .png, .jpeg, or .jpg");
        setErrors(validationErrors)
    }, [title, description, tags])

    // useEffect(()=>{
    //     dispatch(createPhoto())
    // }, [dispatch])

    const handleSubmit = async (e) => {
        setShowErrors(true)
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title)
        formData.append("description", description)
        formData.append("tags", tags)
        formData.append("photo", photo)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setPhotoLoading(true);
        if (!errors.length) {
            dispatch(createPhoto(formData))
            setPhotoLoading(false)
            history.push("/explore")
        } else {
            setPhotoLoading(false)
            console.log("ERROR")
        }



        // OLD PRE-AWS CODE
        // if (!errors.length) {
        //     const formValues = {
        //         title, description, file_path, tags
        //     }
        //     const newPhoto = await dispatch(createPhoto(formValues))
        //     // console.log("NEWPHOTO ====== ", newPhoto)
        //     if (newPhoto) {
        //         history.push(`/photos`)

        //     }
        // }
    }
    const updatePhoto = (e) => {
        const file = e.target.files[0];
        setPhoto(file)
        setPhotoPreview(URL.createObjectURL(file))
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
                    <div className='aws-photo-upload-container'>
                        <img src={photoPreview ? photoPreview : null} className='photo-preview' />
                        <label className='aws'>
                            Select File
                            {/* Pick a photo to upload */}
                            <input
                                type="file"
                                className='file_pathInput'
                                accept='photo/*'
                                // value={file_path}
                                // placeholder="Pick a photo (required)"
                                // onChange={(e) => setFile_Path(e.target.value)}
                                onChange={updatePhoto}
                                required />
                        </label>
                    </div>
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
                    {(photoLoading) && <h1>Loading...</h1>}
                    <div className='login-errors'>
                        {
                            showErrors ?
                                errors.map(error => (
                                    <li key={error}>{error}</li>
                                ))
                                : null
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePhoto
