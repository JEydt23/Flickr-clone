const LOAD_ALL_PHOTOS = '/photos/LOAD_ALL_PHOTOS'

const allPhotos = photos => {
    return {
        type: LOAD_ALL_PHOTOS, photos
    }
}


export const getAllPhotos = () => async dispatch => {
    const response = await fetch(`/api/photos`)
    if (response.ok) {
        const photos = await response.json()
        console.log("photos === ", photos)
        dispatch(allPhotos(photos))
        return photos
    }
}


export default function reducer(state = { viewOnePhoto: {}, viewAllPhotos: {} }, action) {
    switch (action.type) {
        case LOAD_ALL_PHOTOS: {
            const newState = { viewOnePhoto: {}, viewAllPhotos: {} }
            action.photos.Photos.forEach(e => {
                console.log("e ===== ", e)
                newState.viewAllPhotos[e.User.id] = e
            })
            return newState
        }
        default:
            return state
    }
}
