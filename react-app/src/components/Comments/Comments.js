import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../store/comment';

export const GetCommentsByPhoto = ({ photo }) => {
    const dispatch = useDispatch();
    const photoComment = useSelector(state => state.allComments)
    console.log("photoComment ~~~~~~~~~~~~~> ", photoComment)
    useEffect(() => {
        dispatch(getComments(photo?.id))
    }, [dispatch, photo?.id])

    if (!photoComment) return null;
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
