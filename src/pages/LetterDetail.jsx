import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../css/StyledLetterDetail.module.css";

function LetterDetail({ treeId, letterId, onClose }) {
  const [letterContent, setLetterContent] = useState("");
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLetterContent = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/rememberTree/${treeId}/letters/${letterId}/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setLetterContent(data.content);
        } else if (response.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          alert(
            "30분동안 활동이 없어서 자동 로그아웃 되었습니다. 다시 로그인해주세요."
          );
          navigate("/login");
        } else {
          console.error("Failed to fetch letter content");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching the letter content",
          error
        );
      }
    };

    fetchLetterContent();
  }, [treeId, letterId, token]);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <div className={styles.letterWp}>
          <div className={styles.letter}>
            <div className={styles.closeBtn} onClick={onClose}>
              <img src="/img/closeBtn2.png" alt="닫기 버튼" />
            </div>

            <div className={styles.content}>
              <img
                src="/img/letterPaper.png"
                alt="편지지"
                className={styles.contentImage}
              />
              <div className={styles.letterText}>{letterContent}</div>
            </div>
          </div>
          <div className={styles.letterTop}>
            <img src="/img/letterTop.png" alt="봉투 뚜껑" />
          </div>
          <img
            src="/img/letterBack.png"
            alt="뒷 배경"
            className={styles.letterBack}
          />
          <div className={styles.envelopMain}>
            <img src="/img/envelopMain.png" alt="봉투 메인" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterDetail;
