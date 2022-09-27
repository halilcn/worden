import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import routes from './routes'
import './styles/index.scss'
import serverActions from './utils/server-events'

const App = () => {
  const router = createBrowserRouter(routes)

  useEffect(() => {
    //TODO: disconnect!
    // return () => serverActions.disconnect()
  }, [])

  return (
    <div className="main">
      <div className="main__wrapper">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
