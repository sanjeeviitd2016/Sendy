import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Register from "./components/register/Register";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import Home from "./components/Home/Home";
import "./App.css";
import Account from "./components/Account/Account";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import NewPost from "./components/NewPost/NewPost";
import UserProfile from "./components/UserProfile/UserProfile";
import Search from "./components/Search/Search";
import NotFound from "./components/NotFound/NotFound";
function App() {
  const dispatch = useDispatch();

  const { isAuthenicated, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        {isAuthenicated && <Header />}
        <Routes>
          <Route path="/" element={isAuthenicated ? <Home /> : <Login />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/account"
            element={isAuthenicated ? <Account /> : <Login></Login>}
          />
          <Route
            path="/update/profile"
            element={isAuthenicated ? <UpdateProfile /> : <Login />}
          />

          <Route
            path="/update/password"
            element={isAuthenicated ? <UpdatePassword /> : <Login />}
          />
          <Route path="/forgot/password" element={<ForgotPassword />} />

          <Route path="/password/reset/:token" element={<ResetPassword />} />

          <Route
            path="/newPost"
            element={isAuthenicated ? <NewPost /> : <Login />}
          />

          <Route
            path="/user/:userId"
            element={isAuthenicated ? <UserProfile /> : <Login />}
          />

          <Route
            path="/search"
            element={isAuthenicated ? <Search /> : <Login />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
