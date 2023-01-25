import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllPhotos, createPhoto } from '../../store/photo';
import { addLike, getOnePhoto } from '../../store/photo';
import pro from './pro logo.png'
import './AllPhotos.css'




function AllPhotos() {
  const photoState = useSelector(state => Object.values(state.photo.viewAllPhotos))
  const currentUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPhotos())

  }, [dispatch]);

  function createAPhoto() {
    dispatch(createPhoto())
  }

  const likePhoto = (e) => {
    e.preventDefault()
    console.log("e.value ===== ", e.target.value)
    dispatch(addLike(e.target.value, currentUser.id)).then(() => {
      dispatch(getOnePhoto(e.target.value))
    })
  }

  if (!photoState.length) return null;
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
      <div>
      </div>
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
            <div className='likes-button-container'>
              <button value={photo.id} onClick={likePhoto} className='button'>
                ☆
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPhotos;
