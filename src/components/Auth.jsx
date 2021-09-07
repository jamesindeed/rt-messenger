import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import styled from "styled-components";

import signInImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, phoneNumber, avatarURL } = form; //add form

    const URL = "http://localhost:5000/auth";

    const {
      data: { token, userId, hashedPassword, fullName }, //remove fullname
    } = await axios.post(`${URL}/${isSignup ? "signup" : "login"}`, {
      username,
      password,
      fullName: form.fullName,
      phoneNumber,
      avatarURL,
    });

    cookies.set("token", token);
    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);

    if (isSignup) {
      cookies.set("phoneNumber", phoneNumber);
      cookies.set("avatarURL", avatarURL);
      cookies.set("hashedPassword", hashedPassword);
    }

    window.location.reload();
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <AuthFormContainer>
      <AuthFormContainerFields>
        <AuthFormContainerFieldsContent>
          <p>{isSignup ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <AuthFormContainerFieldsContentInput>
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </AuthFormContainerFieldsContentInput>
            )}
            <AuthFormContainerFieldsContentInput>
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </AuthFormContainerFieldsContentInput>
            {isSignup && (
              <AuthFormContainerFieldsContentInput>
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </AuthFormContainerFieldsContentInput>
            )}
            {isSignup && (
              <AuthFormContainerFieldsContentInput>
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Profile Picture"
                  onChange={handleChange}
                  required
                />
              </AuthFormContainerFieldsContentInput>
            )}
            <AuthFormContainerFieldsContentInput>
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </AuthFormContainerFieldsContentInput>
            {isSignup && (
              <AuthFormContainerFieldsContentInput>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </AuthFormContainerFieldsContentInput>
            )}
            <AuthFormContainerFieldsContentButton>
              <button>{isSignup ? "Sign Up" : "Sign In"}</button>
            </AuthFormContainerFieldsContentButton>
          </form>
          <AuthFormContainerFieldsAccount>
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </AuthFormContainerFieldsAccount>
        </AuthFormContainerFieldsContent>
      </AuthFormContainerFields>
      <AuthFormContainerImage>
        <img src={signInImage} alt="sign in" />
      </AuthFormContainerImage>
    </AuthFormContainer>
  );
};

export default Auth;

const AuthFormContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: row;

  @media screen and (max-width: 800px) {
    flex-direction: column-reverse;
    height: auto;
    min-height: 100vh;
  }
`;
const AuthFormContainerFields = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4vw;
  background: #7686f5;

  @media screen and (max-width: 800px) {
    justify-content: flex-start;
  }

  @media screen and (max-width: 375px) {
    padding: 6vh 6vw;
  }
`;
const AuthFormContainerFieldsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 2.5rem;
  box-shadow: 0px 1px 5px rgb(0 0 0 / 10%);
  border-radius: 15px;
  transition: 0.8s ease;
  background: #fff;

  p {
    font-size: 1.5rem;
    font-family: Arial, Helvetica, sans-serif;
    color: #1f1f1f;
    font-weight: 900;
  }

  @media screen and (max-width: 800px) {
    margin-top: 8vh;
    padding: 2rem;
  }
`;

const AuthFormContainerFieldsContentInput = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 1rem 0rem;

  label {
    margin-bottom: 0.45rem;
    color: rgb(61, 79, 88);
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 0.7px;
    line-height: 1.3;
    font-weight: bold;
  }

  input {
    padding: 0.55rem 0.4rem;
    border: 1px solid rgb(184, 196, 194);
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: all 150ms ease-in-out 0s;
    width: 85%;
    background: #fff;

    @media screen and (max-width: 800px) {
      width: 95%;
    }
  }

  input::placeholder {
    color: #b1b1b1;
    width: 100%;
    font-weight: unset;
    font-family: Arial, Helvetica, sans-serif;
  }

  input:hover {
    border-color: #dcdddd;
  }

  input:active {
    box-shadow: 0px 0px 0px 1.5px #7686f5;
    border-color: #7686f5;
  }

  input:focus {
    box-shadow: 0px 0px 0px 1.5px #7686f5;
    border-color: #7686f5;
  }

  @media screen and (max-width: 375px) {
    label[htmlFor="password"] {
      right: 30%;
    }
  }
`;

const AuthFormContainerFieldsContentButton = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: flex-start;

  button {
    border-radius: 4px;
    background: #fbba46;
    border: 1px solid #fbba46;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    padding: 0.6rem 1.2rem;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease;
  }

  button:hover {
    background: #fdc75b;
    border: 1px solid #fdc75b;
  }
`;

const AuthFormContainerFieldsAccount = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.2rem;

  p {
    font-size: 14px;
    color: #000;
    font-weight: 500;
  }

  span {
    color: #1f1f1f;
    cursor: pointer;
    font-weight: 700;
    margin-left: 3px;
  }
`;

const AuthFormContainerImage = styled.div`
  flex: 3;
  display: flex;
  box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 800px) {
    height: 120px;
    flex: none;
    box-shadow: none;
  }
`;
