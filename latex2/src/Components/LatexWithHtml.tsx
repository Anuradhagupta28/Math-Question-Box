import React, { useEffect, useState } from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

export default function LatexConverter() {
  const config = {
    loader: { load: ['input/asciimath'] },
  };

  const [latexInput, setLatexInput] = useState(
    "Perimeter of sector $=2 r+r \\theta$<br>$\\Rightarrow 60=2 r+r \\theta$ [given]<br><img src='https://lh3.googleusercontent.com/Rhr7A0h7G5T7-NSoQfLpHdZbNT-6P7IUlSL4QZZUmzUsaXuRoK5XbDfqTe_UINM4kBwhxUbs2h0ABx-ekU5pfGKhfdoXCEGB4WQ'><br>$\\Rightarrow quad \\theta=\\frac{60-2 r}{r}$<br>Area of sector, $A=\\frac{pi r^{2} \\theta}{360^{circ}}=\\frac{pi r^{2}(60-2 r)}{r 360^{circ}}$<br>$=\\frac{pi r}{180^{circ}}(30-r)$<br>$\\Rightarrow \\frac{d A}{d r}=\\frac{pi}{180^{circ}}(30-2 r)$<br>For maximum area, $\\frac{d A}{d r}=0 \\Rightarrow r=15$<br>Now, $\\frac{d^{2} A}{d r^{2}}=\\frac{pi}{180^{circ}}(0-2)=-\\frac{pi}{90}$<br>$\\therefore$ It is maximum at $r=15 mathrm{~m}$"
  );

  useEffect(() => {}, [latexInput]);

  const handleInputChange = (e) => {
    setLatexInput(e.target.value);
  };

  const renderMath = (latexInput) => {
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

    if (evenDelimiters) {
      return parts.map((el, i) => <MathJax key={i}>{el}</MathJax>);
    } else {
      return <div>Error: Unbalanced delimiters in LaTeX equations</div>;
    }
  };

  const renderHTML = (html) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const extractHTML = () => {
    const htmlRegex = /<[^>]+?>/g;
    const htmlMatches = latexInput.match(htmlRegex) || [];
    const sanitizedLatex = latexInput.replace(htmlRegex, '');

    const filteredHtmlMatches = htmlMatches.filter(
      (tag) => tag.toLowerCase() !== '<br>'
    );

    const htmlContent = filteredHtmlMatches.join('');

    return { sanitizedLatex, htmlContent };
  };

  const { sanitizedLatex, htmlContent } = extractHTML();

  console.log(sanitizedLatex);

  return (
    <MathJaxContext config={config}>
      <h2>Displaying LaTeX Equations and HTML Content</h2>
      <textarea
        rows={10}
        cols={50}
        value={latexInput}
        onChange={handleInputChange}
        placeholder="Write your equations and HTML content"
      />

      <div>
        {renderHTML(htmlContent)}
        {renderMath(sanitizedLatex)}
      </div>
    </MathJaxContext>
  );
}
