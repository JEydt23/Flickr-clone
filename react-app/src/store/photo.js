// import { csrfFetch } from './csrf'
const LOAD_ALL_PHOTOS = '/photos/LOAD_ALL_PHOTOS'
const LOAD_ONE_PHOTO = '/photos/LOAD_ONE_PHOTO'
const ADD_PHOTO = '/photos/ADD_PHOTO'
const EDIT_PHOTO = '/photos/EDIT_PHOTO'
const DELETE_PHOTO = '/photos/DELETE_PHOTO'

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

const deletePhoto = photo => {
    return {
        type: DELETE_PHOTO,
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
    // console.log("photoId ===== ", photoId)
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
    console.log("PHOTO 1st ====== ", photo)
    console.log("THEN ID ======= ", id)
    const response = await fetch(`/api/photos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(photo)
    })
    if (response.ok) {
        const photo = await response.json()
        dispatch(editPhoto(photo))
        return photo
    }
}

export const deletingPhoto = id => async dispatch => {
    const response = await fetch(`/api/photos/${id}`, {
        method:"DELETE"
    })
    if (response.ok) {
        const photo = await response.json()
        await dispatch(deletePhoto(id))
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
                newState.viewAllPhotos[e.id] = e
            })
            return newState
        }

        case LOAD_ONE_PHOTO: {
            const newState = { viewOnePhoto: {}, viewAllPhotos: {} }

            newState.viewOnePhoto = action.photo
            return newState
        }

        case ADD_PHOTO: {
            const newState = { ...state, viewOnePhoto: { ...state.photo }, viewAllPhotos: { ...state.viewAllPhotos } }
            newState.viewOnePhoto = action.photo
            return newState
        }

        case EDIT_PHOTO:
            const newState = { ...state, viewOnePhoto: { ...state.photo }, viewAllPhotos: { ...state.viewAllPhotos } }
            newState.viewAllPhotos[action.photo.id] = action.photo
            newState.photo = action.photo
            return newState

        default:
            return state
    }
}
