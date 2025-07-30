import React, { useContext, useEffect, useState } from "react";
import "./sidemenu.css";
import { Context } from "../../context/ContextProvider";

const SideMenu = () => {
  const {
    toggleSidebar,
    setToggleSidebar,
    recentPrompts,
    setRecentPrompts,
    buttonPrompts,
    newChat,
    setShowSetting
  } = useContext(Context);

  let recentPromptSliced = recentPrompts;

  // console.log(recentPromptSliced)

  return (
    <section className={toggleSidebar ? "side-menu " : "side-menu hide"}>
      <div className="side-menu-content">
        <div className="top">
          <div
            className="toggle-btn"
            onClick={() => setToggleSidebar((prev) => !prev)}
          >
            <i className="uis uis-bars"></i>
          </div>

          <div
            className="newchat-btn"
            onClick={newChat}
          >
            <i className="uil uil-plus"></i>
            <p> New Chat </p>
          </div>

          {recentPromptSliced.length !== 0 && (
            <div className="recent-chats">
              <h3>Recent Chats</h3>
              <div className="recent-chats-list">
                {recentPromptSliced.map((item, i) => {
                  return (
                    <div
                      className="chat"
                      key={i}
                      onClick={() => buttonPrompts(item)}
                    >
                      <i className="uil uil-comment-alt-dots"></i>
                      <p>
                        {item.slice(0, 15)}
                        {item.length > 15 && <span>...</span>}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="bottom">
          <a href="https://support.google.com/gemini" target="_blank" className="help" onClick={() => setToggleSidebar(true)}>
            <i className="uil uil-question-circle"></i>
            <p>Help</p>
          </a>
          <div className="activity" onClick={() => setToggleSidebar(true)}>
            <i className="uil uil-comments-alt"></i>
            <p> Activities</p>
          </div>
          <div className="setting" onClick={()=>setShowSetting(prev => !prev) }>
            <i className="uil uil-setting"></i>
            <p> Setting</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideMenu;
