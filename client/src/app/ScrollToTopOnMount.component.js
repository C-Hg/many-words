import { useEffect } from "react";

// NB : window.scrollTo sometimes does not work because of the layout, only if app class is deleted

const ScrollToTopOnMount = () => {
  useEffect(() => {
    document.querySelector("#root").scrollTop = 0;
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTopOnMount;
