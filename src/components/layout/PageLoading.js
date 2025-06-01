import React from "react";
import styled from "styled-components";

const PageLoading = () => {
  return (
    <Loading>
      <span></span>
      <span></span>
      <span></span>
    </Loading>
  );
};

export default PageLoading;

const Loading = styled.div`
  span {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-color: gray;
    border-radius: 50%;
    animation: loading 1s 0s linear infinite;
  }

  span:nth-child(1) {
    animation-delay: 0s;
    background-color: red;
  }

  span:nth-child(2) {
    animation-delay: 0.2s;
    background-color: dodgerblue;
  }

  span:nth-child(3) {
    animation-delay: 0.4s;
    background-color: royalblue;
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
`;
