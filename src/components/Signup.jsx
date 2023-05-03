import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.success) {
      //save the auth token and redirect
      localStorage.setItem("token", data.authtoken);
      props.showAlert("Successfully created account","success")
      navigate("/");
    } else {
      props.showAlert("Invalid Credentials","danger")
    }
  };
  return (
    <div>
      <div
        style={{ textAlign: "center", padding: "20%", paddingTop: "5%" }}
        className="container"
      >
        <div className="rounded-4 shadow">
          <div className="p-5 pb-4 border-bottom-0">
            <h2 className="fw-bold mb-0">Sign Up</h2>
          </div>
          <form className="modal-content rounded-4 shadow">
            <div className="modal-body p-5 pt-0">
              <div className="mb-3">
                <input
                  placeholder="Name"
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={credentials.name}
                  aria-describedby="username"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Email"
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={credentials.email}
                  aria-describedby="emailHelp"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Password"
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Confirm Password"
                  type="password"
                  className="form-control"
                  id="cpassword"
                  name="cpassword"
                  value={credentials.cpassword}
                  onChange={onChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-dark"
                onClick={handleSubmit}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
