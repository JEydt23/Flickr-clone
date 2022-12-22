import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getOnePhoto } from '../../store/photo';

function PhotoDetail() {
    const singlePhotoState = useSelector(state => state.photo.viewOnePhoto)
    // const allPhotoState = useSelector(state => Object.values(state.photo.viewAllPhotos))
    const dispatch = useDispatch();
    const { photoId } = useParams();

    // console.log("View ALL PHOTOS STATE ===== ", allPhotoState)
    // console.log("SINGLE PHOTO STATE ===== ", singlePhotoState)


    useEffect(() => {
        dispatch(getOnePhoto(photoId))

    }, [dispatch, photoId])

    return(
        <div>
            <div key={singlePhotoState}>
                <h2>{singlePhotoState.title}</h2>
                <img src={singlePhotoState.file_path} alt={singlePhotoState.title} />
                <p>{singlePhotoState.description}</p>
                <p>Uploaded by {singlePhotoState.username} on {singlePhotoState.date_uploaded}</p>
            </div>
        </div>
    )
}

export default PhotoDetail;
