import React from 'react';

import WelcomeUser from '../views/welcome-user';
import ActiveUserList from '../views/active-user-list';

export default [
  {
    path: '/',
    element: <WelcomeUser />
  },
  {
    path: '/active-user-list',
    element: <ActiveUserList />
  }
];
