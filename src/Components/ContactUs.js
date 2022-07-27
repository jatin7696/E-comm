import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Description, setDescription] = useState("");
  const [error, setError] = useState(false);
  //const [errors, setErrors] = useState(false);

  function emailValidation(pr) {
    // console.log("under validation", pr);
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regex.test(pr) === false) {
      //   this.setState({
      //     error: "Email is not valid",
      //   });
      // console.log("this is regex == ");
      setError(true);
      return false;
    }
    return true;
  }

  const contactus = async () => {
    if (!Name || !Email || !Mobile || !Description) {
      //console.log("this is react === ", Name);
      setError(true);
      return false;
    }
    //const e = JSON.stringify(Email);
    let validEmail = emailValidation(Email);
    // console.log("email is valid ", validEmail);
    if (validEmail === true) {
      console.log("email is valid ");
      let result = await fetch("http://localhost:8080/api/Contact", {
        method: "Post",
        body: JSON.stringify({
          Name,
          Email,
          Mobile,
          Description,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result) {
        alert("your information is succesfully submitted");
        navigate("/");
        //  return "your information is succesfully submitted";
      }
    } else {
      console.log("this is error");
      setError(true);
    }
  };

  return (
    <div className="register">
      <h1 className="contact-h1"> Contact Page </h1>
      <input
        type="text"
        className="input-box"
        value={Name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />{" "}
      {error && !Name && (
        <span className="invalid-input"> Enter valid Name </span>
      )}
      <input
        type="text"
        className="input-box"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />{" "}
      {error && <span className="invalid-input"> Enter valid Email </span>}
      <input
        type="Number"
        className="input-box"
        value={Mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter Mobile Number"
      />{" "}
      {error && !Mobile && (
        <span className="invalid-input"> Enter valid Mobile Number </span>
      )}{" "}
      <input
        type="text"
        className="input-box"
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Description"
      />{" "}
      {error && !Description && (
        <span className="invalid-input"> Enter valid Description </span>
      )}{" "}
      <button className="appButton" onClick={contactus}>
        Submit{" "}
      </button>{" "}
    </div>
  );
};

export default ContactUs;
