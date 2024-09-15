import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/StyledUploadImg.module.css";

function UploadImg({ onClose, treeId, onShowAlbum }) {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [com1, setCom1] = useState("");
  const [com, setCom] = useState("");
  const [date, setDate] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [transitionClass, setTransitionClass] = useState("");
  const token = localStorage.getItem("access_token");
  console.log("treeId", treeId);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!isSaved) {
      const formData = new FormData();
      formData.append("rememberPhoto", image);
      formData.append("description", com1);
      formData.append("rememberDate", date);
      formData.append("comment", com);
      formData.append("remember_tree", treeId);

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/rememberTree/${treeId}/photos/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (response.ok) {
          setIsSaved(true);
          setShowSuccessMessage(true);
          setTransitionClass(styles.transitioning);
          setTimeout(() => setShowSuccessMessage(false), 3000);
        } else if (response.status === 401) {
          // 토큰 만료 처리
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          alert(
            "30분 동안 활동이 없어서 자동 로그아웃 되었습니다. 다시 로그인해주세요."
          );
          navigate("/login");
        } else {
          console.error("Failed to save the image and comments");
          alert("저장에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("An error occurred", error);
        alert("네트워크 오류가 발생했습니다.");
      }
    } else {
      onShowAlbum();
    }
  };

  return (
    <div className={`${styles.container} ${styles.fadeIn}`}>
      <input
        type="file"
        id="upload"
        className={styles.fileBtn}
        style={{
          position: "absolute",
          top: "8%",
          zIndex: "1000",
          display: "none",
        }}
        onChange={handleImageUpload}
        accept="image/*"
      />
      <div
        className={styles.uploadBtn}
        onClick={() => document.getElementById("upload").click()}
      >
        사진 업로드
      </div>
      <img
        className={styles.closeBtn}
        onClick={onClose}
        src="/img/closeBtn.png"
        alt="닫기버튼"
      />
      <div className={styles.imgWp}>
        <div className={styles.bg}>
          <img
            src="/img/uploadImgBg.png"
            alt="이미지 배경"
            className={styles.bgImg}
          />
        </div>
        <div className={styles.img}>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="main"
              className={styles.mainImg}
              style={{ width: "422px", height: "244px" }}
            />
          ) : (
            <img
              src="/img/defaultImg.png"
              alt="main"
              className={styles.mainImg}
            />
          )}
        </div>
        <div className={styles.comment}>
          <input
            type="text"
            className={styles.com}
            placeholder="코멘트를 입력해주세요."
            value={com}
            onChange={(e) => setCom(e.target.value)}
          />
          <input
            type="date"
            className={styles.date}
            placeholder="YYYY-MM-DD"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.commentWp}>
        <input
          type="text"
          className={styles.com1}
          placeholder="언제 찍었던 사진인가요?"
          value={com1}
          onChange={(e) => setCom1(e.target.value)}
        />
      </div>
      <div
        className={`${styles.saveBtn} ${transitionClass}`}
        onClick={handleSave}
      >
        {isSaved ? "앨범 보러가기" : "앨범에 저장"}
      </div>
      {showSuccessMessage && (
        <div className={styles.successMessage}>앨범에 저장되었습니다.</div>
      )}
    </div>
  );
}

export default UploadImg;
