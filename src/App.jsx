import "./App.css";
import Signup from "./components/signup/Signup";
import Login from "./components/login/Login";
import Homepage from "./components/homepage/Homepage";
import Dashboard from "./components/dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "./Store/Slice/UserSlice";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user && token) {
      navigate("/dashboard");
    }
  }, [user]);

  console.log("home page===>");

  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default App;
