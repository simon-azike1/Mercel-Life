import React, { useState, useEffect } from "react";

const TypingName = ({ name = "Marcelina Kehinde", speed = 150 }) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = setTimeout(() => {
      if (!isDeleting) {
        setText(name.substring(0, text.length + 1));
      } else {
        setText(name.substring(0, text.length - 1));
      }

      if (!isDeleting && text === name) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
      }
    }, speed);

    return () => clearTimeout(handleTyping);
  }, [text, isDeleting, name, speed]);

  return (
    <span className="bg-gradient-to-r from-green-600 to-black bg-clip-text text-transparent">
      {text}
      <span className="inline-block w-1 h-full bg-black animate-blink ml-1"></span>
    </span>
  );
};

export default TypingName;
