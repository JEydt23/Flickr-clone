import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllPhotos } from '../../store/photo';
import LikeButton from '../LikesButton';

import './Explore.css'

const Explore = () => {
    const photoState = useSelector(state => Object.values(state.photo.viewAllPhotos))
    const singlePhotoState = useSelector(state => state.photo.viewOnePhoto)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllPhotos())

    }, [dispatch, singlePhotoState.likes]);

    photoState.sort((a, b) => new Date(b.date_uploaded) - new Date(a.date_uploaded))

    if (!photoState.length) return null;

    return (

        <div className='explore-photo-container'>
            <ul className='image-gallery'>

                    {photoState.map(photo => (
                        <li key={photo.id}
                        // className='image-gallery'
                        >

                            <NavLink to={`/photos/${photo.id}`} style={{ textDecoration: "none" }}>
                            {/* <div className='user-date'> */}
                            {/* <div className='username-all-photo'>
                                    {photo.User?.username}
                                </div> */}
                            {/* </div> */}
                            <img
                                // className="all-photos-photo"
                                src={photo.file_path}
                                alt={photo.title}
                                onError={e => { e.currentTarget.src = "https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" }} />
                            </NavLink>
                            {/* <LikeButton photo={photo} /> */}
                        </li>
                    ))}

            </ul>
        </div>

    )
}

export default Explore
