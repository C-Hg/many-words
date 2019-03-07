import React from "react";

// NB : window.scrollTo sometimes does not work because of the layout, only if app class is deleted

class ScrollToTopOnMount extends React.Component {
  componentDidMount() {
    document.querySelector(".main-container").scrollTop = 0;
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

export default ScrollToTopOnMount;
