import React from "react";
import "./App.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Home from "./pages/main/Home";
import Create from "./pages/book/Create";
import Dashboard from "./pages/book/Dashboard";
import Update from "./pages/book/Update";
import PageNotFound from "./pages/main/PageNotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/main/Contact";
import About from "./pages/main/About";
import Edit from "./pages/book/Edit";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/contact", element: <Contact /> },
      { path: "/about", element: <About /> },
      { path: "/book/create", element: <Create /> },
      { path: "/book/edit/:id", element:  <Edit/> },
      { path: "/book/dashboard", element: <Dashboard /> },
      { path: "/book/update", element: <Update /> },
      { path: "/*", element: <PageNotFound /> },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
