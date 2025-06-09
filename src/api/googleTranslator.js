import axios from "axios";

const API_KEY = "AIzaSyAJ1nyzu_yOUICr01W5aozct_OU5h1EjnE";
const API_URL = "https://translation.googleapis.com/language/translate/v2";
const translateText = async (text, targetLanguage) => {
  return await axios.post(`${API_URL}?key=${API_KEY}`, {
    q: text,
    target: targetLanguage,
  });  
};
export default translateText;
