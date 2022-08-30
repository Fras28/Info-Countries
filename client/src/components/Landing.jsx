import React from "react";
import {  NavLink } from "react-router-dom";
import LOGO from "./Assets/world-unscreen.gif"

export default function LandingPage() {
  return (
    <div className="containerL">
      <div className="conteinerB">
        <div className="landing">
        <NavLink to="/Home">
        <img className="fWorld" src={LOGO} alt="logo" max-height="30%"></img>
        <div>
        <button className="btnL">
  <span></span>
  <span></span>
  <span></span>
  <span></span> Start
</button>
        </div>
        </NavLink>
      </div>

        </div>
    </div>
  );
}