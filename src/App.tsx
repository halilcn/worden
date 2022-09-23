import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import routes from './routes';

import './styles/index.scss';

const App = () => {
  const router = createBrowserRouter(routes);

  return (
    <div className="main">
      <div className="main__wrapper">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
