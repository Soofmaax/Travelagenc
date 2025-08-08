import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TripsPage from './pages/TripsPage';
import TripDetailPage from './pages/TripDetailPage';
import BookingPage from './pages/BookingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import LegalPage from './pages/LegalPage';
import DestinationPage from './pages/DestinationPage';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="trips" element={<TripsPage />} />
          <Route path="trips/:id" element={<TripDetailPage />} />
          <Route path="booking/:id?" element={<BookingPage />} />
          <Route path="confirmation/:id" element={<ConfirmationPage />} />
          <Route path="legal" element={<LegalPage />} />
          <Route path="destination/:country" element={<DestinationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;