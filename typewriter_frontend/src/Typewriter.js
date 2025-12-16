import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * PUBLIC_INTERFACE
 * Typewriter
 * Props:
 *   - text (string): The full string to display using the typewriter animation effect.
 *   - playing (boolean): Whether the animation is running.
 *   - onFinished (function): Callback when animation is complete.
 *   - className (string): Custom class for styling.
 *   - typingDelay (number): Delay in ms between letters.
 */
export default function Typewriter({
  text,
  playing,
  onFinished,
  className,
  typingDelay = 40,
  ...rest
}) {
  const [displayed, setDisplayed] = React.useState("");
  const timerId = useRef();

  useEffect(() => {
    if (!playing) {
      setDisplayed(text ? text : "");
      return;
    }
    setDisplayed("");
    let idx = 0;
    function typeNext() {
      if (idx < text.length) {
        setDisplayed(text.slice(0, idx + 1));
        idx += 1;
        timerId.current = setTimeout(typeNext, typingDelay);
      } else if (onFinished) {
        onFinished();
      }
    }
    if (text && playing) typeNext();
    return () => timerId.current && clearTimeout(timerId.current);
    // eslint-disable-next-line
  }, [text, playing, typingDelay]);

  return (
    <div
      className={className}
      aria-live="polite"
      aria-atomic="true"
      tabIndex={0}
      style={{
        minHeight: "2.5em",
        outline: "none",
        fontFamily: 'inherit',
        fontWeight: 500,
        fontSize: "1.5rem",
        color: "var(--text-title, #111827)",
      }}
      {...rest}
    >
      {displayed}
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          background: "currentColor",
          width: "1ch",
          height: "1.1em",
          marginLeft: "0.05em",
          opacity: playing ? 0.45 : 0,
          borderRadius: 1,
          // Animation blink only when playing
          animation: playing ? "tf-blink 1s step-end infinite" : "none",
          verticalAlign: "middle",
        }}
      ></span>
    </div>
  );
}

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
  playing: PropTypes.bool,
  onFinished: PropTypes.func,
  className: PropTypes.string,
  typingDelay: PropTypes.number,
};
