import React, { useContext,useRef } from "react";
import "./chatlist.css";

import ai from "./../../assets/ai.png";
import userImg from "./../../assets/user.jpg";
import { Context } from "../../context/ContextProvider";

const ChatList = () => {

  const result = useRef()

  const { loading, messages, isChatting,setToggleSidebar,input,isLoading } = useContext(Context)
  // console.log(messages)

  let messagesSliced = messages.slice(-2)

  // console.log(isChatting)
  return (
    <>
      <div className="chat-list" onClick={() => setToggleSidebar(false)}>
        {
          messages.length === 0 ? <div className="spinner">
            <img src={ai} alt="" />
            
          </div> : messagesSliced.map((item, i) => {
          return (
            <div key={i}>
              {item.role === "user" ? (
                <div className="message" key={i}>
                  <img src={userImg} alt="" />
                  <p>
                    {
                      loading ? input : item.parts[0].text
                    }
                  </p>
                </div>
              ) : (
                <div className="message incoming" key={i}>
                    <img src={ai} alt="ai image" />
                    
                    {
                      loading ? <div className="loading-indicator">
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                      </div> : <p dangerouslySetInnerHTML={{__html:  item.parts[0].text}}></p>
                   } 
                </div>
              )}
            </div>
          );
          }).slice(-2)      
        }
        {
          // console.log(messages[-1].role)
        }



      </div>
    </>
  );
};

export default ChatList;
