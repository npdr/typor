import PropTypes from "prop-types";
import Letter from "../Letter";
import "./index.css";

const Word = ({ word, colors }) => {
  return (
    <div className="word-container">
      {word.split("").map((letter, index) => {
        return <Letter key={index} letter={letter} color={colors[index]} />;
      })}
    </div>
  );
};

Word.propTypes = {
  word: PropTypes.string.isRequired,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      r: PropTypes.number.isRequired,
      g: PropTypes.number.isRequired,
      b: PropTypes.number.isRequired,
      a: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

Word.displayName = "Word";
export default Word;
