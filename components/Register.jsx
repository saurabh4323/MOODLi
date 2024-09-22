"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Login.module.css"; // Importing the CSS module
import "./design.css";

import Button from "./Button";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className="backgroun-shapes"></div>
      <div className="backgroun-shape"></div>
      <div className="backgroun-shap"></div>

      <Head>
        <title>Login / Register</title>
      </Head>
      <form className={styles.form}>
        <h1 className={styles.title}>Log In / Register</h1>
        <p className={styles.subtitle}>You&apos;re one step away!</p>
        <input type="email" placeholder="Email" className={styles.input} />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
        />
        <Button type="submit" className={"button"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Register;
