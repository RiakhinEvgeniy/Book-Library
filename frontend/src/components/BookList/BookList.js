import { useDispatch, useSelector } from 'react-redux'
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import './BookList.css'
import { deleteBook, toggleFavorite } from '../../redux/books/actionCreaters'
import {
  selecTitiletFilter,
  selecAuthortFilter,
  selecOnlyFavoriteFilter
} from '../../redux/slices/filterSlice';

function BookList() {
  const books = useSelector((state) => state.books)
  const titleFilter = useSelector(selecTitiletFilter)
  const authorFilter = useSelector(selecAuthortFilter)
  const onlyFavoriteFilter = useSelector(selecOnlyFavoriteFilter)
  const dispatch = useDispatch()

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id))
  }

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id))
  }

  const filterBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase())
    const mathesAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase())
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
    return matchesTitle && mathesAuthor && matchesFavorite
  })

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filterBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {book.title} by <strong>{book.author}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button type="button" onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList