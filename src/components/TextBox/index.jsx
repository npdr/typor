import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Word from "../Word";
import "./index.css";
import { generate } from "random-words";

const TextBox = ({ words }) => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [colors, setColors] = useState(
    words.map((row) =>
      row.split("").map(() => ({ r: 24, g: 24, b: 24, a: 0 })),
    ),
  );

  useEffect(() => {
    const handleKeyPress = (event) => {
      const pressedKey = event.key;
      const newColors = JSON.parse(JSON.stringify(colors));
      const isLetterOrSpace = /^[a-zA-Z\s]$/.test(pressedKey);

      if (activeWordIndex >= words.length || !isLetterOrSpace) {
        words.append(generate(10));
        return;
      }

      const word = words[activeWordIndex];

      const letter = word[activeLetterIndex];

      if (pressedKey === letter) {
        newColors[activeWordIndex][activeLetterIndex] = {
          r: 0,
          g: 255,
          b: 0,
          a: 0.2,
        };

        setColors(newColors);

        setActiveLetterIndex((prevIndex) => prevIndex + 1);

        if (activeLetterIndex >= word.length - 1) {
          setActiveWordIndex((prevIndex) => prevIndex + 1);
          setActiveLetterIndex(0);
        }
      } else {
        newColors[activeWordIndex][activeLetterIndex] = {
          r: 255,
          g: 0,
          b: 0,
          a: 0.2,
        };

        setColors(newColors);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeWordIndex, activeLetterIndex, words, colors]);

  return (
    <div className="textBox-container">
      {words.map((word, index) => {
        return <Word key={index} word={word} colors={colors[index]} />;
      })}
    </div>
  );
};

TextBox.propTypes = {
  words: PropTypes.arrayOf(String).isRequired,
};

export default TextBox;