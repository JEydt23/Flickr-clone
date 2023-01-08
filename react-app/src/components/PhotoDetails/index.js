import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { getOnePhoto, deletingPhoto } from '../../store/photo';
import EditPhoto from '../EditPhoto'
import { GetCommentsByPhoto } from '../Comments/Comments';
import CreateComment from '../CreateComment';
import camera from './camera_specs_bw.png'
// import profPic from './defaultprofpic.png'
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

    const dateConverter = (date) => {
        const newDate = new Date(date)
        return `${newDate.toLocaleString('en-US', { month: 'long' })} ${newDate.getDate()}, ${newDate.getFullYear()}`
    }

    // const zoomPhoto = (e) => {

    //     const zoomElement = document.querySelector(".single-photo");
    //     let zoom = 1;
    //     const ZOOM_SPEED = 0.1;

    //     document.addEventListener("wheel", function (e) {
    //         if (e.deltaY > 0) {
    //             zoomElement.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
    //         } else {
    //             zoomElement.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
    //         }
    //     });
    // }

    const [focused, setFocused] = useState(false)
    const test1 = e => {
        e.preventDefault()
        if (focused === false) {
            setFocused(true)
            document.getElementsByTagName('img')[0].setAttribute("tabindex", 0)
        } else {
            document.getElementsByTagName('img')[0].removeAttribute("tabindex")
            setFocused(false)
        }


    }
    return (
        <div className='whole-page-main-div'>
            <div key={singlePhotoState}>
                <div className='photo-background'>
                    <img className='single-photo'
                        src={singlePhotoState.file_path}

                        alt="Photo"
                        onClick={test1}
                        onError={e => { e.currentTarget.src = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" }}
                    />
                </div>
                <div className='single-photo-main-box'>
                    <div className='left-side'>
                        <div className='photo-info-box'>
                            <div className='user-name-prof'>

                                <h2><i class="fa-solid fa-user" /> &nbsp; {singlePhotoState.userInfo?.username}</h2>

                            </div>
                            <h4>{singlePhotoState.title}</h4>
                            <p>{singlePhotoState.description}</p>
                            {/* <p> Taken on {singlePhotoState.date_uploaded}</p> */}
                        </div>
                        <div className='comments'>
                            <GetCommentsByPhoto key={singlePhotoState.id} />
                        </div>
                        <div>
                            <CreateComment key={singlePhotoState.id} />
                        </div>
                    </div>
                    <div className='center-div'></div>
                    <div className='right-side'>
                        <div className='right-side-div'>
                            <div className='edit-delete-main' >
                                <div className='edit-box-div'>
                                    {currentUser?.id === singlePhotoState.user_id &&
                                        <EditPhoto key={singlePhotoState.id} />
                                    }

                                </div>
                            </div>
                            <div className='misc-info-box'>
                                <div className='tippity-top'>
                                    <div className='number-comments-date'>
                                        <div className='number-comments'>
                                            {singlePhotoState.comments?.length}
                                        </div>
                                        <div className='comments-count-text'>
                                            comment(s)
                                        </div>
                                    </div>
                                    <div className='date-uploaded'>
                                        <div className='taken-on'>
                                            Taken on {dateConverter(singlePhotoState.date_uploaded)}
                                        </div>
                                    </div>
                                </div>
                                <div className='camera-specs'>
                                    <img src={camera}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoDetail;
