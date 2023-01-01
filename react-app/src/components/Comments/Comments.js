import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../store/comment';
// import CreateComment from '../CreateComment';

export const GetCommentsByPhoto = ({ photo }) => {
    const dispatch = useDispatch();
    const photoComment = useSelector(state => Object.values(state.comment.allComments))
    console.log("photoComment ~~~~~~~~~~~~~> ", photoComment)
    useEffect(() => {
        dispatch(getComments(photo?.id))
    }, [dispatch, photo?.id, photoComment])

    if (!photoComment) return null;
    return photoComment && (
        <div>
            <ul>
                {photoComment.map((ele) => (
                    <li>
                        {ele.User.first_name} {ele.User.last_name}
                        <li key={ele.id}>
                            {ele.comment}
                        </li>
                    </li>
                ))}
            </ul>

        </div>
    )
}
