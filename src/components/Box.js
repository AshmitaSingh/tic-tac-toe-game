import "../styles/Box.css";

function Box({ value, handleClick }) {
  return (
    <button className="box" onClick={handleClick}>
      {value}
    </button>
  );
}

export default Box;
