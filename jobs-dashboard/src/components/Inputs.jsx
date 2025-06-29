import React from "react";
import styled from "styled-components";

const Form = () => {
  return (
    <StyledWrapper>
      <div className="content mt-6">
        <div className="text">Busqueda</div>
        <form action="#">
          <div className="field">
            <input required type="text" className="input" />

            <label className="label">Empleo</label>
          </div>
          <div className="field">
            <input required type="text" className="input" />

            <label className="label">Ciudad</label>
          </div>

          <button className="button">Buscar</button>
        </form>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .content {
    width: 260px;
    padding: 20px 30px;
    background: #dde1e7;
    border-radius: 10px;
    box-shadow: -3px -3px 7px #ffffff73, 2px 2px 5px rgba(94, 104, 121, 0.288);
  }

  .content .text {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 35px;
    color: #000;
  }

  .field {
    height: 40px;
    width: 100%;
    display: flex;
    position: relative;
  }

  .field:nth-child(2) {
    margin-top: 20px;
  }

  .field .input {
    height: 100%;
    width: 100%;
    padding-left: 45px;
    outline: none;
    border: none;
    font-size: 18px;
    background: #dde1e7;
    color: #595959;
    border-radius: 25px;
    box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
  }

  .field .input:focus {
    box-shadow: inset 1px 1px 2px #babecc, inset -1px -1px 2px #ffffff73;
  }

  .field .span {
    position: absolute;
    color: #595959;
    width: 50px;
    line-height: 55px;
  }

  .field .label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 45px;
    pointer-events: none;
    color: #666666;
  }

  .field .input:valid ~ label {
    opacity: 0;
  }

  .forgot-pass {
    text-align: left;
    margin: 10px 0 10px 5px;
  }

  .forgot-pass a {
    font-size: 16px;
    color: #666666;
    text-decoration: none;
  }

  .forgot-pass:hover a {
    text-decoration: underline;
  }

  .button {
    margin: 15px 0;

    width: 100%;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    font-weight: 600;
    background: #dde1e7;
    border-radius: 25px;
    border: none;
    outline: none;
    cursor: pointer;
    color: #000;
    box-shadow: 2px 2px 5px #babecc, -5px -5px 10px #ffffff73;
  }

  .button:focus {
    color: #3498db;
    box-shadow: inset 2px 2px 5px #babecc, inset -5px -5px 10px #ffffff73;
  }

  .sign-up {
    margin: 10px 0;
    color: #595959;
    font-size: 16px;
  }

  .sign-up a {
    color: #3498db;
    text-decoration: none;
  }

  .sign-up a:hover {
    text-decoration: underline;
  }
`;

export default Form;
