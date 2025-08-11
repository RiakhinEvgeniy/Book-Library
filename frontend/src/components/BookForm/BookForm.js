import { useState } from "react"
import { useDispatch } from 'react-redux'
import { addBook } from '../../redux/slices/booksSlice'
import booksDate from '../../data/books.json'
import './BookForm.css'
import createBookWithId from "../../utils/createBookWithId"

function BookForm() {

    const [title, setTitle] = useState('') // можно использовать объект, если нужно сохранять в сосотоянии много информации
    const [author, setAuthor] = useState('')
    const dispatch = useDispatch()

    const handleAddRandomBook = () => {
        const randomIndex = Math.floor(Math.random() * booksDate.length)
        const randomBook = booksDate[randomIndex]

        const randomBookWithId = createBookWithId(randomBook)

        dispatch(addBook(randomBookWithId))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (title && author) {
            const book = createBookWithId({ title, author })
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