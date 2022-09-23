import React from "react";
import LoadingPokeball from "../../assets/LoadingPokeball.gif";
import LoadingText from "../../assets/LoadingText.png";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <img className="loading-image" src={LoadingPokeball} alt="Loading..." />
      <div>
        <img src={LoadingText} alt="" />
      </div>
    </div>
  );
}
