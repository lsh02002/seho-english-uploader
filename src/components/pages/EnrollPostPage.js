import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../layout/Layout";
import translateText from "../../api/googleTranslator";
import { EnrollPostApi, GetCategoriesApi } from "../../api/sehomallApi";

const EnrollPostPage = () => {
  const [inputText, setInputText] = useState("");
  const [english, setEnglish] = useState([]);
  const [result, setResult] = useState([]);
  const [selectList, setSelectList] = useState([]);
  const [selected, setSelected] = useState(0);

  const [targetLanguage] = useState("ko");

  useEffect(() => {
    GetCategoriesApi()
      .then((res) => {
        setSelectList(res.data);
        setSelected(res.data[res.data.length - 1].id);

        if (res.headers?.accesstoken) {
          localStorage.setItem("accessToken", res.headers?.accesstoken);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const selectHandle = (e) => {
    setSelected(e.target.value);
  };

  const makeEnglishArray = () => {
    let tempEnglish = [];
    let c = 0;

    tempEnglish[c] = "";

    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] === "\n") {
        c++;
        tempEnglish[c] = "";
        continue;
      }

      tempEnglish[c] += inputText[i];
    }

    if (tempEnglish[c] === "") {
      tempEnglish.pop();
    }

    setEnglish(tempEnglish);
  };

  const translationArray = async () => {
    let tempResult = [];

    for (let i = 0; i < english.length; i++) {
      if (english[i]) {
        await translateText(english[i], targetLanguage)
          .then((res) => {
            console.log(res);
            tempResult[i] = res.data.data.translations[0].translatedText;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }

    setResult(tempResult);
  };

  const EnrollPost = async () => {
    for (let i = 0; i < english.length; i++) {
      await EnrollPostApi(english[i], result[i], selected)
        .then((res) => {
          console.log("db에 저장", res);

          if (res.headers?.accesstoken) {
            localStorage.setItem("accessToken", res.headers?.accesstoken);
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            console.error(err.response.data.detailMessage);
          }
        });
    }
  };

  const processHandle = async () => {
    makeEnglishArray();
    await translationArray();
  };

  return (
    <Layout>
      <Main>
        <Title>ENROLL</Title>
        <Select onChange={selectHandle} value={selected}>
          {selectList.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        <English>
          <div>영어</div>
          <textarea
            rows={15}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </English>
        <Enroll onClick={processHandle}>번역하기</Enroll>
        {english.map((en, index) => (
          <div key={index}>{en}</div>
        ))}
        {result.map((ko, index) => (
          <div key={index}>{ko}</div>
        ))}
        <Enroll onClick={EnrollPost}>글 등록</Enroll>
      </Main>
    </Layout>
  );
};

export default EnrollPostPage;

const Main = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 360px;
  border: 1px solid lightgray;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-weight: normal;
  margin: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 7px;
  box-sizing: border-box;
`;

const English = styled.div`
  width: 100%;
  overflow: hidden;
  div {
    font-size: 14px;
  }
  textarea {
    width: 95%;
    padding: 5px;
    outline: none;
  }
`;

const Enroll = styled.button`
  margin-top: 20px;
  width: 100%;
  border: none;
  padding: 10px;
  background-color: gray;
  cursor: pointer;
  color: white;
  transition: 0.2s;
  &:hover {
    background-color: lightgray;
  }
`;
