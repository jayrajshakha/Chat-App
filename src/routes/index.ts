import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

export const routes = createBrowserRouter(
      [
        {
            path : '/',
            Component : App,
            ErrorBoundary : ErrorPage,
        },
        {
          path : 'login',
          Component : Login,
        },
        {
          path : 'register',
          Component : Register,
        }
    
        
       
      ]
)