import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'

/*const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})*/

const store = createStore(
  anecdoteReducer,
  composeWithDevTools())

export default store

