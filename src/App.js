// import logo from "./logo.svg";
import "./App.css";
// import Base from "./components/Base";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./LoginComp/Login";
import Signup from "./SignupComp/Signup";
import Services from "./Pages/Services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "./cmpnts/User";
import DashBoard from "./Pages/DashBoard";
import Userinfo from "./cmpnts/Userinfo";
// import AllPost from "./Pages/AllPost";

import UserPost from "./cmpnts/UserPost";
import { doLogout } from "./auth/Index";
import Category from "./cmpnts/Category";
import UpdatePost from "./Pages/UpdatePost";
import Provider from "./Context/Provider";
import Forgot from "./ForgotPassOTP/Forgot";
import Otp from "./ForgotPassOTP/Otp";
import Passchange from "./ForgotPassOTP/Passchange";
import Vprovider from "./Context/Vprovider";
import ConfirmPass from "./ForgotPassOTP/ConfirmPass";
function App() {
  // const navigate = useNavigate();
  window.onunload = function () {
    sessionStorage.getItem("data") ? (
      doLogout()
    ) : (
      <Route path="/" element={<Home />} />
    );
  };
  window.onbeforeunload = function () {
    sessionStorage.setItem(localStorage.getItem("data"));
    localStorage.clear();
  };
  return (
    <div className="App scroll">
      <Vprovider>
        <Provider>
          <BrowserRouter>
            {/* <Base /> */}
            <ToastContainer />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/post/:id" element={<UserPost />} />

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
              <Route path="OTP" element={<Otp />} />
              <Route path="data" element={<Passchange />}>
                <Route path="forgot" element={<Forgot />} />
                <Route path="changePass" element={<ConfirmPass />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </Vprovider>
    </div>
  );
}

export default App;
