import React, { useEffect, useState } from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

export default function LatexConverter() {
  const config = {
    loader: { load: ["input/asciimath"] }
  };

  // const [latexInput, setLatexInput] = useState("");

  // const handleInputChange = (e) => {
  //   setLatexInput(e.target.value);
  // };
  // console.log(latexInput);

  const latexInput =
    'If $A=2 x-y+3 x y, B=x+2 x y$ and $C=3 y+x y$, find the value of  $$\\mathrm{A}+\\mathrm{B}+\\mathrm{C}$$ , $a^2$ ';

  const regex = /\$\s*([^$]+?)\s*\$|\$\$\s*([^$]+?)\s*\$\$/g;

  const countOccurrences = (str, char) => {
    return str.split(char).length - 1;
  };

  const dollarCount = countOccurrences(latexInput, '$');
  console.log("dollarCount",dollarCount);

  const evenDelimiters = dollarCount % 2 === 0;

  // const [isValid, setIsValid] = useState(evenDelimiters);

  const modifiedText = latexInput.replace(regex, (match, p1, p2) => {
    return p1 ? '`' + p1 + '`' : '`' + p2 + '`';
  });
  console.log("modifiedText",modifiedText);

  const parts = modifiedText.split('$');

  console.log("parts",parts);

 
  const renderMath = () => {
    if (evenDelimiters) {
      return parts.map((el, i) => <MathJax key={i}>{el}</MathJax>);
    } else {
      return <div>Error: Unbalanced delimiters in LaTeX equations</div>;
    }
  };

  return (
    <MathJaxContext config={config}>
      <h2>Displaying LaTeX Equations</h2>
      {/* <textarea
        value={latexInput}
        placeholder="Write your equations (each on a new line)"
        onChange={handleInputChange}
        rows={5}
        cols={50}
      /> */}
      
      {renderMath()}
    </MathJaxContext>
  );
}
