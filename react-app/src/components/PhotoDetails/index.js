import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { getOnePhoto, deletingPhoto } from '../../store/photo';
import EditPhoto from '../EditPhoto'
import { GetCommentsByPhoto } from '../Comments/Comments';
import CreateComment from '../CreateComment';


function PhotoDetail() {
    const singlePhotoState = useSelector(state => state.photo.viewOnePhoto)
    const history = useHistory()
    // const allPhotoState = useSelector(state => Object.values(state.photo.viewAllPhotos))
    const dispatch = useDispatch();
    const { photoId } = useParams();

    // console.log("View ALL PHOTOS STATE ===== ", allPhotoState)
    // console.log("SINGLE PHOTO STATE ===== ", singlePhotoState)


    useEffect(() => {
        dispatch(getOnePhoto(photoId))

    }, [dispatch, photoId])

    return (
        <div>
            <div key={singlePhotoState}>
                <h2>{singlePhotoState.title}</h2>
                <div>
                    <EditPhoto key={singlePhotoState.id} />
                </div>
                <div>

                    <button onClick={async (e) => {
                        e.preventDefault()
                        await dispatch(deletingPhoto(singlePhotoState.id))
                        await history.push('/photos')
                    }}>Delete Photo</button>
                </div>
                <img src={singlePhotoState.file_path} alt={singlePhotoState.title} />
                <p>{singlePhotoState.description}</p>
                <p>Uploaded by {singlePhotoState.username} on {singlePhotoState.date_uploaded}</p>
            </div>
            <div>
                <GetCommentsByPhoto key={singlePhotoState.id} />
            </div>
            <div>
                <CreateComment key={singlePhotoState.id}/>
            </div>
        </div>
    )
}

export default PhotoDetail;
