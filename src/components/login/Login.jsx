import React, { useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser } from "../../Store/Slice/UserSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!error) {
      return;
    }
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  // reduxState
  const { loading, user } = useSelector((state) => state.user);
  console.log({ user });

  const onChange = function (e) {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const onSubmitForm = async function (e) {
    e.preventDefault();

    try {
      const result = await dispatch(LoginUser(loginForm));
      setLoginForm({
        email: "",
        password: "",
      });
      const { payload } = result;
      if (payload) {
        const { token } = payload;
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setError(true);
      }
    } catch (error) {
      // Handle errors here
      console.error("Error occurred:", error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div id="loginpageContainer">
          <div className="themecolor mb-5">
            <h1>ChatZY</h1>
          </div>
          <div id="login">
            <div className="form-group mb-4 ">
              <input
                type="email"
                className="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                value={loginForm.email}
                name="email"
                onChange={onChange}
              />
            </div>

            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                id="exampleInputPassword1"
                placeholder="Enter your password"
                name="password"
                value={loginForm.password}
                onChange={onChange}
              />
            </div>
            <button
              className="btn btn-primary w-100 py-2"
              type="submit"
              id="signin"
            >
              {loading ? "Loading" : "Login"}
            </button>
            {error && (
              <div
                className="alert alert-danger mt-3"
                role="alert"
                style={{ padding: "5px", textAlign: "center" }}
              >
                Wrong user credential
              </div>
            )}
            <div className="form-check my-3" id="keepmesignin">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
              />
              <label className="form-check-label">Keep me signed in</label>
            </div>
          </div>
          <div id="othersignin">
            {/* <h6>
            <span>or sign in with </span>
          </h6>
          <div className="d-flex justify-content-evenly">
            <div className="optionContainer">
              <img
                src="../../bin/assets/icons8-google-48.png"
                className="othersigninoptions"
              />
            </div>
            <div className="optionContainer">
              <img
                src="../../bin/assets/icons8-apple-50.png"
                className="othersigninoptions"
              />
            </div>
            <div className="optionContainer">
              <img
                src="../../bin/assets/icons8-facebook-48.png"
                className="othersigninoptions"
              />
            </div>
            <div className="optionContainer">
              <img
                src="../../bin/assets/icons8-twitter-50.png"
                className="othersigninoptions"
              />
            </div>
          </div> */}
          </div>

          <div className="bnavbar d-flex justify-content-evenly">
            <Link to="/"> Back</Link>
            <Link to="/signup">Sign in</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
