import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: '',
    author: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setTitleFilter: (state, action) => {
            // return { ...state, title: action.payload }
            state.title = action.payload // можно делать для удобства использования
        },

        setAuthorFilter: (state, action) => {
            state.author = action.payload
        },

        resetFilters: (state) => {
            return initialState
        }
    }
})

export const { setTitleFilter, resetFilters, setAuthorFilter } = filterSlice.actions
// const {setTitleFilter} = filterSlice.actions // вариант с деструктуризацией

export const selecTitiletFilter = (state) => state.filter.title

export const selecAuthortFilter = (state) => state.filter.author

export default filterSlice.reducer