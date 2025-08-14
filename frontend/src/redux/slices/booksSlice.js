import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import createBookWithId from '../../utils/createBookWithId'
import { setError } from './errorSlice'

const initialState = {
    books: [],
    isLoadingViaAPI: false
}

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async (url, thunkAPI) => {
        try {
            const res = await axios.get(url)
            return res.data
        } catch (error) {
            thunkAPI.dispatch(setError(error.message))
            // OPTION 1
            return thunkAPI.rejectWithValue(error)
            // OPTION 2
            // throw error
        }
    })

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.books.push(action.payload)
        },

        deleteBook: (state, action) => {
            const index = state.books.findIndex((book) => book.id === action.payload)
            if (index !== -1) {
                state.books.splice(index, 1)
            }
            // return state.books.filter((book) => book.id !== action.payload) // возможный вариант, более сокращенный
        },

        toggleFavorite: (state, action) => {
            state.books.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite
                }
            })

            // вариант написания как в классическом подходе redux
            // return state.map((book) =>
            //     book.id === action.payload ?
            //         { ...book, isFavorite: !book.isFavorite }
            //         : book
            // ) 
        }
    },

    // Option 2
    // Этот подход по информации от AI уже не поддерживается и не работает 
    // extraReducers: {
    //     [fetchBook.fulfilled]: (state, action) => {
    //         if (action.payload.title && action.payload.author) {
    //             state.push(createBookWithId(action.payload, 'API'))
    //         }
    //     }
    // }

    // Option 1
    extraReducers: (builder) => {
        builder.addCase(fetchBook.pending, (state) => {
            state.isLoadingViaAPI = true
        });

        builder.addCase(fetchBook.fulfilled, (state, action) => {
            state.isLoadingViaAPI = false
            if (action.payload.title && action.payload.author) {
                state.books.push(createBookWithId(action.payload, 'API'))
            }
        });

        builder.addCase(fetchBook.rejected, (state) => {
            state.isLoadingViaAPI = false
        });
    }
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

export const selectBooks = (state) => state.books.books
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI

export default booksSlice.reducer