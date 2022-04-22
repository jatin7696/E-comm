import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    console.log(name, username, Password);
    let result = await fetch("http://localhost:8080/register", {
      method: "post",
      body: JSON.stringify({ name, username, Password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn("this is react signup", result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));

    navigate("/");
  };
  return (
    <div className="register">
      <h1>SignUp</h1>
      <input
        className="input-box"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        className="input-box"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
      />

      <input
        className="input-box"
        type="Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button className="appButton" onClick={collectData}>
        Signup
      </button>
    </div>
  );
};

export default Signup;
