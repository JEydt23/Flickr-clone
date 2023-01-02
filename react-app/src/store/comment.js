const LOAD_COMMENTS = 'comment/LOAD_COMMENTS'
const ADD_COMMENT = 'comment/ADD_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'

// ACTION CREATORS

const loadComments = comments => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

const addComment = comment => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

const deleteComment = comment => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}
// THUNKS

export const getComments = photoId => async dispatch => {
    console.log("GET COMMENTS THUNK PHOTOID ====== ", photoId)
    const res = await fetch(`/api/comments/${photoId}`)
    if (res.ok) {
        const comments = await res.json()
        console.log("COMMENTS in THUNK ==== ", comments)
        dispatch(loadComments(comments))
        return comments
    }
}

export const createComment = (commentObj) => async dispatch => {
    console.log('THIS IS THE COMMENT IN THE CREATE COMMENT THUNK ====== ', commentObj)
    const { comment, photoId } = commentObj
    const res = await fetch(`/api/comments/${photoId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "body": comment,
            "photoId": photoId
        })
    })
    console.log("THIS IS THE RES IN CREATE THUNK ===== ", res)
    if (res.ok) {
        const makeComment = await res.json()
        console.log("DID WE HIT HERE? ===== ", makeComment)
        dispatch(addComment(makeComment))
        return makeComment
    }
}

export const deleteCommentThunk = commentId => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })
    if (res.ok) {
        dispatch(deleteComment(commentId))
    }
}
// REDUCERS

export default function reducer(state = { oneComment: {}, allComments: {} }, action) {
    switch (action.type) {
        case LOAD_COMMENTS: {
            const newState = { oneComment: {}, allComments: {} }
            console.log("DID THIS HIT THE REDUCER?")
            action.comments.forEach(e => {
                newState.allComments[e.id] = e
            })
            return newState
        }
        case ADD_COMMENT: {
            const newState = { ...state, oneComment: { ...state.oneComment }, allComments: { ...state.allComments } }
            newState.allComments[action.comment.id] = action.comment
            return newState
        }
        case DELETE_COMMENT: {
            const newState = { ...state, oneComment: { ...state.oneComment }, allComments: { ...state.allComments } }
            delete newState.allComments[action.comment]
            return newState
        }

        default:
            return state
    }
}
