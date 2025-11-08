import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { CurrencyProvider } from './hooks/CurrencyProvider';

const HomePage = lazy(() => import('./pages/HomePage'));
const TripsPage = lazy(() => import('./pages/TripsPage'));
const TripDetailPage = lazy(() => import('./pages/TripDetailPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const DestinationPage = lazy(() => import('./pages/DestinationPage'));

function App() {
  return (
    <Router>
      <CurrencyProvider>
        <ScrollToTop />
        <Suspense fallback={<div className="p-8 text-center">Chargement…</div>}>
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
        </Suspense>
      </CurrencyProvider>
    </Router>
  );
}

export default App;