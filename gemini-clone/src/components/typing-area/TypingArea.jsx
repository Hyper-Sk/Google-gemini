import React, { useContext } from "react";
import "./typingarea.css";
import { Context } from "../../context/ContextProvider";

const TypingArea = () => {

  const { setInput, input, setDarkMode, handleDeleteChat, darkMode, runPrompt,setToggleSidebar } = useContext(Context)
  
  

  return (
    <section className="typing-area" onClick={() => setToggleSidebar(false)}>
      <form onSubmit={runPrompt} className="typing-form">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter a prompt here"
            className="typing-input"
            value={input}
            required
            onChange={(e)=>setInput(e.target.value)}
          />
          <button
            
            id="send-message-button"
            className="icon"
          >
            <i className="uil uil-message"></i>
          </button>
        </div>
        <div className="action-buttons">
          <div className="icon" onClick={() => {
            setDarkMode(prev => !prev )
            localStorage.setItem('dark-mode',!darkMode)
          }}>
            <i className="uil uil-brightness"></i>
          </div>
          <div className="icon" onClick={handleDeleteChat}>
            <i className="uil uil-trash-alt"></i>
          </div>
        </div>
      </form>
      <p className="disclaimer-text">
        Gemini may display inaccurate info, including about people, so
        double-check its responses.
        Powered by <a href="https://linkedin.com/in/shaik-sohail-ba49351b3" target="_blank">Shaik Sohail</a>
      </p>
    </section>
  );
};

export default TypingArea;
