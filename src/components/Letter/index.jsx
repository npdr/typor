import PropTypes from "prop-types";
import "./index.css";

const Letter = ({ letter, color }) => {
  const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  const divStyle = {
    background: rgbaColor,
  };

  return (
    <div className="letter-container" style={divStyle}>
      {letter}
    </div>
  );
};

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  color: PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    a: PropTypes.number.isRequired,
  }).isRequired,
};

export default Letter;
