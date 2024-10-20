import { useState, useEffect, useRef } from "react";
import styles from "../css/StyledTalkModal.module.css";
import { useNavigate, useLocation } from "react-router-dom";

function TalkModal({ onClose, myname, messages, setMessages }) {
  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: myname, text: message },
    ]);
  };
  const [getAnswer, setAnswer] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastTimer, setToastTimer] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const [question, setQuestion] = useState(""); // 질문 상태
  const questRef = useRef(null);
  const chatBoxRef = useRef(null);
  const messageWrapperRef = useRef(null); // 메시지 감싸는 참조
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const navigate = useNavigate();

  // 토큰 갱신 함수
  async function refreshAccessToken() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/accounts/token/refresh/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access);
        return data.access;
      } else {
        console.error("Failed to refresh access token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(
        "http://127.0.0.1:8000/rememberTree/daily-question-and-answer",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log("하루의 내역들:", data);
        setQuestion(data.dailyQuestion.question.questionText);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(
          "http://127.0.0.1:8000/rememberTree/chat-counseling/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            response = await fetch(
              "http://127.0.0.1:8000/rememberTree/chat-counseling/",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );
          } else {
            return;
          }
        }

        if (response.status === 404) {
          response = await fetch(
            "http://127.0.0.1:8000/daily-question/today-answers/",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const jsonData = await response.json();
            if (jsonData.length > 0) {
              const answerData = jsonData[0];
              setQuestion(
                answerData.question?.questionText || "No question available"
              ); // Optional chaining
            }
          }
        } else if (response.status === 200) {
          const jsonData = await response.json();
          console.log("Response data:", jsonData); // 전체 응답 구조 확인
          if (jsonData?.question) {
            setQuestion(jsonData.question); // question 값이 있을 때만 상태에 설정
          } else {
            setQuestion("No question available"); // question이 없을 경우 처리
          }
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    };

    fetchData();
  }, [token]);

  async function submitAnswer() {
    if (getAnswer.trim() !== "") {
      const payload = {
        message: getAnswer,
      };

      try {
        let response = await fetch(
          "http://127.0.0.1:8000/rememberTree/chat-counseling/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          const jsonData = await response.json();
          const aiResponseText = jsonData.message || ""; // AI의 응답

          // 사용자 메시지를 messages 배열에 추가
          setMessages((prev) => [
            ...prev,
            { sender: myname, text: getAnswer }, // 사용자 메시지 추가
          ]);

          // AI 응답으로 질문을 변경
          setQuestion(aiResponseText);

          setAnswer(""); // 입력 초기화
          handleShowToast("답변이 제출되었습니다.", 3000);
        } else {
          console.error("Failed to submit answer");
          handleShowToast("답변 제출에 실패했습니다.", 3000);
        }
      } catch (error) {
        console.error("Error submitting answer:", error);
        handleShowToast("답변 제출 중 오류가 발생했습니다.", 3000);
      }
    }
  }

  function handleShowToast(message, duration) {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMessage(message);
    const timer = setTimeout(() => setToastMessage(""), duration);
    setToastTimer(timer);
  }

  useEffect(() => {
    if (questRef.current) {
      const questElement = questRef.current;
      setIsExpanded(questElement.scrollHeight > questElement.clientHeight);
    }
  }, []);

  useEffect(() => {
    // 메시지가 변경될 때마다 스크롤을 최신 메시지로 이동
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]); // messages 배열이 변경될 때마다 실행

  return (
    <>
      <div className={`${styles.container} ${styles.fadeIn}`}>
        <div className={styles.innerContainer}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <button
              onClick={onClose}
              style={{
                fontFamily: "pretendard",
                width: "90px",
                height: "30px",
                fontSize: "20px",
                borderRadius: "30px",
              }}
            >
              닫기
            </button>
          </div>
          <div className={styles.chatting}>
            <div
              className={`${styles.quest} ${isExpanded ? styles.expanded : ""}`}
              ref={questRef}
              style={{
                marginBottom: "120px",
                maxHeight: "120px", // 최대 높이 설정
                overflowY: "auto", // Y축으로 스크롤 가능
                scrollbarWidth: "none", // Firefox에서 스크롤바 숨기기
                msOverflowStyle: "none", // Internet Explorer 및 Edge에서 스크롤바 숨기기
              }}
            >
              {myname}님 {question}
            </div>

            <div className={styles.messageWrapper} ref={messageWrapperRef}>
              <div
                className={styles.messagesContainer}
                ref={chatBoxRef}
                style={{
                  maxHeight: "300px", // 최대 높이 설정
                  overflowY: "auto", // Y축으로 스크롤 가능
                  padding: "10px", // 패딩 추가
                }}
              >
                {/* 가장 최근 메시지만 표시 */}
                {messages.length > 0 && (
                  <div className={styles.chatBox}>
                    {messages[messages.length - 1].text}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.answerWp}>
            <input
              name="answer"
              type="text"
              className={styles.answerBox}
              placeholder="질문에 대한 답을 입력해주세요."
              value={getAnswer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div className={styles.submit}>
              <img
                src="/img/answerSubmit.png"
                alt="submit button"
                onClick={submitAnswer}
                style={{
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
    </>
  );
}

export default TalkModal;
