import { createHashRouter, RouterProvider } from 'react-router'
import Layout from './pages/Layout'
import Public from './pages/Public'
import { Admin } from './pages/Admin'
import UjTermek from './pages/UjTermek'
import NoPage from './pages/NoPage'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'

const router = createHashRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {index: true, element: <Public/>},
      {path: "admin", element: <Admin/>},
      {path: "admin/uj-termek", element: <UjTermek/>},
      {path: "kosar", element: <Cart/>},
      {path: "kedvencek", element: <Favorites/>},
      {path: "*", element: <NoPage/>},
    ]
  }
])

export default function App() {
  return <RouterProvider router={router}/>
}


