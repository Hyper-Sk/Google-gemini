import React, { createContext, useEffect, useState } from "react";
import { getResponse } from "../components/google-gemini/Gemini";

export const Context = createContext();

const defaultHistory = [
  {
    role: "user",
    parts: [
      {
        text: "Hi my name is shaik sohail age = 23 old software developer, 2+ years of Experience.",
      },
    ], // Corrected: using parts
  },
  {
    role: "model",
    parts: [{ text: "Okay!!! I understand." }],
    // Corrected: using parts
  },
  {
    role: "user",
    parts: [
      {
        text: "I have created this project which I am using now using google Gemini AI. if someone ask you about who created you, who created this project, who made this app. tell them shaik sohail created this app using google gemini ai and React.",
      },
    ], // Corrected: using parts
  },
  {
    role: "model",
    parts: [{ text: "Okay!!! I understand." }],
    // Corrected: using parts
  },

]

const ContextProvider = (props) => {

  const [input, setInput] = useState("");
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [showSetting,setShowSetting] = useState(false)
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChatting, setIsChatting] = useState(false);
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [history, setHistory] = useState(defaultHistory);

  const [recentPrompts, setRecentPrompts] = useState([]);
  const [messages, setMessages] = useState([]);

  // console.log(messages);
  // console.log(isChatting);

  const runPrompt = async (e) => {
    e.preventDefault()
    setIsChatting(true);
    setLoading(true);

    let res = await getResponse(input, history);
    if (res) {
      setMessages([
        ...messages,
        {
          role: "user",
          parts: [{ text: input }], // Corrected: using parts
        },
        {
          role: "model",
          parts: [{ text: res }], // Corrected: using parts
        },
      ]);
      setHistory([
        ...history,
        {
          role: "user",
          parts: [{ text: input }], // Corrected: using parts
        },
        {
          role: "model",
          parts: [{ text: res }], // Corrected: using parts
        },
      ]);
      setRecentPrompts([...recentPrompts, input]);
      setLoading(false);
      setInput("");
    } else {
      console.log("Error While Fetching data....");
    }
  };
  const buttonPrompts = async (msg) => {
    setLoading(true);
    setIsChatting(true);
    setToggleSidebar(false);

    let res = await getResponse(msg, history);
    if (res) {
      setMessages([
        ...messages,
        {
          role: "user",
          parts: [{ text: msg }], // Corrected: using parts
        },
        {
          role: "model",
          parts: [{ text: res }], // Corrected: using parts
        },
      ]);
      setHistory([
        ...history,
        {
          role: "user",
          parts: [{ text: msg }], // Corrected: using parts
        },
        {
          role: "model",
          parts: [{ text: res }], // Corrected: using parts
        },
      ]);
      setRecentPrompts([...recentPrompts, msg]);
      setInput("");
      setLoading(false);
    } else {
      console.log("Error While Fetching data....");
    }
  };
  const newChat = () => {
    setMessages([]);
    setIsChatting(false);
    setToggleSidebar(false);
  };
  const handleDeleteChat = () => {
    let isYes = confirm("Are your Sure? All Messages Will be Deleted !!!");

    if (isYes) {
      setMessages([]);
      setIsChatting(false);
    }
  };
  const hanldeDeleteRecentPrompts = () => {
    setRecentPrompts([])
    setShowSetting(false)
  }
  const hanldeDeleteHistory = () => {
    setHistory(defaultHistory)
    setShowSetting(false)
  }

  // localStorage for darkmode
  useEffect(() => {
    if (localStorage.getItem("dark-mode") === null) {
      localStorage.setItem("dark-mode", darkMode);
    } else {
      let localDarkMode = localStorage.getItem("dark-mode");
      localDarkMode === "true" ? setDarkMode(true) : setDarkMode(false);
    }
  }, [darkMode]);

  // localStorage for history
  useEffect(() => {
    const stored = localStorage.getItem("history");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed); // only if you want to set it
      } catch (e) {
        console.error("Invalid history in localStorage", e);
      }
    }
  }, []);

  // 2. Save history every time it changes
  useEffect(() => {
    if (history && Array.isArray(history)) {
      localStorage.setItem("history", JSON.stringify(history));
    }
  }, [history]);

  // localStorage for recentPrompts
  useEffect(() => {
    let stored = localStorage.getItem("recentPrompts");
    if (stored) {
      try {
        let parsed = JSON.parse(stored);
        setRecentPrompts(parsed);
      } catch (error) {
        console.log("Invalid recentPrompt in the localstorage.");
      }
    }
  }, []);
  // 2. Save recentPrompts  every time it changes
  useEffect(() => {
    if (recentPrompts && Array.isArray(recentPrompts)) {
      localStorage.setItem("recentPrompts", JSON.stringify(recentPrompts));
    }
  });

  const contextValues = {
    input,
    setInput,
    prevPrompts,
    setPrevPrompts,
    recentPrompts,
    setRecentPrompts,
    messages,
    setMessages,
    loading,
    setLoading,
    handleDeleteChat,
    runPrompt,
    setDarkMode,
    darkMode,
    toggleSidebar,
    setToggleSidebar,
    buttonPrompts,
    isChatting,
    setIsChatting,
    newChat,
    hanldeDeleteRecentPrompts,
    showSetting,
    setShowSetting,
    hanldeDeleteHistory
  };

  return (
    <Context.Provider value={contextValues}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
