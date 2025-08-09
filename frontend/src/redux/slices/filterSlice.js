import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: ''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setTitleFilter: (state, action) => {
            // return { ...state, title: action.payload }
            state.title = action.payload // можно делать для удобства использования
        },

        resetFilters: (state) => {
            return initialState
        }
    }
})

export const {setTitleFilter, resetFilters} = filterSlice.actions
// const {setTitleFilter} = filterSlice.actions // вариант с деструктуризацией

export const selecTitiletFilter = (state) => state.filter.title

export default filterSlice.reducer