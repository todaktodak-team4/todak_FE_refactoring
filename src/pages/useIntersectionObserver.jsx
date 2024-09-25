// useIntersectionObserver.js
import { useEffect, useState } from "react";

const useIntersectionObserver = (options) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const { targetSelector, ...observerOptions } = options;
    const element = document.querySelector(targetSelector);

    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [
    options.targetSelector,
    options.root,
    options.rootMargin,
    options.threshold,
  ]);

  return isVisible;
};

export default useIntersectionObserver;
