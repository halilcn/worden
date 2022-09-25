import React from 'react';

import WelcomeUser from '../views/welcome-user';
import ActiveUserList from '../views/active-user-list';
import GameDashboard from '../views/game-dashboard';
import { routerPaths } from '../constants';

export default [
  {
    path: routerPaths.welcome,
    element: <WelcomeUser />
  },
  {
    path: routerPaths.activeUserList,
    element: <ActiveUserList />
  },
  {
    path: routerPaths.game,
    element: <GameDashboard />
  }
];
