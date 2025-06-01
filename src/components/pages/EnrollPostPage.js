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
        console.log(res);
        setSelectList(res.data);
        setSelected(res.data[0].id);
      })
      .catch((err) => {
        console.error(err);
      });      
  }, []);

  const selectHandle = (e) => {
    setSelected(e.target.value);    
  }

  const handleTranslate = async (text) => {
    if (text) {
      return await translateText(text, targetLanguage);
    }
  };

  const makeEnglishArray = () => {
    const data = inputText;
    const tempEnglish = [];
    let c = 0;

    tempEnglish[c] = "";

    for (let i = 0; i < data.length; i++) {
      if (data[i] === "\0") {
      }
      if (data[i] === "\n") {
        c++;
        tempEnglish[c] = "";
        continue;
      }

      tempEnglish[c] += data[i];
    }

    if (tempEnglish[c] === "") {
      tempEnglish.pop();
    }

    setEnglish(tempEnglish);
  };

  const translationArray = () => {
    const tempResult = [];

    for (let i = 0; i < english.length; i++) {
      let ko = handleTranslate(english[i]);
      tempResult.push(ko);
    }

    setResult(tempResult);
  };

  const EnrollPost = () => {
    for (let i = 0; i < english.length; i++) {
      console.log(result);
      EnrollPostApi(english[i], result[i]?.value, selected)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
          if (err.response) {
            console.error(err.response.data.detailMessage);
          }
        });
    }
  };

  const processHandle = () => {
    makeEnglishArray();
    translationArray();
    EnrollPost();
  };

  return (
    <Layout>
      <Main>
        <Title>ENROLL</Title>
        <Select onChange={selectHandle} value={selected}>
          {selectList.map(item=>(
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
        <Enroll onClick={processHandle}>글 등록</Enroll>
        {english.map((en, index) => (
          <div key={index}>{en}</div>
        ))}
        {result.map((ko, index) => (
          <div key={index}>{ko}</div>
        ))}
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
