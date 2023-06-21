const LOAD_COMMENTS = 'comment/LOAD_COMMENTS'
const ADD_COMMENT = 'comment/ADD_COMMENT'
const EDIT_COMMENT = 'comment/EDIT_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'
const LOAD_ONE_COMMENT = 'comments/LOAD_ONE_COMMENT'

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

const editComment = comment => {
    return {
        type: EDIT_COMMENT,
        comment
    }
}

const deleteComment = comment => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

const loadOneComment = comment => {
    return {
        type: LOAD_ONE_COMMENT,
        comment
    }
}

// THUNKS

export const getComments = photo_id => async dispatch => {
    // console.log("photo_id ====== ", photo_id)
    const res = await fetch(`/api/photos/${photo_id}/comments`)
    if (res.ok) {
        const comments = await res.json()
        // console.log("RES ===== ", res)
        // console.log("COMMENTS ===== ", comments)
        dispatch(loadComments(comments))
        return comments
    }
}

export const createComment = (commentObj) => async dispatch => {
    // console.log('THIS IS THE COMMENT IN THE CREATE COMMENT THUNK ====== ', commentObj)
    const { comment, photoId } = commentObj
    const res = await fetch(`/api/comments/${photoId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "body": comment,
            "photoId": photoId
        })
    })
    // console.log("THIS IS THE RES IN CREATE THUNK ===== ", res)
    if (res.ok) {
        const makeComment = await res.json()
        // console.log("DID WE HIT HERE? ===== ", makeComment)
        dispatch(addComment(makeComment))
        return makeComment
    }
}

export const editCommentThunk = comment => async (dispatch) => {
    const { comment_id } = comment;
    // console.log("comment ======== ", comment)

    const commentFetch = await fetch(`/api/comments/${comment_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })
    if (commentFetch.ok) {
        const editedComment = await commentFetch.json();
        // console.log("EDITED COMMENT ======== ", editedComment)
        dispatch(editComment(editedComment))
        return editedComment
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

export const getOneComment = (photo_id, comment_id) => async dispatch => {
    const res = await fetch(`/api/photos/${photo_id}/${comment_id}`)
    if (res.ok) {
        const response = await res.json()

        dispatch(loadOneComment(response))
        return response
    }
}

// REDUCERS

export default function reducer(state = { oneComment: {}, allComments: {} }, action) {
    switch (action.type) {
        case LOAD_COMMENTS: {
            const newState = { oneComment: {}, allComments: {} }
            // console.log("action.comments======== ", action.comments)
            action.comments.comments.forEach(e => {
                newState.allComments[e.id] = e
            })
            return newState
        }

        case LOAD_ONE_COMMENT: {
            const newState = { ...state, oneComment: {}, allComments: { ...state.allComments } }
            newState.oneComment = action.comment
            return newState
        }

        case ADD_COMMENT: {
            const newState = { ...state, oneComment: { ...state.oneComment }, allComments: { ...state.allComments } }
            newState.allComments[action.comment.id] = action.comment
            return newState
        }

        case EDIT_COMMENT: {
            const newState = { ...state, oneComment: { ...state.oneComment }, allComments: { ...state.allComments } }
            newState.allComments[action.comment.id] = action.comment
            newState.oneComment = action.response
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
