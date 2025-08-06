import { useState } from "react"
import './BookForm.css'

function BookForm() {

    const [title, setTitle] = useState('') // можно использовать объект, если нужно сохранять в сосотоянии много информации
    const [author, setAuthor] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if(title && author) {
            console.log(title, author);
            
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
            </form>
        </div>
    )
}

export default BookForm