import React, { useEffect, useState } from 'react';
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
import RegisterPage from './pages/register';
import { callFetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountf5 } from './redux/account/accountSlice';
import LoadingPage from './components/Loading';
import NotFound from './components/NotFound';
import AdminPage from './pages/admin';
import ProtectedRoute from './components/ProtectedRoute';



const LAyout = () => {
  return (
    <div className='Layout'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
const LAyoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith('/admin')
  const user = useSelector(state => state.account.user);
  const userRole = user.role;


  return (
    <div className='Layout'>
      {isAdminRoute && userRole === 'ADMIN' && <Header />}

      <Outlet />
      {isAdminRoute && userRole === 'ADMIN' && <Footer />}
    </div>
  )
}


export default function App() {

  const dispatch = useDispatch();

  const isAuthentited = useSelector(state => state.account.isAuthentited)
  const getAccoutndF5 = async () => {
    if (window.location.pathname === '/login' ||
      window.location.pathname === '/register'
      || window.location.pathname === '/'
    ) return;
    const res = await callFetchAccount();
    console.log("check res", res)
    if (res && res.data) {
      dispatch((getAccountf5(res.data)));
    }
  }

  useEffect(() => {
    getAccoutndF5();
  }, [])


  const router = createBrowserRouter([
    {
      path: "/",
      element: <LAyout />,
      errorElement: <div><NotFound /></div>,

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
      path: "/admin",
      element: <LAyoutAdmin />,
      errorElement: <div><NotFound /></div>,

      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },
        {
          path: "user",
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
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);
  return (
    <>
      {isAuthentited === true || window.location.pathname === '/login' ||
        window.location.pathname === '/register' ||
        window.location.pathname === '/'
        || window.location.pathname === '/' ?
        <RouterProvider router={router} />

        :

        <LoadingPage />
      }
    </>
  )
}
