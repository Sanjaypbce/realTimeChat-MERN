import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [FormData, setFormDate] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChangename = function (e) {
    const { name, value } = e.target;
    setFormDate({ ...FormData, [name]: value });
    let Ruseru = document.getElementById("useru");
    if (!(value === "")) {
      Ruseru.classList.remove("invalid");
      Ruseru.classList.add("valid");
    } else {
      Ruseru.classList.remove("valid");
      Ruseru.classList.add("invalid");
    }
  };
  const handleChangeemail = function (e) {
    const { name, value } = e.target;
    setFormDate({ ...FormData, [name]: value });
    let emailu = document.getElementById("emailu");

    function validateEmail(newuseremail) {
      var re = /\S+@\S+\.\S+/;
      return re.test(newuseremail);
    }
    if (validateEmail(value)) {
      emailu.classList.remove("invalid");
      emailu.classList.add("valid");
    } else {
      emailu.classList.remove("valid");
      emailu.classList.add("invalid");
    }
  };
  const handleChangepassword = function (e) {
    const { name, value } = e.target;
    setFormDate({ ...FormData, [name]: value });
    let letter = document.getElementById("letter");
    let capital = document.getElementById("capital");
    let number = document.getElementById("number");
    let length = document.getElementById("length");
    var lowerCaseLetters = /[a-z]/g;
    if (value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
    // Validate numbers
    var numbers = /[0-9]/g;
    if (value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
    // Validate length
    if (value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(FormData);
    axios
      .post("http://localhost:4000/signin/verify", FormData)
      .then(function (response) {
        if (response.data) {
          navigate("/login");
        } else {
          alert("User already in our database");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const usernamefocus = function (e) {
    document.getElementById("message2").style.display = "block";
  };

  const usernameblur = function (e) {
    document.getElementById("message2").style.display = "none";
  };

  const emailfocus = function (e) {
    document.getElementById("message1").style.display = "block";
  };

  const emailblur = function (e) {
    document.getElementById("message1").style.display = "none";
  };

  const passwordfocus = function (e) {
    document.getElementById("message").style.display = "block";
  };

  const passwordblur = function (e) {
    document.getElementById("message").style.display = "none";
  };

  return (
    <>
      <div id="registerpageContainer">
        <div className="themecolor pt-1 mb-1">
          <h1>ChatZY</h1>
        </div>

        <div id="register">
          <form onSubmit={handleSubmit}>
            <h2>Registration</h2>
            <div className="form-group mt-2">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                id="Username"
                placeholder="Enter your name"
                value={FormData.name}
                onChange={handleChangename}
                name="name"
                onFocus={usernamefocus}
                onBlur={usernameblur}
              />
              <div id="message2">
                <span id="useru" className="invalid">
                  Valid username
                </span>
              </div>
            </div>
            <div className="form-group mt-4">
              <label>Email address</label>
              <input
                type="email"
                className="form-control ng-pristine ng-untouched ng-valid ng-empty ng-valid-email"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                value={FormData.email}
                onChange={handleChangeemail}
                onFocus={emailfocus}
                onBlur={emailblur}
              />

              <div id="message1">
                <span id="emailu" className="invalid">
                  Valid email
                </span>
              </div>
              <span id="userfound">User already in our database</span>
            </div>
            <div className="form-group mt-4">
              <label>password</label>
              <input
                type="password"
                className="form-control ng-pristine ng-untouched ng-valid ng-empty"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                value={FormData.password}
                onChange={handleChangepassword}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                onFocus={passwordfocus}
                onBlur={passwordblur}
              />

              <div id="message">
                <span id="letter" className="invalid">
                  A lowercase letter
                </span>
                <span id="capital" className="invalid">
                  A capital (uppercase) letter
                </span>
                <span id="number" className="invalid">
                  A number
                </span>
                <span id="length" className="invalid">
                  Minimum 8 characters
                </span>
              </div>
            </div>
            <div className="form-group mt-4">
              <p>
                Already i have an acount...{" "}
                <span>
                  <Link to="/login" className="green">
                    login
                  </Link>
                </span>
              </p>
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2">
              Submit
            </button>
          </form>
        </div>

        <div className="bnavbar d-flex justify-content-evenly">
          <Link to="/"> Back</Link>
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
