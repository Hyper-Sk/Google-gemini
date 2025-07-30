import React, { useContext } from "react";
import "./chatbox.css";
import { Context } from "../../context/ContextProvider";

const ChatBox = () => {

  const { buttonPrompts,setToggleSidebar } = useContext(Context);

  return (
    <section className="header" onClick={()=> setToggleSidebar(false)}>
      <h1 className="title">Hello, there</h1>
      <p className="subtitle">How can I help you today?</p>
      <ul className="suggestion-list">
      
        <li className="suggestion" onClick={() => buttonPrompts("Can you summarize the top 3 news stories relevant to my country or industry today?")}>
          <h4 className="text">
          Can you summarize the top 3 news stories relevant to my country or industry today?
          </h4>
          <div className="icon">
          <i className="uil uil-lightbulb-alt"></i>
          </div>
        </li>
        <li className="suggestion" onClick={() => buttonPrompts("What should I eat today to stay on track with my fitness or health goals?")}>
          <h4 className="text">
          What should I eat today to stay on track with my fitness or health goals?
          </h4>
          <div className="icon">
          <i className="uil uil-pen"></i>
          </div>
        </li>
        <li className="suggestion" onClick={() => buttonPrompts("What’s one thing I can do today to grow my career or job prospects?")}>
          <h4 className="text">
          What’s one thing I can do today to grow my career or job prospects?
          </h4>
          <div className="icon">
          <i className="uil uil-compass"></i>
          </div>
        </li>
        <li className="suggestion" onClick={() => buttonPrompts("Can you give me a quick coding challenge or concept to practice today?")}>
          <h4 className="text">
          Can you give me a quick coding challenge or concept to practice today?
          </h4>
          <div className="icon">
          <i className="uil uil-arrow"></i>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default ChatBox;
