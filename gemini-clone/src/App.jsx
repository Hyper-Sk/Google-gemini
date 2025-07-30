import React, { useContext, useState } from "react";
import "./index.css";
import SideMenu from "./components/side-menu/SideMenu";
import ChatBox from "./components/chat-box/ChatBox";
import ChatList from "./components/chat-list/ChatList";
import TypingArea from "./components/typing-area/TypingArea";
import { getResponse } from "./components/google-gemini/Gemini";
import { Context } from "./context/ContextProvider";
import TopBar from "./components/top-bar/TopBar";

const App = () => {
  const {
    darkMode,
    handleDeleteChat,
    isChatting,
    setShowSetting,
    showSetting,
    setRecentPrompts,
    hanldeDeleteRecentPrompts,
    hanldeDeleteHistory
  } = useContext(Context);

  

  return (
    <>
      <main className={darkMode ? "main dark-mode" : "main"}>
        <SideMenu />

        <div className="right-view">
          <TopBar />
          {isChatting ? <ChatList /> : <ChatBox />}
        </div>

        <TypingArea />



        {
          showSetting &&
          <div className="popup">
          <div className="popup-content">
            <h4>Settings</h4>
            <p onClick={hanldeDeleteRecentPrompts}>Delete Recent Chats</p>
            <p onClick={hanldeDeleteHistory}>Delete History</p>
            <i className="uil uil-times" onClick={()=> setShowSetting(false)}></i>
          </div>
        </div>
        }
      </main>
    </>
  );
};

export default App;
