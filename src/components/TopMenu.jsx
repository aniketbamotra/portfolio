import React, { useState } from 'react'
import logo from "../assets/images/logo.svg"
import newLogo from "../assets/images/Logo.png"
import "./comp.css"

const TopMenu = () => {

    const menuOpen = () => {
        let menu = document.querySelector(".slide-in-menu");
        menu.classList.toggle("slide-in-menu-close");
        let lowerLine = document.querySelector("#l-line");
        lowerLine.classList.toggle("l-line-anime");
    }

  return (
    <header>
        <img
          src={newLogo}
          alt=""
          className='logo'
        />
        <div className="menu-icon" onMouseEnter={menuOpen}>
          <svg
            id="menu"
            viewBox="0 0 95 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="2"
              y1="2"
              x2="78"
              y2="2"
              stroke="#10001B"
              strokeWidth="4"
              strokeLinecap="round"
              id="u-line"
            />
            <line
              x1="17"
              y1="17"
              x2="93"
              y2="17"
              stroke="#10001B"
              strokeWidth="4"
              strokeLinecap="round"
              id="l-line"
            />
          </svg>
        </div>
        <ul className='slide-in-menu slide-in-menu-close'>
          <li className="font">
            <a href='#bio'>
              About
            </a>
          </li>
          <li className="font">
            <a href='#project'>
              Projects
            </a>
          </li>
          <li className="font">
            <a href='#contact-title'>
              Contact
            </a>
          </li>
        </ul>
      </header>
  )
}

export default TopMenu