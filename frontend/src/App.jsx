import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";
import AuthHelper from "./helpers/authHelper";
import Participant from "./pages/Participant";
import Event from "./pages/Event";
import EventDetailModal from "./components/events/EventDetailModal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={ <AuthHelper> <Dashboard /> </AuthHelper> } >

       <Route index element={<Participant/>} />
       <Route  path="/dashboard/events" element={<Event />} />
       <Route  path="dashboard/event-details/:id" element={<EventDetailModal />} />
        </Route>
     
      </Routes>
    </>
  );
}

export default App;
