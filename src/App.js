// import logo from "./logo.svg";
import "./App.css";
// import Base from "./components/Base";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Services from "./Pages/Services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./Pages/User";
import DashBoard from "./Pages/DashBoard";
import Userinfo from "./components/Userinfo";
// import AllPost from "./Pages/AllPost";

import UserPost from "./components/UserPost";
import { doLogout } from "./auth/Index";
import Category from "./Pages/Category";
import UpdatePost from "./Pages/UpdatePost";
function App() {
  // const navigate = useNavigate();
  return (
    <div className="App scroll">
      <BrowserRouter>
        {/* <Base /> */}
        <ToastContainer />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<UserPost />} />
          {/* {localStorage.getItem("data") ? (
            doLogout()
          ) : (
            <Route path="/" element={<Home />} />
          )} */}
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/newFeed" element={<Home />} />
          <Route path="/login" element={<Login className="container" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/service" element={<Services />} />
          <Route path="/user" element={<User />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="info/:id" element={<Userinfo />} />
            <Route path="update/:id" element={<UpdatePost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
