const LOAD_FOLLOWERS = '/follows/LOAD_FOLLOWERS'
const LOAD_FOLLOWINGS = '/follows/LOAD_FOLLOWINGS'
const ADD_FOLLOW = '/follows/ADD_FOLLOW'
const DELETE_FOLLOW = '/follows/DELETE_FOLLOW'

// ACTION CREATORS

const getFollowers = followers => {
    return {
        type: LOAD_FOLLOWERS, followers
    }
}

const addFollow = follower => {
    return {
        type: ADD_FOLLOW, follower
    }
}

const deleteFollow = userId => {
    return {
        type: DELETE_FOLLOW, userId
    }
}

// THUNKS

// GET LIST OF PEOPLE THAT IS FOLLOWING THE USER
export const gettingFollowsThunk = (userId) => async dispatch => {
    const response = await fetch(`/api/follows/${userId}/following`)
    if (response.ok) {
        const followers = await response.json()
        dispatch(getFollowers(followers))
        return followers
    }
}

// GET LIST OF PEOPLE THAT THE USER IS FOLLOWS
export const gettingFollowingsThunk = (userId) => async dispatch => {

    const response = await fetch(`/api/follows/${userId}/follower`)

    if (response.ok) {
        const followings = await response.json()
        dispatch(getFollowers(followings))
    }
}

// ADD FOLLOW
export const addingFollowThunk = (userId) => async dispatch => {
    const response = await fetch(`/api/follows/${userId}`, {

        method: "POST"
    })

    if (!response.error) {
        const follower = await response.json()
        dispatch(addFollow(follower))
        return follower
    }
}

// UNFOLLOW
export const deletingFollowThunk = (userId, currentUserId) => async dispatch => {

    const response = await fetch(`/api/follows/${userId}`, {

        method: 'DELETE'
    })

    if (!response.error) {
        const follower = await response.json()
        dispatch(deleteFollow(currentUserId))
        return follower
    }
}

// REDUCER

export default function reducer(state = { Followers: {}, Followings: {}, totalFollowers: 0 }, action) {
    switch (action.type) {
        case LOAD_FOLLOWERS: {

            const newState = { Followers: {}, Followings: {}, totalFollowers: 0 }
            action.followers.Followers.forEach(follower => {
                newState.Followers[follower.id] = follower

                newState.totalFollowers = action.followers.totalFollowers
            })
            return newState
        }
        case LOAD_FOLLOWINGS: {

            const newState = { Followers: {}, Followings: {}, totalFollowers: 0 }
            action.followings.Followings.forEach(following => {

                newState.Followings[following.id] = following
            })

            return newState
        }

        case ADD_FOLLOW: {
            const newState = { Followers: { ...state.Followers }, totalFollowers: 0 }

            newState.Followers[action.follower.follower.id] = action.follower.follower

            newState.totalFollowers = action.follower.totalFollowers
            return newState
        }
        case DELETE_FOLLOW: {
            const newState = { Followers: { ...state.Followers }, totalFollowers: state.totalFollowers }
            delete newState.Followers[action.userId]
            newState.totalFollowers--
            return newState
        }
        default: return state
    }
}
