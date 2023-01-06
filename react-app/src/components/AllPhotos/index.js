import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllPhotos, createPhoto} from '../../store/photo';
import pro from './pro logo.png'
import './AllPhotos.css'




function AllPhotos() {
  const photoState = useSelector(state => Object.values(state.photo.viewAllPhotos))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPhotos())

  }, [dispatch]);

  function createAPhoto() {
    dispatch(createPhoto())
  }
  if (!photoState.length) return null;
  // console.log("photoState ==== ", photoState)
  return (
    <div className='main-all-photo'>
      <div>
      </div>
      <div className='photo-gallery'>
        {photoState.map(photo => (
          <div key={photo.id} className='photos-div'>
            {console.log("photo key ===== ", photo)}
            <NavLink to={`/photos/${photo.id}`}>
              {/* <h2>{photo.title}</h2> */}
              <div className='user-date'>
                <div className='username-all-photo'>
                  {photo.User?.username} <img src={pro} alt="pro" className='pro-img'></img>
                </div>
                <div className='date-added-all-photo'>
                  {photo.date_uploaded}
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

          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPhotos;
