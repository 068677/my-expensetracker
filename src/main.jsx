import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import {createBrowserRouter,RouterProvider,useLocation} from 'react-router-dom'
// const Router= createBrowserRouter([
//   {
//     path:"/",
//     element:<Home/>,
//   },{
//     path:"/Login",
//     element:<Login/>
//   },{
//     path:"/About",
//     element:<About/>
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

)
