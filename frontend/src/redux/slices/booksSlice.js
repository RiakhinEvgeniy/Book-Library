import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import createBookWithId from '../../utils/createBookWithId'

const initialState = []

export const fetchBook = createAsyncThunk(
    'books/fetchBook',
    async () => {
        const res = await axios.get('http://localhost:4000/random-book')
        return res.data
    })

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            state.push(action.payload)
        },

        deleteBook: (state, action) => {
            const index = state.findIndex((book) => book.id === action.payload)
            if (index !== -1) {
                state.splice(index, 1)
            }
            // return state.filter((book) => book.id !== action.payload) // возможный вариант, более сокращенный
        },

        toggleFavorite: (state, action) => {
            state.forEach((book) => {
                if (book.id === action.payload) {
                    book.isFavorite = !book.isFavorite
                }
            })
            // return state.map((book) =>
            //     book.id === action.payload ?
            //         { ...book, isFavorite: !book.isFavorite }
            //         : book
            // ) // вариант написания как в классическом подходе redux
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchBook.fulfilled, (state, action) => {
            if (action.payload.title && action.payload.author) {
                state.push(createBookWithId(action.payload, 'API'))
            }
        })
    }
})

export const { addBook, deleteBook, toggleFavorite } = booksSlice.actions

// export const thunkFunction = async (dispatch, getState) => {

//     try {
//         const res = await axios.get('http://localhost:4000/random-book')
//         if (res.data && res.data.title && res.data.author) {
//             dispatch(addBook(createBookWithId(res.data, 'API')))
//         }
//     } catch (error) {
//         console.log('Error fetching random book', error);
//     }
// }

export const selectBooks = (state) => state.books

export default booksSlice.reducer