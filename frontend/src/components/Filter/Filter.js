import { useDispatch, useSelector } from 'react-redux'
import { setTitleFilter, selecTitiletFilter, resetFilters } from '../../redux/slices/filterSlice'
import './Filter.css'

function Filter() {
  const dispatch = useDispatch() // передача изменений в redux store
  const titleFilter = useSelector(selecTitiletFilter) // подписка на изменения

  const handleFilterTitleChange = (e) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
  }

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Filter by title"
            value={titleFilter}
            onChange={handleFilterTitleChange} />
        </div>
        <button type="button" onClick={handleResetFilters}>Reset Filters</button>
      </div>
    </div>
  )
}

export default Filter