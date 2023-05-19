import React, { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';


const LAyout = () => {
  return (
    <>
      main page
    </>
  )
}


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LAyout />,
      errorElement: <div>Defound</div>
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
