import React, { useState } from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

export default function LatexConverter() {
  const config = {
    loader: { load: ['input/asciimath'] },
  };

  const [latexInput, setLatexInput] = useState('');

  const handleInputChange = (e) => {
    setLatexInput(e.target.value);
  };

  const regex = /\$\s*([^$]+?)\s*\$|\$\$\s*([^$]+?)\s*\$\$/g;

  const countOccurrences = (str, char) => {
    return str.split(char).length - 1;
  };

  const dollarCount = countOccurrences(latexInput, '$');

  const evenDelimiters = dollarCount % 2 === 0;

  const modifiedText = latexInput.replace(regex, (match, p1, p2) => {
    return p1 ? '`' + p1 + '`' : '`' + p2 + '`';
  });

  const parts = modifiedText.split('$');

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
      <textarea
        rows={5}
        cols={50}
        value={latexInput}
        onChange={handleInputChange}
        placeholder="Write your equations (each on a new line)"
      />

      {renderMath()}
    </MathJaxContext>
  );
}
