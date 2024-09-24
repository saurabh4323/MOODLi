"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Login.module.css";
import "./design.css";
import axios from "axios";
import Button from "./Button";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleonchangee = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value }); // Corrected here
  };
  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        // "http://localhost:3000/api/users/login",
        "hhttps://moodly-mood.vercel.app/api/users/login",
        login,
        {
          headers: {
            "Content-Type": "application/json", // Explicitly set content type
          },
        }
      );

      // Set localStorage on successful login
      localStorage.setItem("isAuthenticated", "true");
      console.log("local");
      // Set the authentication status
      console.log(response.data);
      router.refresh();
      router.push("/dashboard"); // Navigate after setting localStorage
    } catch (error) {
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Log In</title>
      </Head>
      <form className={styles.form} onSubmit={handlesubmit}>
        {" "}
        {/* Use onSubmit here */}
        <h1 className={styles.title}>Log In / Register</h1>
        <p className={styles.subtitle}>You&apos;re one step away!</p>
        <input
          type="email"
          placeholder="Email"
          value={login.email}
          onChange={handleonchangee}
          name="email"
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={login.password}
          onChange={handleonchangee}
          name="password"
          className={styles.input}
        />
        <Button type="submit" className={"button"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
