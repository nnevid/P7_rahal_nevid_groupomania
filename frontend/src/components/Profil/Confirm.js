import React from "react";

const Confirm = ({ message, onConfirm }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          background: "white",
          padding: "50px",
          borderRadius: "30px",
          flexDirection: "column",
        }}
      >
        <h3 style={{ display: "block" }}>{message}</h3>
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <button onClick={() => onConfirm(true)} style={{ margin: "0px 15px 0 15px", cursor: "pointer" }}>
            Supprimer
          </button>
          <button onClick={() => onConfirm(false)} style={{ margin: "0px 15px 0 15px", cursor: "pointer" }}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
