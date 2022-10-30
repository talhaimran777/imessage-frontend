import { useEffect, useState } from "react";

const useWindowDimensions = () => {
  interface Test {
    width: number;
    height: number;
  }

  const [windowDimensions, setWindowDimensions] = useState<Test>({
    width: 0,
    height: 0,
  });

  function handleResize() {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
