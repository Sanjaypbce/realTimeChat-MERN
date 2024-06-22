import React from "react";
import "./Homepage.css";
import { useNavigate, Link } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div id="homepageContainer">
        <div>
          <div className="apptitle">
            <h1>ChatZY</h1>
          </div>

          <div id="homepage">
            <div className="col-md-6" id="homenavi">
              <h3 className="themecolor mb-1 mt-1">Let's Start</h3>
              <div className="buttonContainer">
                <div>
                  <div className="gap-3">
                    <Link to="/login">
                      <button
                        className="btn btn-outline-secondary w-100 py-2 my-2"
                        type="button"
                      >
                        login
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button
                        className="btn btn-primary w-100 py-2 my-2"
                        type="button"
                        
                      >
                        Sign Up
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
