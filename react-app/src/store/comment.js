const LOAD_COMMENTS = 'comment/LOAD_COMMENTS'
const ADD_COMMENT = 'comment/ADD_COMMENT'

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

// THUNKS

export const getComments = photoId => async dispatch => {
    const res = await fetch(`/api/comments/${photoId}`)
    if (res.ok) {
        const comments = await res.json()
        dispatch(loadComments(comments))
        return comments
    }
}

export const createComment = comment => async dispatch => {
    console.log('THIS IS THE COMMENT IN THE CREATE COMMENT THUNK ====== ', comment)
    const { body, photoId } = comment
    const res = await fetch(`/api/comments/${photoId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "body": body,
            "photoId": photoId
        })
    })
    if (res.ok) {
        const makeComment = await res.json()
        dispatch(addComment(makeComment))
        return makeComment
    }
}
// REDUCERS

export default function reducer(state = { oneComment: {}, allComments: {} }, action) {
    switch (action.type) {
        case LOAD_COMMENTS: {
            const newState = { oneComment: {}, allComments: {} }
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

        default:
            return state
    }
}
