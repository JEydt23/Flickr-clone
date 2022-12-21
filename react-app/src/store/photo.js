const LOAD_ALL_PHOTOS = '/photos/LOAD_ALL_PHOTOS'
const LOAD_ONE_PHOTO = '/photos/LOAD_ONE_PHOTO'

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

// THUNKS

// GET ALL PHOTOS THUNK

export const getAllPhotos = () => async dispatch => {
    const response = await fetch(`/api/photos`)
    if (response.ok) {
        const photos = await response.json()
        console.log("photos === ", photos)
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
            console.log("action.photo ==== ", action.photo)
            newState.viewOnePhoto = action.photo
            return newState
        }

        default:
            return state
    }
}
