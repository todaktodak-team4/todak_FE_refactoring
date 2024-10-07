import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as M from "../css/StyledMain";
import Nav from "./Nav";
import Info from "./Info";
import NeedLogin from "./NeedLogin";

const Main = () => {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("access_token")); // localStorage에서 토큰 가져오기
  const [userId, setUserId] = useState(null); // 추가: 사용자 ID 상태
  useEffect(() => {
    // 컴포넌트가 마운트되면 상단으로 스크롤
    window.scrollTo(0, 0);
  }, []);

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

  const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 모달 창 보이기 여부 상태

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
          // 사용자 ID를 상태에 저장하거나 필요한 작업 수행
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
            // 사용자 ID와 기억나무 데이터로 원하는 작업 수행

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

      // navigate("/plantTreeStepOne");
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

const goToMemorialSignup = () => {
  if (token) {
    navigate("/memorialHallSignup");
  } else {
    setShowLoginModal(true); // 토큰이 없는 경우 모달 창 보이기
  }
};
  return (
    <M.Body>
      <M.Container>
        {showLoginModal && <NeedLogin />}
        <img
          id="sill1"
          src={`${process.env.PUBLIC_URL}/img/sill1.png`}
          alt="Gross"
        />
        <img
          id="sill2"
          src={`${process.env.PUBLIC_URL}/img/sill2.png`}
          alt="Gross"
        />
        <Nav />
        <M.Content>
          <M.NavBtns>
            <M.NavBtnWrapper1>
              <M.NavBtnWrapper2 onClick={goToMemorialHall}>
                <a>온라인 헌화</a>
              </M.NavBtnWrapper2>
            </M.NavBtnWrapper1>
            <M.NavBtnWrapper1>
              <M.NavBtnWrapper2 onClick={goToRemeberTree}>
                <a>기억 나무</a>
              </M.NavBtnWrapper2>
            </M.NavBtnWrapper1>
            <M.NavBtnWrapper1>
              <M.NavBtnWrapper2 onClick={goToMemorialSignup}>
                <a>
                  헌화 공간
                  <br />
                  신청
                </a>
              </M.NavBtnWrapper2>
            </M.NavBtnWrapper1>
          </M.NavBtns>
        </M.Content>
        <M.ImageGross>
          <img
            id="Gross"
            src={`${process.env.PUBLIC_URL}/img/Gross.png`}
            alt="Gross"
          />
        </M.ImageGross>
        <img
          id="Img"
          src={`${process.env.PUBLIC_URL}/img/mainlanding.png`}
          alt="Img"
        />
      </M.Container>
      <Info />
    </M.Body>
  );
};

export default Main;
