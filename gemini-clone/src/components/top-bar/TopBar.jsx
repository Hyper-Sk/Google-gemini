import React, { useContext } from "react";
import userImg from '../../assets/user.jpg'
import './topbar.css'
import { Context } from "../../context/ContextProvider";

const TopBar = () => {

    const {darkMode ,setDarkMode} = useContext(Context)


    return <section className="topbar">
        <div className="topbar-content">
            <h2>Gemini Flash 2.0</h2>
          
            <div className="right">

            <div className="icon" onClick={() => {
            setDarkMode(prev => !prev )
            localStorage.setItem('dark-mode',!darkMode)
          }}>
            <i className="uil uil-brightness"></i>
            </div>

            <div className="profile" title="Profile Picture">
                <img src={userImg} alt="" />
            </div>
            </div>
      </div>
  </section>;
};

export default TopBar;
