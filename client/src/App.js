import { useState } from "react";
import Button from "./Button";
import axios from "axios";

function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState(null);

  const clearValues = () => {
    setNumber1("");
    setNumber2("");
    setOperator("");
    setResult(null);
  }

  const getResultFromService = async () => {
    if(result !== null || number1 === "" || number2 === "" || operator === "") {
      return;
    }

    let response = null;
    if(operator === "/") {
      response = await axios.get("http://127.0.0.1:5000/divide", {params: {number1: number1, number2: number2}});
    }
    else if(operator === "*") {
      response = await axios.get("http://127.0.0.1:5000/multiply", {params: {number1: number1, number2: number2}});
    }
    else if(operator === "-") {
      response = await axios.get("http://127.0.0.1:5000/subtract", {params: {number1: number1, number2: number2}});
    }
    else if(operator === "+") {
      response = await axios.get("http://127.0.0.1:5000/add", {params: {number1: number1, number2: number2}});
    } else {
      return;
    }

    if(response !== null) {
      setResult(`${number1} ${operator} ${number2} = ${response.data}`);
    }
  }

  const clickNumberButtons = (event) => {
    const buttonKey = event.target.value;
    if(buttonKey === "/" || buttonKey === "*" || buttonKey === "-" || buttonKey === "+") {
      setOperator(buttonKey);
    } else if (buttonKey === "=") {
      // !backend'e sonuç gönderilecek
      getResultFromService();
    } else if (buttonKey === "C") {
      // !alan temizlenecek
      clearValues();
    } else {
      if (operator === "") {
        setNumber1(oldValue => oldValue + buttonKey);
      } else {
        setNumber2(oldValue => oldValue + buttonKey);
      }
    }
  }

  return (
    <div className="container">
      <table className="calculator">
        <tr>
          <td colSpan="3">
            <input className="display-box" type="text" id="result" value={result !== null ? result : `${number1} ${operator} ${number2}`} disabled />
          </td>
          <Button value="C" id="btn" clickNumberButtons={clickNumberButtons}/>
        </tr>
        <tr>
          <Button value="1" clickNumberButtons={clickNumberButtons}/>
          <Button value="2" clickNumberButtons={clickNumberButtons}/>
          <Button value="3" clickNumberButtons={clickNumberButtons}/>
          <Button value="/" clickNumberButtons={clickNumberButtons}/>
        </tr>
        <tr>
          <Button value="4" clickNumberButtons={clickNumberButtons}/>
          <Button value="5" clickNumberButtons={clickNumberButtons}/>
          <Button value="6" clickNumberButtons={clickNumberButtons}/>
          <Button value="*" clickNumberButtons={clickNumberButtons}/>
        </tr>
        <tr>
          <Button value="7" clickNumberButtons={clickNumberButtons}/>
          <Button value="8" clickNumberButtons={clickNumberButtons}/>
          <Button value="9" clickNumberButtons={clickNumberButtons}/>
          <Button value="-" clickNumberButtons={clickNumberButtons}/>
        </tr>
        <tr>
          <Button value="." clickNumberButtons={clickNumberButtons}/>
          <Button value="0" clickNumberButtons={clickNumberButtons}/>
          <Button value="=" clickNumberButtons={clickNumberButtons}/>
          <Button value="+" clickNumberButtons={clickNumberButtons}/>
        </tr>
      </table>
    </div>
  );
}

export default App;
