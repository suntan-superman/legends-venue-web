import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import EventSpacesPage from "./pages/EventSpacesPage";
import EventsPage from "./pages/EventsPage";
import AvailabilityPage from "./pages/AvailabilityPage";
import RequestEventPage from "./pages/RequestEventPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event-spaces" element={<EventSpacesPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/request-event" element={<RequestEventPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </>
  );
}
