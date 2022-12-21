import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPhotos } from '../../store/photo';



function AllPhotos() {
    const storiesState = useSelector(state => state.photo.viewAllPhotos)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getAllPhotos())


    }, [dispatch]);

    if (!storiesState.length) return null;
    return (
      <div>
        {storiesState.map(photo => (
          <div key={photo.id}>
            <h2>{photo.title}</h2>
            <p>{photo.description}</p>
            <img src={photo.file_path} alt={photo.title} />
            <p>Uploaded by {photo.User.username} on {photo.date_uploaded}</p>
            <p>Tags: {photo.tags.join(', ')}</p>
          </div>
        ))}
      </div>
    );
  }

  export default AllPhotos;
