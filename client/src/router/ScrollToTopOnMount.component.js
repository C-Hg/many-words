import React from "react";

// NB : window.scrollTo does not work because of the layout

class ScrollToTopOnMount extends React.Component {
  componentDidMount() {
    document.querySelector(".main-container").scrollTop = 0;
  }

  render() {
    return null;
  }
}

export default ScrollToTopOnMount;
