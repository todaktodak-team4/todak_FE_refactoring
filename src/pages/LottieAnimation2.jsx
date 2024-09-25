import React, { forwardRef } from "react";
import styled, { keyframes } from "styled-components";

// Define keyframe animation
const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Create a styled component for the dotlottie-player
const StyledLottiePlayer = styled.div`
  animation: ${slideIn} 2s ease-out;
  width: 120%; /* Adjust to fit the parent */
  height: 110%; /* Adjust to fit the parent */
  position: absolute; /* Position it absolutely within the parent */
  top: 0;
  left: -22.5%;
  z-index: -1; /* Ensure it is behind other content */

  // Style for the inner dotlottie-player component
  dotlottie-player {
    width: 120%;
    height: 110%;
  }
`;

// ForwardRef to use dotlottie-player inside React component
const LottieAnimation2 = forwardRef(
  ({ src, width, height, speed, loop, autoplay }, ref) => {
    return (
      <StyledLottiePlayer width={width} height={height} ref={ref}>
        <dotlottie-player
          src={src}
          background="transparent"
          speed={speed}
          loop={loop}
          autoplay={autoplay}
        ></dotlottie-player>
      </StyledLottiePlayer>
    );
  }
);

export default LottieAnimation2;
