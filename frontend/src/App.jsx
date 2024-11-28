import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";
import AuthHelper from "./helpers/authHelper";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={ <AuthHelper> <Dashboard /> </AuthHelper> } />
      </Routes>
    </>
  );
}

export default App;
