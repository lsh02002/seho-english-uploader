import axios from "axios";

/*** 본 프로젝트를 github에 올리기위해 본 구글 번역기의 API_KEY 삭제 조치 하였음!!! ***/
/*** 다음 API_KEY는 구글 웹에서 삭제하여 사용할 수 없음!!! ***/
const API_KEY = "AIzaSyAJ1nyzu_yOUICr01W5aozct_OU5h1EjnE";
const API_URL = "https://translation.googleapis.com/language/translate/v2";
const translateText = async (text, targetLanguage) => {
  return await axios.post(`${API_URL}?key=${API_KEY}`, {
    q: text,
    target: targetLanguage,
  });  
};
export default translateText;
