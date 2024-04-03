import "./App.css";
import TextBox from "./components/TextBox";
import { generate } from "random-words";

function App() {
  const words = generate(20);
  const wordsWithSpace = words.reduce((arr, curr, index) => {
    arr.push(curr);
    if (index < words.length - 1) {
      arr.push(" ");
    }
    return arr;
  }, []);

  return (
    <div className="main-container">
      <TextBox words={wordsWithSpace} />
    </div>
  );
}

export default App;
