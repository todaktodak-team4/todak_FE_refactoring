// Info.js
import React, { useState } from "react";
import * as I from "../css/StyledInfo";
import LottieAnimation from "./LottieAnimation";
import LottieAnimation2 from "./LottieAnimation2";
import LottieAnimation3 from "./LottieAnimation3";
import useIntersectionObserver from "./useIntersectionObserver";

const Info = () => {
  // 각 섹션을 관찰하기 위한 훅 설정
  const isVisible1 = useIntersectionObserver({
    targetSelector: "#Info1",
    threshold: 1,
  });
  const isVisible2 = useIntersectionObserver({
    targetSelector: "#Info2",
    threshold: 1,
  });
  const isVisible3 = useIntersectionObserver({
    targetSelector: "#Info3",
    threshold: 1,
  });
  const isVisible4 = useIntersectionObserver({
    targetSelector: "#Info4",
    threshold: 1,
  });
  const isVisible5 = useIntersectionObserver({
    targetSelector: "#Info5",
    threshold: 1,
  });
  const isVisible6 = useIntersectionObserver({
    targetSelector: "#Info6",
    threshold: 0.8,
  });
  const isVisible7 = useIntersectionObserver({
    targetSelector: "#Info7",
    threshold: 0.8,
  });
  const isVisible8 = useIntersectionObserver({
    targetSelector: "#Info8",
    threshold: 0.8,
  });
  const isVisible9 = useIntersectionObserver({
    targetSelector: "#Info9",
    threshold: 0.8,
  });
  const isVisible10 = useIntersectionObserver({
    targetSelector: "#Info10",
    threshold: 0.8,
  });
  const isVisible11 = useIntersectionObserver({
    targetSelector: "#Info11",
    threshold: 0.8,
  });

  // 각 섹션의 애니메이션 재생 상태를 관리하는 상태 변수
  const [isPlaying1, setIsPlaying1] = useState(false);
  const [isPlaying2, setIsPlaying2] = useState(false);
  const [isPlaying3, setIsPlaying3] = useState(false);
  const [isPlaying4, setIsPlaying4] = useState(false);
  const [isPlaying5, setIsPlaying5] = useState(false);
  const [isPlaying6, setIsPlaying6] = useState(false);
  const [isPlaying7, setIsPlaying7] = useState(false);
  const [isPlaying8, setIsPlaying8] = useState(false);
  const [isPlaying9, setIsPlaying9] = useState(false);
  const [isPlaying10, setIsPlaying10] = useState(false);
  const [isPlaying11, setIsPlaying11] = useState(false);

  return (
    <I.Info>
      <I.Info1
        id="Info1"
        className={isVisible1 ? "animate" : ""}
        onMouseEnter={() => setIsPlaying1(true)}
        onMouseLeave={() => setIsPlaying1(false)}
      >
        <img
          id="Logo"
          src={`${process.env.PUBLIC_URL}/img/TodakLogo2.svg`}
          alt="Logo"
        />
        <img
          id="LogoMessage"
          src={`${process.env.PUBLIC_URL}/img/LogoMessage.svg`}
          alt="LogoMessage"
        />
        <p id="title">
          <I.BoldText>
            토닥토닥은 재난 경험자와 유족을 위한 공간입니다.
          </I.BoldText>
          <br />
          함께 같은 아픔을 겪고 감내해야 하는 사람들이 고립되지 않고
          <br />
          자조 모임을 이루어 <I.BoldText>유족의 건강한 애도</I.BoldText>를 돕는
          서비스입니다.
        </p>
      </I.Info1>
      <I.Info2
        id="Info2"
        className={isVisible2 ? "animate" : ""}
        onMouseEnter={() => setIsPlaying2(true)}
        onMouseLeave={() => setIsPlaying2(false)}
      >
        <LottieAnimation2
          src="https://lottie.host/2a698210-56a2-4a65-a464-d01a762173a1/xvBlkfKYyz.json"
          speed={2}
          loop={false}
          autoplay={true}
        />
        <img
          id="Info2Img1"
          src={`${process.env.PUBLIC_URL}/img/11left.svg`}
          alt="Info2Img1"
        />
        <img
          id="Info2Img2"
          src={`${process.env.PUBLIC_URL}/img/11left2.svg`}
          alt="Info2Img1"
        />
        <img
          id="Info2Img3"
          src={`${process.env.PUBLIC_URL}/img/112.svg`}
          alt="Info2Img1"
        />
        <img
          id="Info2Img4"
          src={`${process.env.PUBLIC_URL}/img/11.svg`}
          alt="Info2Img1"
        />
        <p id="title"> 재난 참사 유족의 더 나은 삶을 위해</p>
        <p id="content1">
          재난으로 인한 갑작스러운 사별은 유족들에게 극심한 슬픔과 고통을
          야기하고,
          <br />
          <I.BoldText2>심각한 트라우마와 스트레스</I.BoldText2>를 유발할 수 있어{" "}
          <I.BoldText2>각별한 주의와 집중 심리 치료</I.BoldText2>가 필요합니다.
          <br />
        </p>
        <p id="content2">
          그러나 재난 참사 유족들의 상당 수는 주변의 차가운 시선과 편견으로
          장기간 심리 회복 과정에
        </p>
        <p id="content2">
          어려움을 느끼고, 정신건강 치료 과정도 꺼리는 것이 현실입니다.
          <br />
        </p>
        <p id="content3">
          토닥토닥은 재난 참사 유족들이 자신의 슬픔을 표현하고 극복하는 과정을
          돕기 위해 만들어졌습니다.
        </p>
      </I.Info2>
      <I.Info3
        id="Info3"
        className={isVisible3 ? "animate" : ""}
        onMouseEnter={() => setIsPlaying3(true)}
        onMouseLeave={() => setIsPlaying3(false)}
      >
        <img
          id="Info3Left"
          src={`${process.env.PUBLIC_URL}/img/Info3Left.png`}
          alt="Info3Left"
        />
        <img
          id="Info3Right"
          src={`${process.env.PUBLIC_URL}/img/Info3Right.png`}
          alt="Info3Right"
        />
        <p id="title">천천히 내 감정을 이해할 수 있게</p>
        <p id="content1">
          일반적으로 유족들이 겪는 <I.BoldText3>애도의 과정</I.BoldText3>은{" "}
          <I.BoldText3>5단계</I.BoldText3>로 이루어져 있습니다.
        </p>
        <I.Info3Contents>
          <I.Info3Content2Wrapp1>
            <I.Info3Content2>부정</I.Info3Content2>
          </I.Info3Content2Wrapp1>
          <I.Info3Arrow></I.Info3Arrow>
          <I.Info3Content2Wrapp2>
            <I.Info3Content2>분노</I.Info3Content2>
          </I.Info3Content2Wrapp2>
          <I.Info3Arrow></I.Info3Arrow>
          <I.Info3Content2Wrapp3>
            <I.Info3Content2>타협</I.Info3Content2>
          </I.Info3Content2Wrapp3>
          <I.Info3Arrow></I.Info3Arrow>
          <I.Info3Content2Wrapp4>
            <I.Info3Content2>우울</I.Info3Content2>
          </I.Info3Content2Wrapp4>
          <I.Info3Arrow></I.Info3Arrow>
          <I.Info3Content2Wrapp5>
            <I.Info3Content2>수용</I.Info3Content2>
          </I.Info3Content2Wrapp5>
        </I.Info3Contents>
        <p id="content2">
          토닥토닥은 유족이 천천히 상실감을 극복해 건강한 일상생활을 영위할 수
          있도록 돕습니다.
        </p>
      </I.Info3>
      <I.Info4
        id="Info4"
        className={isVisible4 ? "animate" : ""}
        onMouseEnter={() => setIsPlaying4(true)}
        onMouseLeave={() => setIsPlaying4(false)}
      >
        <p id="title">재난 참사 유족을 위한 애도 공간</p>
        <I.Info4Contents>
          <LottieAnimation
            src="https://lottie.host/d1171e83-87af-45ae-b476-c1ceb513f4ac/MAzcJtTi5c.json"
            width="35vw"
            height="60vh"
            speed={1}
            loop={false}
            autoplay={true}
            boxShadow="7px 7px 5px 0px rgba(0, 0, 0, 0.25), 5px 5px 7px 0px rgba(0, 0, 0, 0.25) inset"
          />
          <LottieAnimation
            src="https://lottie.host/3e892260-79dd-4708-abc7-495438641058/iOwTe665WP.json"
            width="35vw"
            height="60vh"
            speed={1}
            loop={false}
            autoplay={true}
            boxShadow="7px 7px 5px 0px rgba(0, 0, 0, 0.25), 5px 5px 7px 0px rgba(0, 0, 0, 0.25) inset"
          />
        </I.Info4Contents>
      </I.Info4>
      <I.Info5
        id="Info5"
        className={isVisible5 ? "animate" : ""}
        onMouseEnter={() => setIsPlaying5(true)}
        onMouseLeave={() => setIsPlaying5(false)}
      >
        <img
          id="Img"
          src={`${process.env.PUBLIC_URL}/img/whiteFlower.png`}
          alt="Img"
        />
        <p id="title">재난 참사 유족을 위한 온라인 헌화장</p>
        <p id="content">
          같은 아픔을 겪은 사람들과 함께 슬픔을 나눠요.
          <br />
          <I.BoldText4>자조 모임을 통한 애도</I.BoldText4> 는 상실의 슬픔을
          견뎌내는 데 큰 도움이 됩니다.
          <br />
          추모 글을 남기고, 헌화로 재난 재발을 막기 위한 관련 단체에 기부를 할
          수 있어요.
        </p>
      </I.Info5>
      <I.InfoAdd
        id="InfoAdd"
        className={isVisible6 ? "animate" : ""}
        onMouseEnter={() => setIsPlaying6(true)}
        onMouseLeave={() => setIsPlaying6(false)}
      >
        <p id="title">헌화금으로 지원 센터에 기부를</p>
        <p id="content">
          온라인 헌화 시 최소 1,000원 부터 헌화금을 결제해 기부를 진행할 수
          있습니다.
          <br />
          추모관에 모인 헌화금은 같은 아픔이 반복되지 않도록 사건 관련 단체에
          기부됩니다.
          <br />
          결제 이후 뜨는 기부 증서를 공유해 따뜻함을 나눠 보세요.
        </p>
      </I.InfoAdd>
      <I.Info6
        id="Info6"
        className={isVisible7 ? "animate" : ""}
        onMouseEnter={() => setIsPlaying7(true)}
        onMouseLeave={() => setIsPlaying7(false)}
      >
        <I.Info6Content>
          <img
            id="Info61"
            src={`${process.env.PUBLIC_URL}/img/overcome.png`}
            alt="Info61"
          />
          <img
            id="Info62"
            src={`${process.env.PUBLIC_URL}/img/space.png`}
            alt="Info62"
          />
          <img
            id="Info61"
            src={`${process.env.PUBLIC_URL}/img/memorytogether.png`}
            alt="Info61"
          />
        </I.Info6Content>
        <I.Info6Information>
          <p id="title">희망 헌화 공간 신청</p>
          <p id="content">
            주변의 사람들과 함께 추모하고 싶은 대상이 있다면
            <br /> 개인 희망 헌화 공간을 신청해 보세요.
          </p>
        </I.Info6Information>
      </I.Info6>
      <I.Info7
        id="Info7"
        className={isVisible8 ? "animate" : ""}
        onMouseEnter={() => setIsPlaying8(true)}
        onMouseLeave={() => setIsPlaying8(false)}
      >
        <I.Info7Content>
          <p id="title">사랑하는 이를 기억하는 나무</p>
          <p id="content">
            오래도록 깊이 기억하고 싶은 특정한 대상이 있다면, <br /> 기억나무의
            질문에 답하며 상실의 아픔을 치유해 주세요.
            <br />
            나무와 함께 천천히 성장하며 그리운 기억을 추억할 수 있을거예요.
          </p>
        </I.Info7Content>
        <I.Info7Img>
          <div id="imgdiv">
            <img
              id="Img"
              src={`${process.env.PUBLIC_URL}/img/Info7tree.png`}
              alt="Img"
            />
            <img
              id="Heart1"
              src={`${process.env.PUBLIC_URL}/img/Info7heart.svg`}
              alt="Heart"
            />
            <img
              id="Heart2"
              src={`${process.env.PUBLIC_URL}/img/Info7heart.svg`}
              alt="Heart"
            />
            <img
              id="Heart3"
              src={`${process.env.PUBLIC_URL}/img/Info7heart.svg`}
              alt="Heart"
            />
            <div id="q1">
              <p>오늘 기분은 어때요?</p>
            </div>
            <div id="q2">
              <p>오늘 기억에 남는 일이 있나요?</p>
            </div>
            <div id="q3">
              <p>그분과의 좋은 추억을 공유해 주세요.</p>
            </div>
          </div>
        </I.Info7Img>
      </I.Info7>
      <I.Info8
        id="Info8"
        className={isVisible9 ? "animate" : ""}
        onMouseEnter={() => setIsPlaying9(true)}
        onMouseLeave={() => setIsPlaying9(false)}
      >
        <p id="title">나를 치유하며 성장해요</p>
        <p id="content">
          나무는 기본적으로 심리적 고통과 변화가 많이 일어나는
          <I.BoldText5>3개월 동안 3단계</I.BoldText5>를 거쳐 성장해요.
          <br />
          나무가 다 자라나면 원하는 꽃을 피울 수도 있어요.
        </p>
        <div className="animation-background">
          <LottieAnimation3
            src="https://lottie.host/ca1b2b0f-39ab-424b-95b3-c1d3350ada94/qSQ7FizQGj.json"
            speed={1}
            loop={true}
            autoplay={true}
            width="100%"
            height="100%"
            zIndex="0" // z-index 설정 (배경으로 설정)
            isPlaying={isPlaying9} // 애니메이션 재생 상태 전달
          />
        </div>
        <I.Info8Container>
          <img
            id="Info8Img1"
            src={`${process.env.PUBLIC_URL}/img/Info8Img1.png`}
            alt="Info8Img1"
          />
          <I.Info8Arrow></I.Info8Arrow>
          <img
            id="Info8Img2"
            src={`${process.env.PUBLIC_URL}/img/Info8Img2.png`}
            alt="Info8Img2"
          />
          <I.Info8Arrow></I.Info8Arrow>
          <img
            id="Info8Img3"
            src={`${process.env.PUBLIC_URL}/img/Info7tree.png`}
            alt="Info8Img3"
          />
        </I.Info8Container>
      </I.Info8>
      <I.Info9
        id="Info9"
        className={isVisible10 ? "animate" : ""}
        onMouseEnter={() => setIsPlaying10(true)}
        onMouseLeave={() => setIsPlaying10(false)}
      >
        <img
          id="Img"
          src={`${process.env.PUBLIC_URL}/img/treeIconInfo9.png`}
          alt="Img"
        />
        <p id="title">언제나 내 곁에서 머무는 나무</p>
        <I.Info923>
          {" "}
          <I.Info92></I.Info92>
          <I.Info93>
            <I.NavBtnWrapper1>
              <I.NavBtnWrapper2>
                <p>
                  배송 유무
                  <br /> 선택
                </p>
              </I.NavBtnWrapper2>
            </I.NavBtnWrapper1>
            <I.NavBtnWrapper1>
              <I.NavBtnWrapper2>
                <p>
                  배송 옵션 <br />
                  선택
                </p>
              </I.NavBtnWrapper2>
            </I.NavBtnWrapper1>
            <I.NavBtnWrapper1>
              <I.NavBtnWrapper2>
                <p>
                  배송 정보 <br />
                  입력
                </p>
              </I.NavBtnWrapper2>
            </I.NavBtnWrapper1>
            <I.NavBtnWrapper1>
              <I.NavBtnWrapper2>
                <p>배송 시작</p>
              </I.NavBtnWrapper2>
            </I.NavBtnWrapper1>
          </I.Info93>
        </I.Info923>
        <p id="content">
          완전한 치유가 끝나면{" "}
          <I.BoldText9>기억 나무를 자택으로 직접 배송</I.BoldText9>받을 수
          있어요.
          <br />
          추억 사진, 나무 옵션 등 배송 키트를 선택해 추억할 수 있어요.
          <br />
          오랫동안 기억하고 싶은 사람처럼, 기억 나무는 곁에서 늘 항상 당신의
          행복을 바라며 지켜볼 거예요.
        </p>
      </I.Info9>
      <I.Info10
        id="Info10"
        className={isVisible11 ? "animate" : ""}
        onMouseEnter={() => setIsPlaying11(true)}
        onMouseLeave={() => setIsPlaying11(false)}
      >
        <I.Info10Line1></I.Info10Line1>
        <I.Info10Content>
          <img
            id="TodakLogo3"
            src={`${process.env.PUBLIC_URL}/img/TodakLogo3.svg`}
            alt="TodakLogo3"
          />
          <p id="title">나와 너, 서로를 토닥이며</p>
          <p id="content">상실의 슬픔, 이제 혼자 견뎌내지 마세요.</p>
        </I.Info10Content>
        <I.Info10Line2></I.Info10Line2>
      </I.Info10>
    </I.Info>
  );
};

export default Info;
