import React, { useRef, useEffect } from "react";
import "@dotlottie/player-component/dist/dotlottie-player.mjs";

const LottieAnimation = ({
  src,
  width,
  height,
  speed,
  autoplay,
  boxShadow,
}) => {
  const playerRef = useRef(null);

  useEffect(() => {
    const player = playerRef.current;

    if (player) {
      player.speed = speed;
      player.loop = false; // 애니메이션을 한 번만 재생
      player.autoplay = autoplay;
    }
  }, [speed, autoplay]);

  return (
    <dotlottie-player
      ref={playerRef}
      src={src}
      background="transparent"
      style={{
        width,
        height,
        boxShadow,
        borderRadius: "50px",
        background: "#fff",
      }}
      speed={speed}
      loop={false} // 애니메이션을 한 번만 재생
      autoplay={autoplay}
    ></dotlottie-player>
  );
};

export default LottieAnimation;
