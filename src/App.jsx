import React, { useState } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactPage from './pages/contact';
import BookPage from './pages/book';
import HomePage from './components/Home';



const LAyout = () => {
  return (
    <div className='Layout'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LAyout />,
      errorElement: <div>Defound</div>,

      children: [
        { index: true, element: <HomePage /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
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
