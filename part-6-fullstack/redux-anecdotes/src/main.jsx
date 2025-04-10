import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/AnecdoteReducer'
import filterReducer from './reducers/FilterReducer'
// import noteReducer from './reducers/NotificationReducer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NoteContextProvide } from './reducers/NotificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    // note: noteReducer,
  }
})

const queryClient = new QueryClient()
console.log(store.getState())
ReactDOM.createRoot(document.getElementById('root')).render(
  <NoteContextProvide>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </NoteContextProvide>
)