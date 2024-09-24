"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Login.module.css";
import "./design.css";
import axios from "axios";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
const cors = require("cors");
const Register = () => {
  const router = useRouter();
  const [signup, setsignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setsignup({ ...signup, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!signup.name || !signup.email || !signup.password) {
      toast.error("All fields are required."); // Error message
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(signup.email)) {
      toast.error("Please enter a valid email address."); // Validate email
      return;
    }

    try {
      const response = await axios.post(
        // "http://localhost:3000/api/users/signup",
        "https://moodly-nine.vercel.app/api/users/signup",
        signup
      );
      console.log(response.data);
      localStorage.setItem("isAuthenticated", "true");
      toast.success(
        "You registered successfully. Check your email for verification!"
      );
      router.push("/dashboard"); // navigate to login page
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error || "User already exists.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className="backgroun-shapes"></div>
      <div className="backgroun-shape"></div>
      <div className="backgroun-shap"></div>

      <Toaster
        toastOptions={{
          success: {
            style: {
              color: "whitesmoke",
              background: "green",
            },
          },
          error: {
            style: {
              border: "2px solid #f5f5f5",
              marginTop: "7%",
              color: "whitesmoke",
              background: "red",
            },
          },
        }}
      />

      <Head>
        <title>Register</title>
      </Head>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Log In / Register</h1>
        <p className={styles.subtitle}>You&apos;re one step away!</p>

        <input
          type="text"
          name="name"
          value={signup.name}
          onChange={handleInputChange}
          placeholder="Full Name"
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={signup.email}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={signup.password}
          onChange={handleInputChange}
          className={styles.input}
        />

        <Button type="submit" className={"button"}>
          Submit
        </Button>

        <Link href={"/login"}>
          <p style={{ marginTop: "10px", color: "blue" }}>
            Already have an account? Log in.
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Register;
