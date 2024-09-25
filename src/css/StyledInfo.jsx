import styled, { keyframes } from "styled-components";

export const Info = styled.div``;

// Keyframe animations
const fadeInX = keyframes`
  0% {
    opacity: 0;
    
  }
  100% {
    opacity: 1;
  }
`;

const fadeInY = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const fadeInFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20%); /* 위쪽에서 시작 */
  }
  100% {
    opacity: 1;
    transform: translateY(0); /* 최종 위치 */
  }
`;
const fadeInFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-20%); /* 왼쪽에서 시작 */
  }
  100% {
    opacity: 1;
    transform: translateX(0); /* 최종 위치 */
  }
`;
const fadeInFromRight = keyframes`
  0% {
    opacity: 0;
    transform: translateX(20%); /* 오른쪽에서 시작 */
  }
  100% {
    opacity: 1;
    transform: translateX(0); /* 최종 위치 */
  }
`;

const drawFromLeft = keyframes`
  0% {
    clip-path: inset(0 100% 0 0); /* 처음에는 오른쪽이 보이지 않음 */
    opacity: 0;
  }
  100% {
    clip-path: inset(0 0 0 0); /* 전체 이미지가 보이도록 */
    opacity: 1;
  }
`;
const drawFromRight = keyframes`
  0% {
    clip-path: inset(0 0 0 100%); /* 처음에는 오른쪽이 보이지 않음 */
    opacity: 0;
  }
  100% {
    clip-path: inset(0 0 0 0); /* 전체 이미지가 보이도록 */
    opacity: 1;
  }
`;
const drawFromTop = keyframes`
  0% {
    clip-path: inset(100% 0 0 0); /* 처음에는 위쪽이 보이지 않음 */
    opacity: 0;
  }
  100% {
    clip-path: inset(0 0 0 0); /* 전체 이미지가 보이도록 */
    opacity: 1;
  }
`;

export const Info1 = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 35rem;
  background: linear-gradient(
      180deg,
      rgba(153, 153, 153, 1) 0%,
      rgba(153, 153, 153, 0) 30%
    ),
    url(${process.env.PUBLIC_URL}/img/Info1.png);
  background-size: cover;
  background-repeat: no-repeat;
  > * {
    animation: ${fadeInY} 3s ease-out;
    animation-delay: 1.25s;
  }
  img {
    width: 146px;
    height: 89px;
    flex-shrink: 0;
  }
  #title {
    color: #fff;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.5rem;
  }
`;
export const BoldText = styled.p`
  display: inline-block;
  color: #fff;
  font-family: "Pretendard Variable";
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
`;
export const Info2 = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 35rem;
  background: url(${process.env.PUBLIC_URL}/img/Background2.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center bottom;
  position: relative; /* Ensure the position is relative for absolute positioning of children */
  z-index: 0; /* Set z-index to 0 */
  img {
    z-index: 3;
  }
  #Info2Img1 {
    position: absolute;
    left: 0;
    top: 0;
  }
  #Info2Img2 {
    position: absolute;
    left: 7rem;
    top: 0;
    width: 10rem;
    height: 10rem;
  }
  #Info2Img3 {
    position: absolute;
    right: 7rem;
    top: 0;
  }
  #Info2Img4 {
    position: absolute;
    right: 0;
    top: 0;
  }
  #title {
    color: #323232;
    font-family: "Pretendard Variable";
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    animation: ${fadeInX} 2s ease-out forwards;
  }
  #content1 {
    color: #323232;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.5rem;
    margin: 5px;
    margin-bottom: 30px;
    margin-top: 15px;
    animation: ${fadeInX} 2s ease-out forwards;
  }
  #content2 {
    color: #323232;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.5rem;
    margin: 0;
  }
  #content3 {
    color: #323232;
    font-family: "Pretendard Variable";
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    background: #ffda57;
  }
`;
export const BoldText2 = styled.p`
  display: inline-block;
  color: #323232;
  font-family: "Pretendard Variable";
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0;
`;
export const Info3 = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 30rem;
  color: #323232;
  background: linear-gradient(270deg, #fff 0%, #ffda57 65%);

  #Info3Left {
    position: absolute;
    left: 0;
    height: 100%;
  }
  #Info3Right {
    position: absolute;
    right: 0;
    height: 100%;
  }
  #title {
    color: #323232;
    font-family: "Pretendard Variable";
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;

    animation: ${fadeInY} 2s ease-out;
  }
  #content1 {
    color: #323232;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;

    animation: ${fadeInY} 2s ease-out;
  }
  #content2 {
    color: #323232;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    opacity: 0; /* 애니메이션 시작 전 투명도 0 */
    animation: ${fadeInY} 2s ease-out;
    animation-delay: 2s;
    animation-fill-mode: forwards;
  }
`;
export const BoldText3 = styled.p`
  display: inline-block;
  color: #323232;
  font-family: "Pretendard Variable";
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const Info3Contents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* Apply animation with different delays for each child */
  > * {
    animation: ${fadeInX} 2s ease-out forwards;
    opacity: 0;
  }

  > *:nth-child(1) {
    animation-delay: 0s;
  }
  > *:nth-child(2) {
    animation-delay: 0.25s;
  }
  > *:nth-child(3) {
    animation-delay: 0.5s;
  }
  > *:nth-child(4) {
    animation-delay: 0.75s;
  }
  > *:nth-child(5) {
    animation-delay: 1s;
  }
  > *:nth-child(6) {
    animation-delay: 1.25s;
  }
  > *:nth-child(7) {
    animation-delay: 1.5s;
  }
  > *:nth-child(8) {
    animation-delay: 1.75s;
  }
  > *:nth-child(9) {
    animation-delay: 2s;
  }
`;
export const Info3Content2Wrapp1 = styled.div`
  width: 152px;
  height: 152px;
  flex-shrink: 0;
  fill: rgba(50, 46, 47, 0.35);
  background: url(${process.env.PUBLIC_URL}/img/Ellipse17.svg);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Info3Content2Wrapp2 = styled.div`
  width: 152px;
  height: 152px;
  flex-shrink: 0;
  fill: rgba(50, 46, 47, 0.25);
  background: url(${process.env.PUBLIC_URL}/img/Ellipse18.svg);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Info3Content2Wrapp3 = styled.div`
  width: 152px;
  height: 152px;
  flex-shrink: 0;
  fill: rgba(50, 46, 47, 0.2);
  background: url(${process.env.PUBLIC_URL}/img/Ellipse19.svg);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Info3Content2Wrapp4 = styled.div`
  width: 152px;
  height: 152px;
  flex-shrink: 0;
  fill: rgba(50, 46, 47, 0.15);
  background: url(${process.env.PUBLIC_URL}/img/Ellipse20.svg);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Info3Content2Wrapp5 = styled.div`
  width: 152px;
  height: 152px;
  flex-shrink: 0;
  fill: rgba(50, 46, 47, 0.1);
  background: url(${process.env.PUBLIC_URL}/img/Ellipse21.svg);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Info3Arrow = styled.div`
  background: url(${process.env.PUBLIC_URL}/img/Arrow.svg);
  width: 40px;
  height: 30px;
  flex-shrink: 0;
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 20px;
`;
export const Info3Content2 = styled.div`
  color: #323232;
  font-family: "Pretendard Variable";
  font-size: 2rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

export const Info4 = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 40rem;
  background: url(${process.env.PUBLIC_URL}/img/Info4Background.png);
  background-size: cover;
  background-repeat: no-repeat;
  #title {
    color: var(--ff, #fff);
    font-family: "Pretendard Variable";
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
`;
export const Info4Contents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 5vw;
`;
export const Info4Content = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 35vw;
  height: 60vh;
  flex-shrink: 0;
  border-radius: 50px;
  background: var(--ff, #fff);
  box-shadow: 7px 7px 5px 0px rgba(0, 0, 0, 0.25),
    5px 5px 7px 0px rgba(0, 0, 0, 0.25) inset;
  img {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
  }
  #contentTitle {
    color: var(--, #2b2b2b);
    font-family: "Pretendard Variable";
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  #content {
    color: var(--, #2b2b2b);
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 10px;
  }
  #boldContent {
    color: var(--, #2b2b2b);
    font-family: "Pretendard Variable";
    font-size: 26px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0;
  }
`;
export const Info5 = styled.div`
  text-align: left;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: left;
  padding-left: 10vw;
  flex-direction: column;
  width: 100vw;
  height: 30rem;
  background: #000;

  img {
    position: absolute;
    right: 10vw;
    height: 30rem;
    filter: brightness(70%);
  }
  #title {
    z-index: 2;
    color: var(--ff, #fff);
    font-family: "Pretendard Variable";
    font-size: 40px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    animation: ${fadeInFromTop} 2s ease-out forwards;
  }
  #content {
    z-index: 2;
    color: var(--ff, #fff);
    font-family: "Pretendard Variable";
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    animation: ${fadeInFromTop} 2s ease-out forwards;
  }
`;
export const BoldText4 = styled.p`
  display: inline-block;
  color: var(--ff, #fff);
  font-family: "Pretendard Variable";
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const InfoAdd = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 30rem;
  background: url(${process.env.PUBLIC_URL}/img/InfoAdd.png);
  background-size: 140%;
  background-repeat: no-repeat;
  background-position: center; /* Centers the image in the container */
  > * {
    animation: ${fadeInFromTop} 2s ease-out forwards;
  }
  #title {
    color: var(--ff, #fff);
    font-family: "Pretendard Variable";
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
  #content {
    color: var(--ff, #fff);
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.5rem;
  }
`;
export const Info6 = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 10vw;
  width: 100vw;
  height: 30rem;
  background: url(${process.env.PUBLIC_URL}/img/Info6Img.png);
  background-size: cover;
  background-repeat: no-repeat;
`;
export const Info6Content = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  #Info61 {
    animation: ${fadeInFromLeft} 2.5s ease-out;
    margin: 0;
  }
  #Info62 {
    margin-left: 10rem;
    animation: ${fadeInFromRight} 2.5s ease-out;
  }
  p {
    color: #6f6f6f;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0.9rem;
  }
`;
export const Info6Information = styled.div`
  margin-right: 5vw;
  #title {
    color: var(--ff, #fff);
    font-family: "Pretendard Variable";
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }
  #content {
    color: var(--ff, #fff);
    text-align: left;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.5rem;
  }
`;
export const Info7 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100vw;
  height: 25rem;
  background: url(${process.env.PUBLIC_URL}/img/plantTree-bg.png);
  background-size: cover;
  background-repeat: no-repeat;
  padding-left: 10vw;
  gap: 10vw;
`;
export const Info7Content = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;

  #title {
    color: #3d4c00;
    font-family: "Pretendard Variable";
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: nomal;
    margin: 0;
  }
  #content {
    color: #3d4c00;
    text-align: left;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.5rem;
  }
`;
export const Info7Img = styled.div`
  animation: ${drawFromTop} 2s ease-out;
  animation-fill-mode: forwards;
  clip-path: inset(100% 0 0 0);
  margin-right: 15vw;
  #imgdiv {
    position: relative;
    flex-shrink: 0;
    width: 482px;
    height: 431px;
  }
  #Img {
    width: 482px;
    height: 431px;
  }
  #Heart1 {
    position: absolute;
    z-index: 2;
    right: 8vh;
    bottom: 250px;
    width: 50px;
    height: 50px;
  }
  #Heart2 {
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 300px;
    width: 50px;
    height: 50px;
  }
  #Heart3 {
    position: absolute;
    z-index: 2;
    left: 100px;
    bottom: 200px;
    width: 50px;
    height: 50px;
  }

  #q1 {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1;
    left: 30px;
    bottom: 290px;
    width: 160px;
    height: 35px;
    border-radius: 35px;
    background: linear-gradient(0deg, #ebebeb 0%, #fff 48%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }

  #q2 {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 2;
    right: 0;
    top: 30px;
    width: 220px;
    height: 35px;
    border-radius: 35px;
    background: linear-gradient(0deg, #ebebeb 0%, #fff 48%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  #q3 {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 2;
    right: 0;
    bottom: 200px;
    width: 260px;
    height: 35px;
    border-radius: 35px;
    background: linear-gradient(0deg, #ebebeb 0%, #fff 48%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
  p {
    color: #6f6f6f;
    font-family: "Pretendard Variable";
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
export const Info8 = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 40rem;
  background: linear-gradient(180deg, #c3e985 0%, #e7e985 100%);
  overflow: hidden; /* Ensure animation does not overflow */

  #title {
    color: #3d4c00;
    font-family: "Pretendard Variable";
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin: 0;
    position: relative;
    z-index: 1;
  }

  #content {
    color: #3d4c00;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position: relative;
    z-index: 1;
  }

  .animation-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: 0;
    pointer-events: none; /* Ensure animation does not capture mouse events */
  }
`;
export const BoldText5 = styled.p`
  display: inline-block;
  color: #3d4c00;
  font-family: "Pretendard Variable";
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 10px;
`;
export const Info8Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  #Info8Img3 {
    width: 382px;
    height: 331px;
    flex-shrink: 0;
  }
`;

export const Info8Arrow = styled.div`
  background: url(${process.env.PUBLIC_URL}/img/Arrow.svg);
  width: 67px;
  height: 42px;
  flex-shrink: 0;
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 20px;
  margin-bottom: 10%;
`;
export const Info9 = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 40rem;
  background: url(${process.env.PUBLIC_URL}/img/Info9Img.png);
  background-size: cover;
  background-repeat: no-repeat;
  img {
    width: 5rem;
    height: 6rem;
  }
  #title {
    color: #3d4c00;
    font-family: "Pretendard Variable";
    font-size: 2.5rem;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    margin: 0;
  }
  #content {
    color: #3d4c00;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.5rem;
    animation: ${fadeInX} 1s ease-out forwards;
    animation-delay: 1s;
    opacity: 0;
  }
`;
export const Info923 = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  height: 15rem;
  width: 60rem;
`;
export const Info92 = styled.div`
  animation: ${drawFromLeft} 1s ease-out;
  animation-fill-mode: forwards;
  position: absolute;
  top: 6rem;
  width: 46.9375rem;
  height: 3.125rem;
  flex-shrink: 0;
  background: linear-gradient(90deg, #ffda57 0%, #b59a3d 100%);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: block; /* 블록 요소로 설정 */
  clip-path: inset(0 100% 0 0); /* 처음에는 오른쪽이 보이지 않도록 설정 */
`;
export const Info93 = styled.div`
  z-index: 3;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 5rem;
`;
export const NavBtnWrapper1 = styled.div`
  display: flex;
  width: 11.25rem;
  height: 11.25rem;
  border-radius: 50%;
  background: rgba(255, 218, 87, 0.45);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;
//3-2 버튼 wrapping 안쪽
export const NavBtnWrapper2 = styled.div`
  display: flex;
  width: 8.6875rem;
  height: 8.75rem;
  flex-shrink: 0;
  border-radius: 50%;
  background: #ffda57;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  justify-content: center;
  align-items: center;
  p {
    color: #3d4c00;
    text-align: center;
    font-family: "Pretendard Variable";
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
export const BoldText9 = styled.p`
  display: inline-block;
  color: #3d4c00;
  font-family: "Pretendard Variable";
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0;
`;
export const Info10 = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100vw;
  height: 25rem;
  background: url(${process.env.PUBLIC_URL}/img/Info10Img.png);
  background-size: cover;
  background-repeat: no-repeat;
  gap: 5vw;
`;
export const Info10Line1 = styled.div`
  width: 390px;
  height: 2px;
  background: #655004;
  animation: ${drawFromRight} 2s ease-out;
  animation-fill-mode: forwards;
  display: block; /* 블록 요소로 설정 */
  clip-path: inset(0 0 0 100%); /* 처음에는 오른쪽이 보이지 않도록 설정 */
`;
export const Info10Line2 = styled.div`
  width: 390px;
  height: 2px;
  background: #655004;
  animation: ${drawFromLeft} 2s ease-out;
  animation-fill-mode: forwards;
  display: block; /* 블록 요소로 설정 */
  clip-path: inset(0 100% 0 0); /* 처음에는 오른쪽이 보이지 않도록 설정 */
`;
export const Info10Content = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 60.001px;
    height: 37.012px;
    flex-shrink: 0;
  }
  #title {
    color: #2b2b2b;
    text-align: center;
    font-family: GyeonggiBatang;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;
    margin-top: 30px;
  }
  #content {
    color: #2b2b2b;
    font-family: "Pretendard Variable";
    font-size: 25px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
