import { useState } from "react"
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { addBook } from '../../redux/books/actionCreaters'
import booksDate from '../../data/books.json'
import './BookForm.css'

function BookForm() {

    const [title, setTitle] = useState('') // можно использовать объект, если нужно сохранять в сосотоянии много информации
    const [author, setAuthor] = useState('')
    const dispatch = useDispatch()

    const handleAddRandomBook = () => {
        const randomIndex = Math.floor(Math.random() * booksDate.length)
        const randomBook = booksDate[randomIndex]

        const randomBookWithId = {
            ...randomBook,
            id: uuidv4(),
            isFavorite: false
        }

        dispatch(addBook(randomBookWithId))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (title && author) {
            const book = {
                id: uuidv4(),
                title: title,
                author: author,
                isFavorite: false
            }
            dispatch(addBook(book))
            setTitle('')
            setAuthor('')
        }
    }
    return (
        <div className="app-block book-form">
            <h2>Add new a book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title: </label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="author">Author: </label>
                    <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <button type="submit">Add Book</button>
                <button type="button" onClick={handleAddRandomBook}>Add Random</button>
            </form>
        </div>
    )
}

export default BookForm