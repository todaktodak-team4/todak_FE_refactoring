import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/StyledWriteLetter.module.css";
import SentComplete from "../pages/SentComplete";

function WriteLetter({ onClose, treeId, userId }) {
  const [letter, setLetter] = useState("");
  const [showToast, setShowToast] = useState(true);
  const [isWritten, setIsWritten] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [letterTopClosed, setLetterTopClosed] = useState(false);
  const [mainLetterMoved, setMainLetterMoved] = useState(false);
  const [showSentComplete, setShowSentComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const containerRef = useRef(null);
  const textAreaRef = useRef(null);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSentComplete) return; // SentComplete 모달이 열려 있는 동안 클릭 무시

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        if (isWritten && letter.trim() === "") {
          handleClose(true, false); // 편지가 비어있을 때는 SentComplete 모달을 표시하지 않음
          return;
        }

        if (isWritten) {
          if (
            window.confirm("편지가 저장되지 않았습니다. 우체통을 닫을까요?")
          ) {
            handleClose(false, false); // 편지를 저장하지 않고 닫을 때도 SentComplete 모달을 표시하지 않음
          }
          return;
        }
        handleClose(true, false); // 편지 작성하지 않고 닫을 때도 SentComplete 모달을 표시하지 않음
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isWritten, letter, showSentComplete]);

  const handleInput = (event) => {
    const maxLength = 71;
    const text = event.target.value;
    const lines = text.split("\n");

    if (lines.length > 12) {
      event.preventDefault();
      return;
    }

    let formattedText = "";
    let currentLine = "";

    for (let i = 0; i < text.length; i++) {
      if (text[i] === "\n" || currentLine.length === maxLength) {
        formattedText += currentLine + "\n";
        currentLine = text[i] === "\n" ? "" : text[i];
      } else {
        currentLine += text[i];
      }
    }

    formattedText += currentLine;
    setLetter(formattedText);
    setIsWritten(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const cursorPosition = event.target.selectionStart;
      const lines = letter.split("\n");
      const newText =
        letter.substring(0, cursorPosition) +
        "\n" +
        letter.substring(cursorPosition);

      if (lines.length >= 12) {
        event.preventDefault();
        return;
      }

      setLetter(newText);
      setIsWritten(true);

      setTimeout(() => {
        textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd =
          cursorPosition + 1;
      }, 0);
    }
  };

  const sendLetterToBackend = async () => {
    try {
      console.log(letter);
      const response = await fetch(
        `http://127.0.0.1:8000/rememberTree/${treeId}/letters/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: letter,
            writer: userId,
            rememberTree: treeId,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("data:", data);
        setIsSent(true);
        setMainLetterMoved(true);

        setTimeout(() => {
          setLetterTopClosed(true);
        }, 1000);

        setTimeout(() => {
          setFadeOut(true);
        }, 2000);

        // 애니메이션이 끝난 후 모달을 열기 위해 상태를 설정합니다.
        setTimeout(() => {
          setShowSentComplete(true);
        }, 3000); // 애니메이션 시간에 맞춰 조절합니다.
      } else if (response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        alert(
          "30분 동안 활동이 없어서 자동 로그아웃 되었습니다. 다시 로그인해주세요."
        );
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Failed to submit data:", errorData);
        alert(
          "데이터 제출에 실패했습니다: " + (errorData.detail || "서버 오류")
        );
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      alert("네트워크 오류가 발생했습니다.");
    }
  };

  const handleSendClick = () => {
    if (isWritten) {
      if (letter.trim() === "") {
        handleClose(true, false); // 편지가 비어있을 때는 SentComplete 모달을 표시하지 않음
      } else if (window.confirm("편지를 보낼까요?")) {
        sendLetterToBackend();
      }
    } else {
      handleClose(true, false); // 편지 작성하지 않고 닫을 때도 SentComplete 모달을 표시하지 않음
    }
  };

  const handleClose = (instant = false, showSentCompleteModal = true) => {
    if (instant) {
      onClose();
      return;
    }
    setFadeOut(true);
    setTimeout(() => {
      onClose(); // 상태 업데이트 후 onClose를 호출합니다.
      if (showSentCompleteModal && !isSent) {
        setShowSentComplete(true);
      }
    }, 1000); // 애니메이션 시간과 일치시킵니다.
  };

  const handleCloseSentComplete = () => {
    setShowSentComplete(false);
    onClose();
  };

  return (
    <>
      <div
        className={`${styles.container} ${fadeOut ? styles.fadeOut : ""} ${
          styles.fadeIn
        }`}
        ref={containerRef}
      >
        {showToast && (
          <div className={styles.toastStyle}>
            편지를 작성하신 후 편지봉투를 클릭하면 작성이 완료됩니다.
          </div>
        )}
        <div className={styles.letterWp}>
          <div className={styles.content}>
            <textarea
              className={`${styles.mainLetter} ${
                isSent ? styles.mainLetterSent : ""
              } ${mainLetterMoved ? styles.mainLetterMoved : ""}`}
              placeholder="편지 내용을 입력해주세요."
              name="letter"
              value={letter}
              ref={textAreaRef}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              style={{
                backgroundImage: `url("/img/letterPaper.png")`,
                backgroundRepeat: "no-repeat",
                width: "1160px",
                height: "1073px",
                backgroundColor: "transparent",
                border: "none",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                wordBreak: "break-all",
                boxSizing: "border-box",
                outline: "none",
                lineHeight: "2.05",
              }}
            ></textarea>
          </div>
          <div
            className={`${styles.letterTop} ${
              letterTopClosed ? styles.letterTopClosed : ""
            }`}
          >
            <img src="/img/letterTop.png" alt="봉투 뚜껑" />
          </div>
          <img
            src="/img/letterBack.png"
            alt="뒷 배경"
            className={styles.letterBack}
          />
          <div
            className={`${styles.envelopMain} ${
              showTooltip ? styles.hoverLetter : ""
            }`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <img
              src={
                showTooltip ? "/img/hoverLetter.png" : "/img/envelopMain.png"
              }
              alt="봉투 메인"
              onClick={handleSendClick}
            />
            {showTooltip && (
              <div className={styles.tooltip}>
                편지를 발송하려면 클릭하세요.
              </div>
            )}
          </div>
        </div>
        <div className={styles.envelope}></div>
      </div>

      {showSentComplete && (
        <SentComplete onClose={handleCloseSentComplete} treeId={treeId} />
      )}
    </>
  );
}

export default WriteLetter;
