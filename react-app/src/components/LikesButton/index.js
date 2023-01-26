import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllPhotos, createPhoto } from '../../store/photo';
import { addLike, getOnePhoto, removeLike } from '../../store/photo';

function LikeButton({ photo }) {
    const photoState = useSelector(state => Object.values(state.photo.viewAllPhotos))
    const [liked, setLiked] = useState()
    const currentUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    // console.log('PHOTO -======- ', photo)

    useEffect(() => {
        const likeUserCheck = photo.likesComments.userLikes.find(user =>
            currentUser.id === user.user_id
        )
        if (likeUserCheck) setLiked(true)
        else setLiked(false)

    }, [photo.id, photoState, dispatch])



    const likePhoto = (e) => {
        e.preventDefault()
        // console.log("e.value ===== ", e.target.value)
        dispatch(addLike(e.target.value, currentUser.id)).then(() => {
                dispatch(getAllPhotos())
            })
            // setLiked(true)
    }

    const unlikePhoto = (e) => {
        e.preventDefault()
        dispatch(removeLike(e.target.value, currentUser.id)).then(() => {
                dispatch(getAllPhotos())
            })
        // setLiked(false)
    }

    return (
        <div className='likes-button-container'>
            {liked ?
                <button value={photo.id} onClick={unlikePhoto} className='button'>
                    ★
                </button>
                :
                <button value={photo.id} onClick={likePhoto} className='button'>
                    ☆
                </button>}

        </div>

    )

}

export default LikeButton
