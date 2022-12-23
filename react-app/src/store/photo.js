// import { csrfFetch } from './csrf'
const LOAD_ALL_PHOTOS = '/photos/LOAD_ALL_PHOTOS'
const LOAD_ONE_PHOTO = '/photos/LOAD_ONE_PHOTO'
const ADD_PHOTO = '/photos/ADD_PHOTO'
const EDIT_PHOTO = '/photos/EDIT_PHOTO'

// ACTION CREATORS

const allPhotos = photos => {
    return {
        type: LOAD_ALL_PHOTOS,
        photos
    }
}

const onePhoto = photo => {
    return {
        type: LOAD_ONE_PHOTO,
        photo
    }
}

const addPhoto = photo => {
    return {
        type: ADD_PHOTO,
        photo
    }
}

const editPhoto = photo => {
    return {
        type: EDIT_PHOTO,
        photo
    }
}


// THUNKS

// GET ALL PHOTOS THUNK

export const getAllPhotos = () => async dispatch => {
    const response = await fetch(`/api/photos`)
    if (response.ok) {
        const photos = await response.json()
        // console.log("photos === ", photos)
        dispatch(allPhotos(photos))
        return photos
    }
}

// GET ONE PHOTO THUNK

export const getOnePhoto = (photoId) => async dispatch => {
    console.log("photoId ===== ", photoId)
    const response = await fetch(`/api/photos/${photoId}`)
    if (response.ok) {
        const photo = await response.json()
        console.log("ONE PHOTO THUNK RES.OK ==== ", photo)
        dispatch(onePhoto(photo))
        return photo
    }
}

// CREATE A PHOTO THUNK

export const createPhoto = (photo) => async dispatch => {
    // console.log("***** PHOTO ==== ", photo)
    const response = await fetch(`/api/photos`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(photo)
    })
    if (response.ok) {
        const photo = await response.json()
        dispatch(addPhoto(photo))
        return photo
    }
}

// EDIT A PHOTO THUNK

export const edittingPhoto = (photo, id) => async dispatch => {
    const response = await fetch(`/api/photo/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photo)
    })
    if (response.ok) {
        const photo = response.json()
        dispatch(editPhoto(photo))
        return photo
    }
}

// PHOTO REDUCER

export default function reducer(state = { viewOnePhoto: {}, viewAllPhotos: {} }, action) {
    switch (action.type) {
        case LOAD_ALL_PHOTOS: {
            const newState = { viewOnePhoto: {}, viewAllPhotos: {} }
            action.photos.Photos.forEach(e => {
                // console.log("e ===== ", e)
                newState.viewAllPhotos[e.User.id] = e
            })
            return newState
        }

        case LOAD_ONE_PHOTO: {
            const newState = { viewOnePhoto: {}, viewAllPhotos: {} }
            // console.log("action.photo ==== ", action.photo)
            newState.viewOnePhoto = action.photo
            return newState
        }

        case ADD_PHOTO: {
            const newState = { ...state, viewOnePhoto: { ...state.viewOnePhoto }, viewAllPhotos: { ...state.viewAllPhotos } }
            console.log("KIMDRACULA action.photo ====== ", action.photo)
            newState.viewOnePhoto = action.photo
            console.log("RISK newState =========== ", newState)
            return newState
        }

        case EDIT_PHOTO:
            const newState = { ...state, viewOnePhoto: { ...state.viewOnePhoto }, viewAllPhotos: { ...state.viewAllPhotos } }
            newState.viewAllPhotos[action.photo.id] = action.photo
            newState.photo = action.photo
            return newState

        default:
            return state
    }
}
