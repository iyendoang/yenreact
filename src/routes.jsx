import React from 'react'

const Dashboard = React.lazy(() => import('./views/Admin/Dashboard/Index'))
const routes = [
  { path: '/admin/', exact: true, name: 'Home' },
  { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
]

export default routes
