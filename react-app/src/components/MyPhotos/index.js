import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { getFollowingPhotoThunk } from '../../store/photo';
// import pro from './pro logo.png'
import LikeButton from '../LikesButton';
import { getMyPhotos } from '../../store/photo';
// import { gettingFollowingsThunk } from '../../store/follow';

function MyPhotos() {
    const photoState = useSelector(state => Object.values(state.photo?.viewAllPhotos))
    // const singlePhotoState = useSelector(state => state.photo.viewOnePhoto)
    const currentUser = useSelector(state => state.session.user)
    //   const followers = useSelector(state => state.follow?.Followers)
    //   console.log("FOLLOWERS: ", followers)
    //   const followersList = Object.values(followers)
    //   console.log("FOLLOWERS LIST ===== ", followersList)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyPhotos(currentUser?.id))

    }, [dispatch, currentUser]);

    photoState.sort((a, b) => new Date(b.date_uploaded) - new Date(a.date_uploaded))
    // console.log("photoState ==== ", photoState)

    function timeSince(dateString) {
        let currentTime = new Date();
        let date = new Date(dateString);
        let timeDifference = currentTime - date;

        let years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
        let months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44));
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor(timeDifference / (1000 * 60 * 60));
        let minutes = Math.floor(timeDifference / (1000 * 60));
        let seconds = Math.floor(timeDifference / 1000)

        if (years > 0 && years < 2) return `${years} year ago`
        if (years > 0) return `${years} years ago`

        if (months > 0 && months < 2) return `${months} month ago`
        if (months > 0) return `${months} months ago`

        if (days > 0 && days < 2) return `${days} day ago`
        if (days > 0) return `${days} days ago`

        if (hours > 0 && hours < 2) return `${hours} hour ago`
        if (hours > 0) return `${hours} hours ago`

        if (minutes > 0 && minutes < 2) return `${minutes} minute ago`
        if (minutes > 0) return `${minutes} minutes ago`

        if (seconds > 0 && seconds < 2) return `${seconds} second ago`
        return seconds > 0 ? `${seconds} seconds ago` : `0 seconds ago`
    }

    return (
        <div className='main-all-photo'>
            {photoState?.length === 0 ?
                <div className='main-404-div'>
                    <div className='main-404'>
                        You do not have any photos uploaded.
                    </div>
                    <div>
                        <NavLink to='/photos/new' className="navlink-photos">
                            Click here to upload your first photo.
                        </NavLink>
                    </div>
                </div>
                :
                <div className='photo-gallery'>
                    {photoState.map(photo => (
                        <div key={photo.id} className='photos-div' >
                            <NavLink to={`/photos/${photo.id}`} style={{ textDecoration: "none" }}>
                                <div className='user-date'>
                                    <div className='username-all-photo'>
                                        {/* {photo.User?.username} <img src={pro} alt="pro" className='pro-img'></img> */}
                                    </div>
                                    <div className='date-added-all-photo'>
                                        {timeSince(photo.date_uploaded)}
                                    </div>
                                </div>
                                <img className="all-photos-photo"
                                    src={photo.file_path}
                                    alt={photo.title}
                                    onError={e => { e.currentTarget.src = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" }} />
                            </NavLink>
                            <LikeButton photo={photo} />
                        </div>
                    ))}
                </div>}
        </div>
    );
}

export default MyPhotos;
