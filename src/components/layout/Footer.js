import React from "react";
import styled from "styled-components";
import Twitter from "../../assets/icons8-twitter-50.png";
import Facebook from "../../assets/icons8-facebook-50.png";
import Instagram from "../../assets/icons8-instagram-50.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container className="footer">
      <div className="footer__sub-box">
        <span className="footer__title">SEHO-ENGLISH-UPLOADER<em>(clone coding)</em></span>
        <small className="footer__text">사업자등록번호: 000-0000-0000</small>
        <small className="footer__text">주소: 서울특별시 구로구</small>
        <small className="footer__text footer__copyright">
          &copy; All rights reserved by L.S.H.
        </small>
      </div>
      <div className="footer__sub-box footer__social-box">
        <span className="footer__text">
          <Link to="https://x.com">
            <img src={Twitter} alt="" />
          </Link>
        </span>
        <span className="footer__text">
          <Link to="https://facebook.com">
            <img src={Facebook} alt="" />
          </Link>
        </span>
        <span className="footer__text">
          <Link to="https://instagram.com">
            <img src={Instagram} alt="" />
          </Link>
        </span>
      </div>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  margin-top: 50px;
  height: 250px;
  width: 100%;
  background-color: #ececec;
  display: flex;

  .footer__sub-box {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    box-sizing: border-box;
  }

  .footer__copyright {
    position: relative;
    bottom: -60px;
  }

  .footer__title {
    font-size: 40px;
    font-weight: 400;
    margin-bottom: 10px;
    em{
      font-size: 0.6em;
      font-weight: normal;
      }
  }

  .footer__text {
    color: rgba(0, 0, 0, 0.7);
    margin-bottom: 5px;
    img {
      width: 40px;
      height: 40px;
    }      
  }

  .footer__social-box {
    flex-direction: row;
    justify-content: flex-end;
  }

  .footer__text img {
    transform: scale(1.1);
    margin-right: 15px;
  }
`;
