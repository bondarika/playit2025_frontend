import './App.scss'
import { createBrowserRouter, RouterProvider } from 'react-router'
import React from 'react'
import routes from './routes/routes'

function App(): React.ReactElement{
  const router = createBrowserRouter(routes)

  return (
    <div className='app'>
        <RouterProvider router={router} />
    </div>  )
}

export default App
