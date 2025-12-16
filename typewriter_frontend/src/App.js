import React, { useEffect, useRef } from "react";
import "./App.css";
import Typewriter from "./Typewriter";

// PUBLIC_INTERFACE
function App() {
  // UI states
  const [input, setInput] = React.useState("");
  const [animatedText, setAnimatedText] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  // For accessibility: Keep focus on Animate btn after animation
  const animateBtnRef = useRef();

  // Apply light theme CSS variables matching style guide
  useEffect(() => {
    // Light theme color variables per style guide
    const r = document.documentElement;
    r.style.setProperty("--ui-bg", "#f9fafb");
    r.style.setProperty("--ui-surface", "#ffffff");
    r.style.setProperty("--ui-primary", "#3b82f6");
    r.style.setProperty("--ui-success", "#06b6d4");
    r.style.setProperty("--ui-text", "#111827");
    r.style.setProperty("--ui-border", "#e5e7eb");
    r.style.setProperty("--ui-btn-radius", "0.5rem");
    r.style.setProperty("--text-title", "#111827");
  }, []);

  // Handler for Animate (Start)
  const handleAnimate = () => {
    setHasAnimated(false);
    setAnimatedText(input.trim());
    setTyping(true);
  };

  // Handler for when typing animation completes
  const handleTypingFinished = () => {
    setTyping(false);
    setHasAnimated(true);
    if (animateBtnRef.current) {
      animateBtnRef.current.focus();
    }
  };

  // Handler for input box (textarea)
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setHasAnimated(false);
  };

  // Handler for Clear button
  const handleClear = () => {
    setInput("");
    setAnimatedText("");
    setHasAnimated(false);
    setTyping(false);
  };

  // Enter key in the input submits if not typing
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !typing) {
      e.preventDefault();
      handleAnimate();
    }
  };

  // Input box accessibility props
  const inputId = "typewriter-input";

  return (
    <div
      className="tw-bg"
      style={{
        minHeight: "100vh",
        background: "var(--ui-bg)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <main
        className="tw-main"
        style={{
          boxShadow: "0 4px 24px 0 #1118270a",
          borderRadius: "1.2rem",
          padding: "2.5rem 1.5rem 2.25rem 1.5rem",
          background: "var(--ui-surface)",
          minWidth: "330px",
          maxWidth: "98vw",
          width: "420px",
          margin: "3vh 0",
          display: "flex",
          flexDirection: "column",
          gap: "1.7rem",
        }}
        aria-label="Typewriter app main content"
      >
        {/* Input box */}
        <label
          htmlFor={inputId}
          style={{
            color: "var(--text-title, #111827)",
            fontSize: "1.08rem",
            fontWeight: 600,
            marginBottom: "0.5rem",
            marginLeft: "0.2rem",
            letterSpacing: 0.01,
            textAlign: "left",
            display: "block",
          }}
        >
          Enter your text
        </label>
        <textarea
          id={inputId}
          maxLength={500}
          autoFocus
          rows={3}
          className="tw-input"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          aria-label="Type text to be animated"
          aria-disabled={typing}
          style={{
            resize: "vertical",
            fontFamily: "inherit",
            fontSize: "1.05rem",
            color: "var(--ui-text)",
            background: "#f9fafb",
            border: "1.5px solid var(--ui-border)",
            borderRadius: "0.5rem",
            padding: "0.76em 1.06em",
            marginBottom: 0,
            outline: typing ? "none" : "auto",
            boxShadow: "0 2px 10px 0 #11182710",
            minHeight: "3.2em",
            transition: "border 0.18s, box-shadow 0.18s",
            opacity: typing ? 0.75 : 1,
            pointerEvents: typing ? "none" : "auto",
          }}
          disabled={typing}
        />

        {/* Animate button */}
        <div
          className="tw-btn-group"
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            justifyContent: "center",
            marginTop: "-0.8em",
            marginBottom: "0.5em",
          }}
        >
          <button
            ref={animateBtnRef}
            type="button"
            className="tw-btn tw-btn-primary"
            style={{
              background:
                "linear-gradient(90deg, #3b82f6 60%, #06b6d4 100%)",
              color: "#fff",
              border: 0,
              fontWeight: 600,
              borderRadius: "var(--ui-btn-radius)",
              padding: "0.77em 1.85em",
              fontSize: "1.09rem",
              letterSpacing: 0.01,
              marginBottom: 0,
              cursor: typing ? "not-allowed" : "pointer",
              boxShadow: typing
                ? "none"
                : "0 4px 14px 0 #3b82f673",
              opacity:
                !input.trim() || typing ? 0.67 : 0.97,
              pointerEvents:
                !input.trim() || typing ? "none" : "auto",
              transition:
                "box-shadow 0.2s, opacity 0.2s, background 0.22s",
              outline: "none",
            }}
            onClick={handleAnimate}
            aria-label={
              typing
                ? "Animating"
                : input && input.trim()
                ? "Start typewriter animation"
                : "Enter text to animate"
            }
            disabled={!input.trim() || typing}
          >
            {typing ? "Animating..." : "Animate"}
          </button>
          <button
            type="button"
            className="tw-btn tw-btn-clear"
            style={{
              background: "#f9fafb",
              color: "#3b82f6",
              border: "1.4px solid #3b82f6",
              fontWeight: 500,
              borderRadius: "var(--ui-btn-radius)",
              padding: "0.77em 1.65em",
              fontSize: "1.06rem",
              marginBottom: 0,
              cursor: input || animatedText ? "pointer" : "not-allowed",
              opacity: input || animatedText ? 0.88 : 0.48,
              pointerEvents: input || animatedText ? "auto" : "none",
              transition: "background 0.18s, color 0.18s, opacity 0.18s",
              outline: "none",
            }}
            aria-label="Clear text"
            onClick={handleClear}
            disabled={!input && !animatedText}
          >
            Clear
          </button>
        </div>

        {/* Animated Output */}
        <section
          className="tw-output"
          aria-label="Animated output"
          style={{
            display: "flex",
            minHeight: "3.3em",
            alignItems: "center",
            justifyContent: "center",
            background: "#f9fafb",
            borderRadius: "0.7em",
            minWidth: "100%",
            border:
              (animatedText || typing) && "#3b82f63b 1.3px solid",
            boxShadow:
              (animatedText || typing)
                ? "0 2px 12px #3b82f616"
                : "none",
            color: "var(--text-title, #111827)",
            fontSize: "1.37rem",
            fontWeight: 500,
            transition:
              "box-shadow 0.22s, border 0.22s, background 0.22s",
          }}
        >
          <Typewriter
            text={animatedText}
            playing={typing}
            typingDelay={33}
            onFinished={handleTypingFinished}
            className="tw-typewriter"
          />
        </section>
      </main>
      <footer style={{ marginTop: "2.5em", color: "#b2bcd7" }}>
        <small>
          <span style={{ color: "#3b82f6" }}>Typewriter</span> app &mdash; by KAVIA. No data is sent to a server.
        </small>
      </footer>
      {/* Typewriter blink animation */}
      <style>{`
        @keyframes tf-blink {
          0%   { opacity: 0.15; }
          45%  { opacity: 0.55; }
          52%  { opacity: 0.99; }
          80%  { opacity: 0.12; }
          100% { opacity: 0.47; }
        }
      `}</style>
    </div>
  );
}

export default App;
