import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getComments } from '../../store/comment';
import { getOnePhoto } from '../../store/photo';
import EditComment from '../EditComment';
// import CreateComment from '../CreateComment';

export const GetCommentsByPhoto = ({photoDetails, comment}) => {
    const dispatch = useDispatch();
    const {photo_id} = useParams();
    // const photoComment = useSelector(state => Object.values(state.comment.allComments))
    // console.log("photoComment ~~~~~~~~~~~~~> ", photoComment)
    const singlePhotoState = useSelector(state => state.photo.viewOnePhoto)
    console.log("singlePhotoState ======= ", singlePhotoState)

    useEffect(() => {
        dispatch(getComments(photo_id))
    }, [dispatch, photo_id, singlePhotoState])


    if (!singlePhotoState.comments) return null;
    return singlePhotoState && (
        <div>
            <ul>
                {Object.values(singlePhotoState.comments).map((ele) => (
                    <li>
                        {/* {console.log("ele here ======= ", ele)} */}
                        {/* {ele.user.first_name} {ele.user.last_name} */}
                        <li >
                            {ele.body}
                            <EditComment key={photoDetails} photoDetails={photoDetails} comment_id={comment}/>
                        </li>
                    </li>
                ))}
            </ul>

        </div>
    )
}
