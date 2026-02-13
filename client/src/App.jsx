import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MoviesDetails from "./pages/MoviesDetails";
import Seatlayout from "./pages/Seatlayout";
import MyBookings from "./pages/MyBookings";
import Favourite from "./pages/Favourite";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import { Toaster } from  'react-hot-toast';
import Layout from "./pages/admin/Layout";
import Dashboard  from "./pages/admin/Dashboard";
import ListShows from "./pages/admin/ListShows";
import AddShows from "./pages/admin/AddShows";
import ListBookings from "./pages/admin/ListBookings";
import { useAppContext } from "./context/AppContext";
import { SignIn } from "@clerk/clerk-react";
import Loading from "./components/Loading";

const App = () => {
  const isAdminroute=useLocation().pathname.startsWith("/admin");

  const {user}=useAppContext()
  return (
    <>
      <Toaster /> {/*for toast notifications */}

      {!isAdminroute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MoviesDetails />} />
        <Route path="/movies/:id/:date" element={<Seatlayout />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/loading/:nexturl" element={<Loading />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/admin/*" element={user ? <Layout/>:(
          <div className="min-h-screen flex justify-center items-center">
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        )}>
         {/* here * represents all badhane aapi dese layout */}
          <Route index element={<Dashboard/>} />
          <Route path="add-shows" element={<AddShows/>} />
          <Route path="list-shows" element={<ListShows/>} />
          <Route path="list-bookings" element={<ListBookings/>} />

        </Route>
      </Routes>
      {!isAdminroute && <Footer />}
    </>
  );
};

export default App;
