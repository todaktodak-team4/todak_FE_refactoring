import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/StyledShowAlbum.module.css";

function ShowAlbum({ onClose, treeId }) {
  const [albumData, setAlbumData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(true);
  const [noItemsMessage, setNoItemsMessage] = useState(false);
  const itemsPerPage = 4;
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/rememberTree/${treeId}/photos/`,
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
        console.log("Fetched data:", data);
        setAlbumData(data);
      } else if (response.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        alert(
          "30분 동안 활동이 없어서 자동 로그아웃 되었습니다. 다시 로그인해주세요."
        );
        navigate("/login");
      } else {
        console.error("Failed to fetch images:", response.statusText);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (albumData.length === 0) {
      setNoItemsMessage(true);
      const timer = setTimeout(() => {
        setNoItemsMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [albumData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = albumData.slice(indexOfFirstItem, indexOfLastItem);

  const renderAlbumItem = (item, index) => {
    const imageUrl = item.rememberPhoto
      ? `http://127.0.0.1:8000/${item.rememberPhoto}`
      : "/img/default.png";

    switch (index % 4) {
      case 0:
        return (
          <div key={index} className={styles.img1}>
            <img
              className={styles.imgBg}
              src="/img/imgBg.png"
              alt="album"
              style={{ height: "240px" }}
            />
            <img
              src={imageUrl}
              alt=""
              className={styles.defaultImg}
              style={{ width: "320px", height: "160px" }}
            />
            <div className={styles.rightB}></div>
            <div className={styles.leftB}></div>
            <div className={styles.comWp}>
              <div className={styles.com}>{item.description}</div>
              <div className={styles.date}>{item.rememberDate}</div>
            </div>
          </div>
        );
      case 1:
        return (
          <div key={index} className={styles.img2}>
            <img
              src="/img/polaBg.png"
              alt="폴라로이드 이미지"
              className={styles.imgbg}
              style={{ height: "320px" }}
            />
            <img
              src={imageUrl}
              alt="이미지"
              className={styles.defaultImg}
              style={{ width: "233px", height: "230px" }}
            />
            <div className={styles.sticker}>
              <img src="/img/sticker.png" alt="" />
            </div>
            <div className={styles.comWp}>
              <div className={styles.com}>{item.description}</div>
              <div className={styles.date}>{item.rememberDate}</div>
            </div>
            <div className={styles.mainComWp}>
              <img src="/img/comPaper.png" alt="코멘트 메모지" />
              <div className={styles.mainCom}>{item.comment}</div>
            </div>
          </div>
        );
      case 2:
        return (
          <div key={index} className={styles.img3}>
            <img
              src="/img/imgBg.png"
              alt=""
              className={styles.imgbg}
              style={{ height: "240px" }}
            />
            <img
              src={imageUrl}
              alt=""
              className={styles.defaultImg}
              style={{ width: "320px", height: "160px" }}
            />
            <div className={styles.clip}>
              <img src="/img/clip.png" alt="" />
            </div>
            <div className={styles.comWp}>
              <div className={styles.com}>{item.description}</div>
              <div className={styles.date}>{item.rememberDate}</div>
            </div>
            <div className={styles.mainComWp}>
              <img src="/img/comPaper2.png" alt="" />
              <div className={styles.mainCom2}>{item.comment}</div>
            </div>
          </div>
        );
      case 3:
        return (
          <div key={index} className={styles.img4}>
            <img
              src="/img/imgbg.png"
              alt=""
              className={styles.imgbg}
              style={{ height: "240px" }}
            />
            <img
              src={imageUrl}
              alt=""
              className={styles.defaultImg}
              style={{ width: "320px", height: "160px" }}
            />
            <div className={styles.rightB}></div>
            <div className={styles.leftB}></div>
            <div className={styles.comWp}>
              <div className={styles.com}>{item.description}</div>
              <div className={styles.date}>{item.rememberDate}</div>
            </div>
          </div>
        );
      default:
        return;
    }
  };

  const totalPages = Math.ceil(albumData.length / itemsPerPage);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      alert("이전 페이지가 없습니다.");
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      alert("다음 페이지가 없습니다.");
    }
  };

  if (!showModal) {
    return null;
  }

  return (
    <>
      <div className={`${styles.container} ${styles.fadeIn}`}>
        <div className={styles.albumWp}>
          {showModal && (
            <div
              className={styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              앨범 닫기
            </div>
          )}
          <div className={styles.album}>
            <img
              className={styles.albumImg}
              src="/img/albumBg.png"
              alt="album"
            />
            {currentItems.map((item, index) => renderAlbumItem(item, index))}
          </div>
        </div>
        <div className={styles.pagination}>
          <div
            className={`${styles.paginationButton} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
            onClick={handlePrevClick}
          >
            <img src="/img/albumBack.png" alt="Previous" />
          </div>
          <span className={styles.pageNumber}>
            <span className={styles.cur}>{currentPage} </span>
            <span className={styles.slash}>/</span>
            <span className={styles.tot}>{totalPages}</span>
          </span>
          <div
            className={`${styles.paginationButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
            onClick={handleNextClick}
          >
            <img src="/img/albumFront.png" alt="Next" />
          </div>
        </div>
        {noItemsMessage && (
          <div className={styles.noPagesMessage}>
            <p>앨범에 사진이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ShowAlbum;
