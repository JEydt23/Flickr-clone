import {csrfFetch} from './csrf'

const LOAD_LIKES = '/likes/LOAD_LIKES'
const ADD_LIKE = '/likes/ADD_LIKE'
const DELETE_LIKE = '/likes/DELETE_LIKE'

const getLikes = likes => {
    return {
        type: LOAD_LIKES,
        likes
    }
}

const addLike = like => {
    return {
        type: ADD_LIKE,
        like
    }
}

const deleteLike = like => {
    return {
        type: DELETE_LIKE,
        like
    }
}


export const getLikesThunk = () => async dispatch => {
    const response = await csrfFetch('/api/photos/likes')
    if (response.ok){
        const likes = await response.json()
        dispatch(getLikes(likes))
        return likes
    }
}

export const addLikeThunk = () => async dispatch => {
    const response = await csrfFetch('/api/photos/likes')
    if (response.ok){
        const like = await response.json()
        dispatch(addLike(like))
        return like
    }
}

export const deleteLikeThunk = () => async dispatch => {
    const response = await csrfFetch('/api/photos/likes')
    if (response.ok){
        const like = await response.json()
        dispatch(deleteLike(like))
    }
}

export default function reducer(state = { oneLike: {}, allLikes: {}}, action ) {
    switch (action.type) {
        case LOAD_LIKES: {
            const newState = { oneLike: {}, allLikes: {} }
            action.likes.Like.forEach(e => {
                newState.allLikes[e.id] = e
            })
            return newState
        }

        case ADD_LIKE: {
            const newState = { ...state, oneLike: { ...state.oneLike }, allLikes: { ...state.allLikes } }
            newState.oneLike = action.like
            return newState
        }

        case DELETE_LIKE: {
            const newState = { ...state, oneLike: { ...state.oneLike }, allLikes: { ...state.allLikes } }
            delete newState.allLikes[action.like.id]
            return newState
        }
        default:
            return state
    }
}
