import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../css/StyledRememberTree.module.css";
import HelpModal from "../pages/HelpModal";
import TalkModal from "../pages/TalkModal";
import UploadImg from "../pages/UploadImg";
import ShowAlbum from "../pages/ShowAlbum";
import WriteLetter from "../pages/WriteLetter";
import ShowLetter from "../pages/ShowLetter";

function RememberTree() {
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [isPostBoxHovered, setIsPostBoxHovered] = useState(false);
  const [isAlbumHovered, setIsAlbumHovered] = useState(false);
  const [isPostBoxClicked, setIsPostBoxClicked] = useState(false);
  const [isAlbumClicked, setIsAlbumClicked] = useState(false);
  const [isUploadImgOpen, setIsUploadImgOpen] = useState(false);
  const [isShowAlbumOpen, setIsShowAlbumOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isWriteLetterOpen, setIsWriteLetterOpen] = useState(false);
  const [isShowLetterOpen, setIsShowLetterOpen] = useState(false);
  const [treeName, setTreeName] = useState("");
  const [treeId, setTreeId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [flowerType, setFlowerType] = useState(null);
  const [username, setUserName] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refresh_token")
  );
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const refreshAccessToken = async () => {
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
        setAccessToken(data.access);
        localStorage.setItem("access_token", data.access);
        return data.access;
      } else {
        console.error("Failed to refresh token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  useEffect(() => {
    const visitCount = sessionStorage.getItem("visitCount") || 0;
    if (visitCount === 0) {
      setIsModalOpen(true);
      sessionStorage.setItem("visitCount", 1);
    } else {
      sessionStorage.setItem("visitCount", parseInt(visitCount) + 1);
    }

    const lastSubmissionDate = sessionStorage.getItem("lastSubmissionDate");
    const today = new Date().toISOString().split("T")[0];
    if (lastSubmissionDate === today) {
      setHasSubmitted(true);
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/rememberTree/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            const retryResponse = await fetch(
              "http://127.0.0.1:8000/rememberTree/",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );
            if (retryResponse.ok) {
              const data = await retryResponse.json();
              setTreeName(data[0].treeName);
              setTreeId(data[0].id);
              setUserName(data[0].myName);
              setFlowerType(data[0].flowerType);
            } else {
              console.error("Failed to fetch data after refreshing token");
            }
          }
        } else if (response.ok) {
          const data = await response.json();
          setTreeName(data[0].treeName);
          setTreeId(data[0].id);
          setUserName(data[0].myName);
          setFlowerType(data[0].flowerType);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    };

    const fetchUserId = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/accounts/api/get-user-id-from-token/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            const retryResponse = await fetch(
              "http://127.0.0.1:8000/accounts/api/get-user-id-from-token/",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${newAccessToken}`,
                },
              }
            );
            if (retryResponse.ok) {
              const data = await retryResponse.json();
              setUserId(data.userId);
            } else {
              console.error("Failed to fetch user ID after refreshing token");
            }
          }
        } else if (response.ok) {
          const data = await response.json();
          setUserId(data.userId);
        } else {
          console.error("Failed to fetch user ID");
        }
      } catch (error) {
        console.error("An error occurred", error);
      }
    };

    fetchData();
    fetchUserId();
  }, [accessToken, refreshToken, navigate]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const toggleTalkModal = () => {
    setIsTalkModalOpen((prev) => !prev);
  };

  const handleAlbumClick = () => {
    setIsAlbumClicked((prev) => !prev);
    if (!isAlbumClicked) {
      setIsPostBoxClicked(false);
    }
  };

  const handlePostBoxClick = () => {
    setIsPostBoxClicked((prev) => !prev);
    if (!isPostBoxClicked) {
      setIsAlbumClicked(false);
    }
  };

  const toggleUploadImgModal = () => {
    setIsUploadImgOpen((prev) => !prev);
  };

  const toggleShowAlbumModal = () => {
    setIsShowAlbumOpen((prev) => !prev);
  };

  const toggleWriteLetterModal = () => {
    setIsWriteLetterOpen((prev) => !prev);
  };

  const toggleShowLetterModal = () => {
    console.log("Toggling ShowLetter Modal");
    setIsShowLetterOpen((prev) => !prev);
  };

  const handleShowAlbum = () => {
    setIsUploadImgOpen(false);
    setIsShowAlbumOpen(true);
  };

  const FlowerImages = ({ flowerType, style }) => {
    const getFlowerImage = (type) => {
      switch (type) {
        case "zinnia":
          return "/img/treeZinnia.png";
        case "hydrangea":
          return "/img/treeHydrangea.png";
        case "lily":
          return "/img/treeLily.png";
        default:
          return "/img/treeLily.png"; // 기본 이미지 경로 설정
      }
    };
  };
  return (
    <>
      <div
        className={`${styles.container} ${styles.fadeIn}`}
        style={{ maxHeight: "1000px" }}
      >
        <img
          src="/img/plantTree-bg.png"
          alt="bgimg"
          style={{ width: "100%", minHeight: "1000px", objectFit: "cover" }}
          className="container-bg"
        />
        <div
          style={{ position: "absolute", width: "100%", marginTop: "100px" }}
        >
          <div className={styles.rememberTreeBox}>
            <div className={styles.treeName}>{treeName}</div>
            <img
              src="/img/help.png"
              alt="도움말 버튼"
              className={styles.helpBtn}
              style={{ width: "44px", height: "44px" }}
              onClick={toggleModal}
            />
            <div className={styles.rememberTreeInner}>
              <div className={styles.album}>
                {isAlbumClicked && (
                  <div className={styles.albumButtons}>
                    <div
                      className={styles.pbtns}
                      onClick={toggleUploadImgModal}
                    >
                      사진 업로드
                    </div>
                    <div
                      className={styles.abtns}
                      onClick={toggleShowAlbumModal}
                    >
                      앨범 보기
                    </div>
                  </div>
                )}
                <img
                  src={
                    isAlbumHovered ? "/img/hoverAlbum.png" : "/img/album.png"
                  }
                  onMouseEnter={() => setIsAlbumHovered(true)}
                  onMouseLeave={() => setIsAlbumHovered(false)}
                  onClick={handleAlbumClick}
                />
              </div>
              <img src="/img/rememberTree.png" />
              <div className={styles.postBox}>
                {isPostBoxClicked && (
                  <div className={styles.postBoxButtons}>
                    <div
                      className={styles.btns}
                      onClick={toggleWriteLetterModal}
                    >
                      편지 쓰기
                    </div>
                    <div
                      className={styles.btns}
                      onClick={toggleShowLetterModal}
                    >
                      편지 목록
                    </div>
                  </div>
                )}
                <img
                  src={
                    isPostBoxHovered
                      ? "/img/hoverPostBox.png"
                      : "/img/postBox.png"
                  }
                  onMouseEnter={() => setIsPostBoxHovered(true)}
                  onMouseLeave={() => setIsPostBoxHovered(false)}
                  onClick={handlePostBoxClick}
                />
              </div>
            </div>
            <div className={styles.talkBtn} onClick={toggleTalkModal}>
              나무와 대화하기
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <HelpModal onClose={toggleModal} />}
      {isTalkModalOpen && (
        <TalkModal
          onClose={toggleTalkModal}
          myname={username}
          messages={messages}
          setMessages={setMessages}
        />
      )}
      {isUploadImgOpen && (
        <UploadImg
          onClose={toggleUploadImgModal}
          treeId={treeId}
          onShowAlbum={handleShowAlbum}
        />
      )}
      {isShowAlbumOpen && (
        <ShowAlbum onClose={toggleShowAlbumModal} treeId={treeId} />
      )}
      {isWriteLetterOpen && (
        <WriteLetter
          onClose={toggleWriteLetterModal}
          treeId={treeId}
          userId={userId}
        />
      )}
      {isShowLetterOpen && (
        <ShowLetter
          onClose={toggleShowLetterModal}
          treeId={treeId}
          userId={userId}
        />
      )}
    </>
  );
}

export default RememberTree;
