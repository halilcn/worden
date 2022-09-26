import React from 'react'

import { ROUTER_PATHS } from '../constants'
import ActiveUsers from '../views/active-users'
import GameDashboard from '../views/game-dashboard'
import WelcomeUser from '../views/welcome-user'

export default [
  {
    path: ROUTER_PATHS.welcome,
    element: <WelcomeUser />,
  },
  {
    path: ROUTER_PATHS.activeUsers,
    element: <ActiveUsers />,
  },
  {
    path: ROUTER_PATHS.game,
    element: <GameDashboard />,
  },
]
