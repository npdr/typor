import { useEffect, useRef, useState } from "react";
import Word from "../Word";
import "./index.css";
import { generate } from "random-words";

const TextBox = () => {
  const size = 20;
  const [words, setWords] = useState(
    generate(size).reduce((arr, curr, index) => {
      arr.push(curr);
      if (index < size - 1) {
        arr.push(" ");
      }
      return arr;
    }, []),
  );
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [colors, setColors] = useState(
    words.map((row) =>
      row.split("").map(() => ({ r: 24, g: 24, b: 24, a: 0 })),
    ),
  );

  const focusRef = useRef(null);

  const showKeyboard = () => {
    console.log("focusing...");
    focusRef.current.focus();
    if (focusRef.current == document.activeElement) {
      console.log("worked!!!");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const pressedKey = event.key;
      const newColors = JSON.parse(JSON.stringify(colors));
      const isLetterOrSpace = /^[a-zA-Z\s]$/.test(pressedKey);

      if (!isLetterOrSpace) {
        return;
      }

      if (
        activeWordIndex >= words.length - 1 &&
        activeLetterIndex >= words[activeWordIndex].length - 1
      ) {
        const resetWords = generate(size).reduce((arr, curr, index) => {
          arr.push(curr);
          if (index < size - 1) {
            arr.push(" ");
          }
          return arr;
        }, []);

        setWords(resetWords);

        const resetColors = resetWords.map((row) =>
          row.split("").map(() => ({ r: 24, g: 24, b: 24, a: 0 })),
        );

        setColors(resetColors);

        setActiveWordIndex(0);
        setActiveLetterIndex(0);
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
    <div
      ref={focusRef}
      className="textBox-container"
      onClick={showKeyboard}
      tabIndex={0}
    >
      <input
        type="text"
        style={{ opacity: 0, position: "absolute", zIndex: -1 }}
      />
      {words.map((word, index) => {
        return <Word key={index} word={word} colors={colors[index]} />;
      })}
    </div>
  );
};

export default TextBox;
