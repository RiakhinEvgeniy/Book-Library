import * as actionTypes from './actionTypes'

export const ADD_BOOK = (newBook) => {
    return {
        type: actionTypes.ADD_BOOK,
        payload: newBook,
    }
}