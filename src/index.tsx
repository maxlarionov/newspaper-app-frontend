import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './app/store'
import reportWebVitals from './reportWebVitals'
import './index.css'
import { Paths } from './paths'
import { Main } from './pages/main'
import Login from './pages/login'
import Register from './pages/register'

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Main />
  },
  {
    path: Paths.login,
    element: <Login />
  },
  {
    path: Paths.register,
    element: <Register />
  },
  // {
  //   path: Paths.articleAdd,
  //   element: <AddArticle />
  // },
  // {
  //   path: `${Paths.status}/:status`,
  //   element: <Status />
  // },
  // {
  //   path: `${Paths.employee}/:id`,
  //   element: <Employee />
  // },
  // {
  //   path: `${Paths.articleEdit}/:id`,
  //   element: <EditArticle />
  // },
])

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
