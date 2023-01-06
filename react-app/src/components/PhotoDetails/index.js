import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { getOnePhoto, deletingPhoto } from '../../store/photo';
import EditPhoto from '../EditPhoto'
import { GetCommentsByPhoto } from '../Comments/Comments';
import CreateComment from '../CreateComment';
import profPic from './defaultprofpic.png'
import './PhotoDetails.css'



function PhotoDetail() {
    const singlePhotoState = useSelector(state => state.photo.viewOnePhoto)
    const commentState = useSelector(state => state.comment.allComments)
    const history = useHistory()
    const dispatch = useDispatch();
    const { photoId } = useParams();
    const currentUser = useSelector(state => state.session.user)
    // console.log('single photo state =========== ', singlePhotoState)

    useEffect(() => {
        dispatch(getOnePhoto(photoId))

    }, [dispatch, photoId, singlePhotoState.id, commentState])

    return (
        <div>
            <div key={singlePhotoState}>
                <div className='photo-background'>
                    <img className='single-photo'
                        src={singlePhotoState.file_path}
                        alt="Photo"
                        onError={e => { e.currentTarget.src = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" }}
                    />
                </div>
                <div className='edit-delete-main' >
                    <div className='edit-box-div'>
                        {currentUser?.id === singlePhotoState.user_id &&
                            <EditPhoto key={singlePhotoState.id} />
                        }

                    </div>
                </div>
                <div className='single-photo-main-box'>
                    <div className='photo-info-box'>
                        <div className='user-name-prof'>

                                <h2><i class="fa-solid fa-user"/> &nbsp; {singlePhotoState.userInfo?.username}</h2>

                        </div>
                        <h4>{singlePhotoState.title}</h4>
                        <p>{singlePhotoState.description}</p>
                        <p> Taken on {singlePhotoState.date_uploaded}</p>
                    </div>
                    <div className='comments'>
                        <GetCommentsByPhoto key={singlePhotoState.id} />
                    </div>
                    <div>
                        <CreateComment key={singlePhotoState.id} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoDetail;
