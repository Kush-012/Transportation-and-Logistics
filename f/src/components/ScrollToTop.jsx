import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300); // show after 300px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    show && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "100px",
          right: "30px",
          padding: "12px 16px",
          borderRadius: "50%",
          border: "none",
          background: "linear-gradient(135deg, #2563eb, #1e40af)",

          color: "#fff",
          cursor: "pointer",
          fontSize: "18px",
          zIndex: 1000,
          width:"50px",
          height:"50px"
        }}
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
