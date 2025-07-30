import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.GOOGLE_GEMINI_KEY ; // Replace with your actual API key!



export const getResponse = async (messageInput,history) => {

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history:history,
      generationConfig:{
          candidateCount:1,
      }
    });

    const result = await chat.sendMessage(messageInput);
    const response = await result.response;
    const text = response.text();
    //console.log(text); // Log the single response text


    // manual method

    // let newArray = text.split('**')
    // console.log(newArray)
    // let newText;
    // for (let i = 0; i < newArray.length; i++){
    //   if (i === 0 || i%2 === 0) {
    //     newText += newArray[i]
    //   } else {
    //     newText += "<b>" + newArray[i] + "</b>"
    //   }
    // }
    // let finalText = newText.split("*").join('<br>')

    
    // most working method 
    const formatText = (text) => {
      return text
        // Replace **...** with <strong>...</strong>
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Replace * with <br> only when it's standalone (e.g., " * Text")
        .replace(/\s\*(?=\s|[A-Z])/g, '<br><br>');
    };
    const finalText = formatText(text)
    // console.log(finalText)
    return finalText;

  } catch (error) {
    console.error("Error in getResponse:", error);
    return "An error occurred."; // Return an error message
  }
};
