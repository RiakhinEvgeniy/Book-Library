import {v4 as uuidv4} from 'uuid'

function createBookWithId(book, source) {
  return {
    ...book,
    source, //сокращенное название свойства
    isFavorite: false,
    id: uuidv4()
  }
}

export default createBookWithId