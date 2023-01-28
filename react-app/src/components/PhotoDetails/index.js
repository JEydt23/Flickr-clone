import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getOnePhoto, addLike, removeLike, getAllPhotos } from '../../store/photo';
import { addingFollowThunk, deletingFollowThunk } from '../../store/follow';
import EditPhoto from '../EditPhoto'
import { GetCommentsByPhoto } from '../Comments/Comments';
import CreateComment from '../CreateComment';
import camera from './camera_specs_bw.png'
// import profPic from './defaultprofpic.png'
import './PhotoDetails.css'
// import LikeButton from '../LikesButton';



function PhotoDetail() {
    const singlePhotoState = useSelector(state => state.photo.viewOnePhoto)
    const commentState = useSelector(state => state.comment.allComments)
    const [liked, setLiked] = useState(false)
    const dispatch = useDispatch();
    const { photoId } = useParams();
    const currentUser = useSelector(state => state.session.user)
    const followers = useSelector(state => state.following?.Followers)
    const followerCount = useSelector(state => state.follow.totalFollowers)
    const [following, setFollowing] = useState();

    console.log('single photo state =========== ', singlePhotoState)

    useEffect(() => {
            if (photoId) dispatch(getOnePhoto(photoId))

    }, [photoId, singlePhotoState?.id, commentState, dispatch])

    useEffect(() => {
        const likeUserCheck = singlePhotoState.userLikes?.find(user =>
            currentUser.id === user.user_id)
            if (likeUserCheck) setLiked(true)
            else setLiked(false)
    }, [singlePhotoState?.id])

    useEffect(() => {
        if (followerCount === 0) return setFollowing(false)
        for (let follower in followers) {
            let num = Number(follower)
            if (num == currentUser?.id) {
                return setFollowing(true)
            } else {
                setFollowing(false)
            }
        }
    }, [followers, followerCount, dispatch])

    const likePhoto = (e) => {
        e.preventDefault()
        // console.log("e.value ===== ", e.target.value)
        dispatch(addLike(e.target.value, currentUser.id)).then(() => {
                dispatch(getOnePhoto(photoId))
            })
        setLiked(true)

    }

    const unlikePhoto = (e) => {
        e.preventDefault()
        dispatch(removeLike(e.target.value, currentUser.id)).then(() => {
                dispatch(getOnePhoto(photoId))
            })
        setLiked(false)
    }


    const handleFollowClick = (e) => {
        e.preventDefault()
        dispatch(addingFollowThunk(singlePhotoState.user_id))

        setFollowing(true)

    }

    const handleRemoveFollowClick = (e) => {
        e.preventDefault()
        dispatch(deletingFollowThunk(singlePhotoState.user_id, currentUser.id))

        setFollowing(false)

    }



    const dateConverter = (date) => {
        const newDate = new Date(date)
        return `${newDate.toLocaleString('en-US', { month: 'long' })} ${newDate.getDate()}, ${newDate.getFullYear()}`
    }


    console.log(followerCount, "FOLLOWER COUNT")
    return (
        <div className='whole-page-main-div'>
            <div key={singlePhotoState}>
                <div className='photo-background'>
                    <img className='single-photo'
                        src={singlePhotoState.file_path}
                        alt="Photo"
                        onError={e => { e.currentTarget.src = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" }}
                    />
                </div>
                <div className='likes-button-container'>
                    {liked ?
                        <button value={photoId} onClick={unlikePhoto} className='button'>
                            ★
                        </button>
                        :
                        <button value={photoId} onClick={likePhoto} className='button'>
                            ☆
                        </button>}
                </div>
                <div className='single-photo-main-box'>
                    <div className='left-side'>
                        <div className='photo-info-box'>
                            <div className='user-name-prof'>

                                <h2><i class="fa-solid fa-user" /> &nbsp; {singlePhotoState.userInfo?.username}</h2>

                            {currentUser ?
                                (singlePhotoState.userInfo?.id !== currentUser?.id) &&

                                (following ?
                                    <button className='unfollowBtn' onClick={handleRemoveFollowClick}>
                                       ✓ Following
                                    </button>
                                    :
                                    <button className='followBtn' onClick={handleFollowClick}>
                                      + Follow
                                    </button>
                                )
                                :
                                null
                            }
                            </div>
                            <div className='followContainer'>
                            <div className='authorFollowers'>{followerCount}  followers</div>

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
                                        <div className='likes-and-comments'>
                                            <div className='likes-container'>
                                                <div className='number-likes'>
                                                    {singlePhotoState?.totalLikes}
                                                </div>
                                                <div className='number-likes-text'>
                                                    faves
                                                </div>
                                            </div>
                                            <div className='comments-stats-container'>
                                                <div className='number-comments'>
                                                    {singlePhotoState.comments?.length}
                                                </div>
                                                <div className='comments-count-text'>
                                                    comment(s)
                                                </div>
                                            </div>
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
