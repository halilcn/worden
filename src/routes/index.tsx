import React from 'react'

import { routerPaths } from '../constants'
import ActiveUsers from '../views/active-users'
import GameDashboard from '../views/game-dashboard'
import WelcomeUser from '../views/welcome-user'

export default [
  {
    path: routerPaths.welcome,
    element: <WelcomeUser />,
  },
  {
    path: routerPaths.activeUsers,
    element: <ActiveUsers />,
  },
  {
    path: routerPaths.game,
    element: <GameDashboard />,
  },
]
