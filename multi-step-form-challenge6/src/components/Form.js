import React, { useState } from "react";

export default function Form() {
  const data = [
    {
      id: "name",
      label: "Name",
      inputTye: "text",
      btnName: "Next",
      placeholder: "Enter your name",
    },
    {
      id: "email",
      label: "Email",
      inputTye: "email",
      btnName: "Next",
      placeholder: "Enter your email",
    },
    {
      id: "dob",
      label: "Date of birth",
      inputTye: "date",
      btnName: "Next",
    },
    {
      id: "pw",
      label: "Password",
      inputTye: "password",
      btnName: "Submit",
      placeholder: "Enter your password",
    },
  ];

  const [index, setIndex] = useState(0);

  const [formData, setFormData] = useState(data);

  function handleBackbtn() {
    setIndex((p) => p - 1);
  }

  function handleNextbtn() {

    if(index === 1)
    {
      if(validateEmail(formInput.email))
      {
        setIndex((p) => p + 1);
      }
      else
      {
        alert('Please enter a valid email');
      }

    }
    else {

      setIndex((p) => p + 1);
      
    }
  }
  //form data storage

  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    dob: "",
    pw: "",
  });

  function handleInputData(e) {
    var fetchId = e.target.id;
    var fetchVal = e.target.value;

    setFormInput((p) => ({
      ...p,
      [fetchId]: fetchVal,
    }));
  }

  //handle submitting form

  const [isSubmit, setIsSubmit] = useState(false);

  function handleSubmit() {

    if(validatePassword(formInput.pw))
      {
        console.log("Form submitted");
        //setIndex((p)=>p+1);
        setIsSubmit(true);
      }
      else
      {
        alert('Please enter a password of length 10 inclusing 1 uppercase, 1 lower case and 1 symbol.')
      }


    
  }


  //validation functions 


  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(pw)
  {
    const reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_])[A-Za-z\d\W_]{10}$/;
    return reg.test(String(pw));
  }




  return (
    <div>
      {!isSubmit && (
        <div className="name">
          {index !== 0 && (
            <button className="backbtn" onClick={handleBackbtn}>
              ◀Back
            </button>
          )}

          <label>
            <b>{formData[index].label}</b>
          </label>
          <input
            value={formInput[formData[index].id]}
            id={formData[index].id}
            type={formData[index].inputTye}
            onChange={(e) => handleInputData(e)}
            placeholder={formData[index].placeholder}
          ></input>

          {index !== 3 && (
            <button onClick={handleNextbtn} className="next">
              {formData[index].btnName}
            </button>
          )}

          {index === 3 && (
            <button className="next" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      )}

      {isSubmit && (
        <div className="success">
          <h2>
            Hi <b>{formInput.name}</b>
          </h2>
          <h3>You have been registered to our program.</h3>
          <h3>Please check your inbox for further details.</h3>
          <h3>Registered email: {formInput.email}</h3>
        </div>
      )}
    </div>
  );
}
