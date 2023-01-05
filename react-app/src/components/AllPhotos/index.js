import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllPhotos, createPhoto } from '../../store/photo';




function AllPhotos() {
  const photoState = useSelector(state => Object.values(state.photo.viewAllPhotos))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllPhotos())

  }, [dispatch]);

  function createAPhoto(){
    dispatch(createPhoto())
  }
  if (!photoState.length) return null;
  // console.log("photoState ==== ", photoState)
  return (
    <div>
      <div>

        <button className='createPhotoButton'>
          <NavLink to={`/photos/new`} className='create-a-photo' onClick={createAPhoto}>
            Upload a Photo
          </NavLink>
        </button>
      </div>
      <div>
        {photoState.map(photo => (
          <div key={photo.id}>
            { console.log("photo key ===== ", photo) }
            <NavLink to={`/photos/${photo.id}`}>
            <h2>{photo.title}</h2>
            {/* <img src={photo.file_path} alt={photo.title} /> */}
            <img
                    src={photo.file_path}
                    alt={photo.title}
                    onError={e => { e.currentTarget.src = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" } } />
            <p>{photo.description}</p>
            <p>Uploaded by {photo.User?.username} on {photo.date_uploaded}</p>
            </NavLink>

          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPhotos;
