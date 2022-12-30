const LOAD_COMMENTS = 'comment/LOAD_COMMENTS'

// ACTION CREATORS

const loadComments = comments => {
    return {
        type: LOAD_COMMENTS,
        comments
    }
}

// THUNKS

export const getComments = photoId => async dispatch => {
    const res = await fetch(`/api/comments/${photoId}`)
    if (res.ok){
        const comments = await res.json()
        dispatch(loadComments(comments))
        return comments
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

        default:
            return state
    }
}
