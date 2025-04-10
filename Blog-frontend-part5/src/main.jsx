import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import blogReducer from './reducers/BlogReducer'
import noteReducer from './reducers/NoteReducer'
import userReducer from './reducers/UserReducer'
import existeduserReducer from './reducers/ExistedUserReducer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
const store = configureStore({
    reducer: {
        blog: blogReducer,
        note: noteReducer,
        user: userReducer,
        users: existeduserReducer
    }
})
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    </BrowserRouter>

)
