"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Login.module.css";
import "./design.css";
import axios from "axios";
import Button from "./Button";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleonchangee = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/users/login", login, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response.data, response.data.email);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("email", response.data.email);
      // console.log("local");

      toast.success("Login successful! Redirecting...");

      // console.log(response.data);
      router.refresh();
      window.location.href = "/dashboard";
    } catch (error) {
      if (error.response) {
        // Display error notifications using toast
        if (error.response.status === 404) {
          toast.error("User not found. Please check your email.");
        } else if (error.response.status === 401) {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error("User not found with this email and password");
        }
      } else {
        toast.error("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Moodli</title>
        <meta
          name="description"
          content="Welcome to Moodli, your mood-tracking community. Track your mood with emoji and join the community and chat with people. Get started now!"
        />
      </Head>
      {/* Toaster to display notifications */}
      <Toaster position="top-center" />
      <form className={styles.form} onSubmit={handlesubmit}>
        <h1 className={styles.title}>Log In / Register</h1>
        <p className={styles.subtitle}>You&apos;re one step away!</p>
        <input
          type="email"
          style={{ color: "green" }}
          placeholder="Email"
          value={login.email}
          onChange={handleonchangee}
          name="email"
          className={styles.input}
        />
        <input
          type="password"
          style={{ color: "green" }}
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
