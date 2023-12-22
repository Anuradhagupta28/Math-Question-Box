import {MathJaxContext,MathJax} from "better-react-mathjax"
import { useState } from "react";
export default function Latex() {
    const config = {
        loader: { load: ["input/asciimath"] }
    };
    
    const InitialText =
    'If $A=2 x-y+3 x y, B=x+2 x y$ and $C=3 y+x y$, find the value of $\\mathrm{A}+\\mathrm{B}+\\mathrm{C}$';

    const data='$$'
  const [editableText, setEditableText] = useState(InitialText);
  const text = editableText;
  const parts = text.split(/\$(.*?)\$/);
  console.log(parts)
//   const renderedText = parts.map((part, index) =>
//     index % 2 === 0 ? (
//       <span key={index}>{part}</span>
//     ) : (
//       <span key={index} contentEditable={true}>
//         <MathLiveKeyboard latex={part} />
//       </span>
//     )
//   );

// config={config}
const hey="`frac(10)(4x) approx 2^(12)`";
    return (
        <MathJaxContext config={config}>
            <h2>Basic MathJax example with AsciiMath</h2>
            
           
            {/* <MathJax>{parts}</MathJax> */}
            <MathJax>{"`x^2+ Y^2 +2ab`"}</MathJax>
            <MathJax>{"`\\mathrm{A}+\\mathrm{B}+\\mathrm{C}`"}</MathJax>
            <MathJax>{hey}</MathJax>
            
        </MathJaxContext>
    );
}
// frac(10)(4x) approx 2^(12)