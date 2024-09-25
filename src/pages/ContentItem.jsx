import React, { useState, useEffect } from "react";
import * as H from "../css/StyledMemorialHallList";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContentItem = ({
  postId,
  img,
  name,
  date,
  wreathCount,
  messageCount,
  initialStatus, // 초기 상태
  isPrivate, // private 상태 추가
}) => {
  const navigate = useNavigate();
  const defaultImg = `${process.env.PUBLIC_URL}/img/ListContentImg.png`;
  const token = localStorage.getItem("access_token");

  const storedStatus = localStorage.getItem(`status-${postId}`);
  const [status, setStatus] = useState(storedStatus || initialStatus || "unparticipated");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  console.log("count:", wreathCount, "private:", isPrivate);

  // 날짜 포맷팅 함수
  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = dateObj.toLocaleDateString("ko-KR", options);
    return `등록일: ${
      formattedDate.endsWith(".") ? formattedDate.slice(0, -1) : formattedDate
    }`;
  };

  // Fetch status from server if not already in localStorage
  useEffect(() => {
    if (!storedStatus) {
      const fetchStatus = async () => {
        try {
          setIsLoading(true); // 로딩 시작
          const response = await axios.get(
            `http://127.0.0.1:8000/memorialHall/${postId}/participate`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const newStatus = response.data.status || "unparticipated";
          setStatus(newStatus);
          localStorage.setItem(`status-${postId}`, newStatus);
        } catch (error) {
          console.error("Error fetching status:", error);
          if (error.response && error.response.status === 401) {
            // Token expired or invalid, redirect to login
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
            navigate("/login");
          } else {
            setStatus("unparticipated");
            localStorage.setItem(`status-${postId}`, "unparticipated");
          }
        } finally {
          setIsLoading(false); // 로딩 종료
        }
      };

      fetchStatus();
    }
  }, [postId, token, storedStatus, navigate]);

  // Handle participation toggle
  const handleParticipation = async () => {
    const confirmMessage =
      status === "participated"
        ? "정말로 참여를 취소하시겠습니까? \n비공개 추모관의 경우 참여를 취소할 경우 해당 링크를 통해서만 다시 참여하기가 가능합니다."
        : "이 추모관에 참여하시겠습니까?";

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setIsLoading(true); // 로딩 상태 시작
      // POST 요청으로 참여/취소 처리
      const response = await axios.post(
        `http://127.0.0.1:8000/memorialHall/${postId}/participate`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newStatus = response.data.is_participated
        ? "participated"
        : "unparticipated";
      setStatus(newStatus);
      localStorage.setItem(`status-${postId}`, newStatus);

      // 상태 업데이트 후 로그 확인
      console.log("Updated status:", newStatus);
    } catch (error) {
      console.error("Error updating participation status:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.");
        navigate("/login");
      } else {
        alert("비공개 추모관이므로 링크를 통해 접근 가능합니다.");
      }
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  // 상태가 변경될 때 로그 확인 및 리렌더링 유도
  useEffect(() => {
    console.log("Status changed:", status);
  }, [status]);

  const goContent = () => {
    if (isPrivate) {
      alert("비공개 추모관이므로 링크를 통해 접근 가능합니다.");
      return;
    }
    navigate(`/memorialHall/${postId}`);
  };

  return (
    <H.ListContentItem key={status}> {/* 리렌더링 강제 */}
      <H.ListContentImg>
        <img id="img" src={img || defaultImg} alt="images" />
        <button
          className="hover-button"
          onClick={handleParticipation}
          disabled={isLoading} // 로딩 중일 때 버튼 비활성화
        >
          {isLoading ? "처리 중..." : status === "participated" ? "참여 취소하기" : "참여하기"}{" "}
          {/* 버튼 텍스트 */}
        </button>
      </H.ListContentImg>
      <H.ListContentInfo onClick={goContent}>
        <H.C1>
          <span onClick={() => navigate(`/memorialHall/${postId}`)}>
            {name}
          </span>
          <H.C2>
            {isPrivate && (
              <img
                id="Locked"
                src={`${process.env.PUBLIC_URL}/img/ListContentLock.svg`}
                alt="Locked"
              />
            )}
          </H.C2>
        </H.C1>

        <H.C3>
          <H.C4>{formatDate(date)}</H.C4>
          <H.C5>
            <button id="lotus"></button>
            {wreathCount}
            <button id="feather"></button>
            {messageCount}
          </H.C5>
        </H.C3>
      </H.ListContentInfo>
    </H.ListContentItem>
  );
};

export default ContentItem;
