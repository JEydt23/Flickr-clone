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
            {/* { console.log("photo key ===== ", photo) } */}
            <NavLink to={`/photos/${photo.id}`}>
            <h2>{photo.title}</h2>
            <img src={photo.file_path} alt={photo.title} />
            <p>{photo.description}</p>
            <p>Uploaded by {photo.username} on {photo.date_uploaded}</p>
            </NavLink>
            {/* <p>Tags: {photo.tags.join(', ')}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPhotos;
