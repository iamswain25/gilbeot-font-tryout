import "normalize.css";
import "./App.css";
import TextareaAutosize from "react-autosize-textarea";
function App() {
  return (
    <section className="container">
      <h1>
        <span className="Gilbeot_Rainbow">길벗체 웹 테스트</span>
        <a href="http://rainbowfoundation.co.kr/" className="Gilbeot_TG link">
          홈페이지 가기
        </a>
      </h1>
      <div>
        <h2>
          <TextareaAutosize
            className="Gilbeot_BI underline"
            defaultValue="Gilbeot_BI"
          />
        </h2>
        <h2>
          <TextareaAutosize
            className="Gilbeot_Rainbow underline"
            defaultValue="Gilbeot_Rainbow"
          />
        </h2>
        <h2>
          <TextareaAutosize
            className="Gilbeot_TG underline"
            defaultValue="Gilbeot_TG"
          />
        </h2>
      </div>
    </section>
  );
}

export default App;
