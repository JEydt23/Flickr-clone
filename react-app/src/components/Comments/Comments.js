import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../store/comment';
import EditComment from '../EditComment';
import './Comments.css'


export const GetCommentsByPhoto = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const singlePhotoState = useSelector(state => state.photo.viewOnePhoto)

    useEffect(() => {
        dispatch(getComments(singlePhotoState.id))


    }, [dispatch, singlePhotoState.id])


    if (!singlePhotoState.comments) return null;
    return singlePhotoState && (
        <div className='comments-div'>
                {/* <h4>Comments</h4> */}
                {Object.values(singlePhotoState.comments).map((ele) => (
                    <li className='comment-name'>
                        {/* {console.log("ele here ======= ", ele)} */}
                        {ele.userInfo.first_name} {ele.userInfo.last_name}
                        <li className='comment-body'>
                            {ele.body}
                            {currentUser?.id === ele.user_id &&
                                <EditComment key={ele.id} photoDetails={ele.photo_id} comment_id={ele.id} />
                            }
                        </li>
                    </li>
                ))}


        </div>
    )
}
