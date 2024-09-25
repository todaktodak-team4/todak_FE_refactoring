import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as S from "../css/StyledLogin";

const Login = () => {
  const [username, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // 컴포넌트가 마운트되면 상단으로 스크롤
    window.scrollTo(0, 0);
  }, []);
  const handleLogin = async () => {
    try {
      // Make the POST request to the login endpoint
      const response = await axios.post(
        "http://127.0.0.1:8000/accounts/login/",
        {
          username: username,
          password: password,
        }
      );

      // Check if the status code is 200 (success)
      if (response.status === 200) {
        console.log(response.data); // Log the response data
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        alert("로그인에 성공했습니다.");
        navigate("/", { replace: true });
        window.location.reload();
      } else {
        // Handle other response statuses
        alert("로그인 실패: " + response.statusText);
      }
    } catch (error) {
      // Check for specific status codes in error response
      if (error.response && error.response.status === 401) {
        alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
      } else {
        setError("로그인에 실패했습니다.");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission behavior
      handleLogin(); // Call the login function
    }
  };

  return (
    <S.Body>
      <S.Container>
        <img
          id="Img"
          src={`${process.env.PUBLIC_URL}/img/TodakLogo5.svg`}
          alt="Img"
        />
        <S.Title>로그인</S.Title>
        <S.Step1Items>
          <S.Step1Item>
            <S.NavName>
              <p>아이디</p>
            </S.NavName>
            <input
              name="username"
              id="username"
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setId(e.target.value)}
              onKeyDown={handleKeyDown} // Add the keydown handler
            />
          </S.Step1Item>
          <S.Step1Item>
            <S.NavName>
              <p>비밀번호</p>
            </S.NavName>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="비밀번호(영어, 숫자, 특수문자 조합 12자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown} // Add the keydown handler
            />
          </S.Step1Item>
        </S.Step1Items>
        <S.LoginBtn onClick={handleLogin}>
          <p>로그인하기</p>
        </S.LoginBtn>
      </S.Container>
    </S.Body>
  );
};

export default Login;
