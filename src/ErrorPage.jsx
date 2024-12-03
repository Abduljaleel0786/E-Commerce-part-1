import React from 'react';
import ErrorImg from "./images/error (1).svg";

const ErrorPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "90%",
        }}
      >
        <img
          className="img-fluid"
          src={ErrorImg}
          alt="Error"
          style={{
            width: "100%",
            maxWidth: "400px",
            marginBottom: "20px",
          }}
        />
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px",
          }}
        >
          Something’s wrong here...
        </h1>
        <p
          style={{
            color: "#555",
            fontSize: "16px",
          }}
        >
          We can't seem to find the page you're looking for. Try going back or checking the URL.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
