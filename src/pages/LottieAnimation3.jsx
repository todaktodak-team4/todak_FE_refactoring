// LottieAnimation3.js
import React, { useRef, useEffect } from "react";

const LottieAnimation3 = ({
  src,
  speed,
  loop,
  autoplay,
  width,
  height,
  zIndex,
}) => {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.src = src;
      lottieRef.current.speed = speed;
      lottieRef.current.loop = loop;
      lottieRef.current.autoplay = autoplay;
    }
  }, [src, speed, loop, autoplay]);

  return (
    <dotlottie-player
      ref={lottieRef}
      background="transparent"
      style={{ width, height, zIndex }}
    />
  );
};

export default LottieAnimation3;
