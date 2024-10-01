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

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userId", response.data.userId);
      console.log("local");

      console.log(response.data);
      router.refresh();
      window.location.href = "/dashboard";
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
