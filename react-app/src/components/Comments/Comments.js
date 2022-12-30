import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../store/comment';

export const GetCommentsByPhoto = ({ photo }) => {
    const dispatch = useDispatch();
    const photoComment = useSelector(state => Object.values(state.comment.allComments))

    useEffect(() => {
        dispatch(getComments(photo?.id))
    }, [dispatch, photo?.id])

    return photoComment && (
        <div>
            {photoComment.map((ele) => (
                <li>
                    {ele.User.first_name} {ele.User.last_name}
                    <li key={ele.id}>
                        {ele.comment}
                    </li>
                </li>
            ))}
        </div>
    )
}
