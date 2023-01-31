import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getFollowingPhotoThunk, createPhoto, getAllPhotos } from '../../store/photo';
import { addLike, getOnePhoto, removeLike } from '../../store/photo';
import pro from './pro logo.png'
import './AllPhotos.css'
import { GetCommentsByPhoto } from '../Comments/Comments';
import LikeButton from '../LikesButton';
import { gettingFollowingsThunk } from '../../store/follow';




function AllPhotos() {
  const photoState = useSelector(state => Object.values(state.photo.viewAllPhotos))
  const singlePhotoState = useSelector(state => state.photo.viewOnePhoto)
  const currentUser = useSelector(state => state.session.user)
  const followers = useSelector(state => state.follow?.Followers)
  console.log("FOLLOWERS: ", followers)
  const followersList = Object.values(followers)
  console.log("FOLLOWERS LIST ===== ", followersList)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFollowingPhotoThunk(currentUser?.id))
    dispatch(gettingFollowingsThunk(currentUser?.id))
    // dispatch()

  }, [dispatch, singlePhotoState.likes]);



  // function createAPhoto() {
  //   dispatch(createPhoto())
  // }

  photoState.sort((a, b) => new Date(b.date_uploaded) - new Date(a.date_uploaded))



  // if (!photoState.length) return null;
  console.log("photoState ==== ", photoState)

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

    if (years > 0) {
      return years + " years ago";
    } else if (months > 1) {
      return months + " months ago";
    } else if (days > 1) {
      return days + " days ago";
    } else if (hours > 1) {
      return hours + " hours ago";
    } else if (minutes > 1) {
      return minutes + " minutes ago"
    } else {
      return seconds + " seconds ago"
    }
  }

  return (
    <div className='main-all-photo'>
      {followersList?.length === 0 ?
        <div className='main-404-div'>
          <div className='main-404'>
            You are not following any users
          </div>
          <div>
            <NavLink to='/explore' className="navlink-photos">
              Click here to explore users to follow.
            </NavLink>
          </div>
        </div>
        :
        <div className='photo-gallery'>
          {photoState.map(photo => (
            <div key={photo.id} className='photos-div' >
              {/* {console.log("photo key ===== ", photo)} */}
              <NavLink to={`/photos/${photo.id}`} style={{ textDecoration: "none" }}>
                {/* <h2>{photo.title}</h2> */}
                <div className='user-date'>
                  <div className='username-all-photo'>
                    {photo.User?.username} <img src={pro} alt="pro" className='pro-img'></img>
                  </div>
                  <div className='date-added-all-photo'>
                    {timeSince(photo.date_uploaded)}
                  </div>
                </div>
                {/* <img src={photo.file_path} alt={photo.title} /> */}
                <img className="all-photos-photo"
                  src={photo.file_path}
                  alt={photo.title}
                  onError={e => { e.currentTarget.src = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" }} />
                {/* <p>{photo.description}</p>
              <p>Uploaded by  on {photo.date_uploaded}</p> */}
              </NavLink>
              <LikeButton photo={photo} />
            </div>
          ))}
        </div>}
    </div>
  );
}

export default AllPhotos;


{/* <div className='likes-button-container'>
{console.log("XXXXXXXXXX ===", photo.likesComments.userLikes)}
  {photo.likesComments.userLikes.includes(currentUser.id) ?
  <button value={photo.id} onClick={unlikePhoto} className='button'>
  ★
  </button>
  :
  <button value={photo.id} onClick={likePhoto} className='button'>
    ☆
  </button>}
</div> */}
