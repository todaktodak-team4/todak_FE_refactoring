import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as M from "../css/StyledNav";
import NeedLogin from "./NeedLogin";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 가져오기 위한 훅
  const [token, setToken] = useState(localStorage.getItem("access_token")); // localStorage에서 토큰 가져오기
  const [userId, setUserId] = useState(null); // 추가: 사용자 ID 상태
  const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 모달 창 보이기 여부 상태
  useEffect(() => {
    // 토큰 유효성 검사
    const validateToken = async () => {
      if (token) {
        try {
          const response = await fetch("http://127.0.0.1:8000/token/verify/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ token }),
          });

          if (response.status === 401) {
            // 토큰이 유효하지 않으면 처리
            localStorage.removeItem("access_token");
            setToken(null);
            setShowLoginModal(true);
          }
        } catch (error) {
          console.error("Token validation failed:", error);
          setShowLoginModal(true);
        }
      }
    };

    validateToken();
  }, [token]);
  const goToRemeberTree = async () => {
    if (token) {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/accounts/api/get-user-id-from-token",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const userId = data.userId; // API 응답에서 사용자 ID를 가져옴
          setUserId(userId); // 사용자 ID 상태에 저장
          console.log("User ID:", userId);

          const treeResponse = await fetch(
            `http://127.0.0.1:8000/rememberTree/user/${userId}/`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`, // 토큰을 헤더에 추가
              },
            }
          );

          if (treeResponse.ok) {
            const treeData = await treeResponse.json();
            console.log("Remember Tree Data:", treeData);

            if (treeData.length > 0) {
              navigate("/rememberTree"); // 페이지 이동
            } else {
              alert("기억나무를 생성해주세요.");
              navigate("/plantTreeStepOne"); // 페이지 이동
            }
          } else {
            navigate("/plantTreeStepOne"); // 페이지 이동
          }
        } else {
          setShowLoginModal(true); // 응답이 실패한 경우 로그인 모달 창 보이기
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setShowLoginModal(true); // 에러 발생 시 로그인 모달 창 보이기
      }
    } else {
      setShowLoginModal(true); // 토큰이 없는 경우 모달 창 보이기
    }
  };
  const goToMemorialHall = () => {
    if (token) {
      navigate("/memorialHallList");
    } else {
      setShowLoginModal(true); // 토큰이 없는 경우 모달 창 보이기
    }
  };
  const goToMemorialHallSignup = () => {
    if (token) {
      navigate("/memorialHallSignup");
    } else {
      setShowLoginModal(true); // 토큰이 없는 경우 모달 창 보이기
    }
  };
  return (
    <M.Nav>
      <M.Navbar>
        {showLoginModal && <NeedLogin />}
        <M.NavItem isActive={location.pathname === "/"}>
          <a href="/">HOME</a>
          <hr />
        </M.NavItem>
        <M.NavItem isActive={location.pathname === "/memorialHallList"}>
          <a onClick={goToMemorialHall}>온라인 헌화</a>
          <hr />
        </M.NavItem>
        <M.NavItem isActive={location.pathname === "/rememberTree"}>
          <a onClick={goToRemeberTree}>기억 나무</a>
          <hr />
        </M.NavItem>
        <M.NavItem isActive={location.pathname === "/memorialHallSignup"}>
          <a onClick={goToMemorialHallSignup}>헌화 공간 신청</a>
          <hr />
        </M.NavItem>
      </M.Navbar>
    </M.Nav>
  );
};

export default Nav;
