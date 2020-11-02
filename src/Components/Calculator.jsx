import React from "react";
import calcApp from "../images/calcApp.png";

import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";

export default function Clock2() {
  const exampleCode = `
  //App.js

  function clickNumber(NUM) {
    //condition in which a decimal has already been clicked
    if (NUM == "." && /\./.test(buttonClicked)) {
      return;
    } else if (buttonClicked == 0) {
      setButtonClicked(NUM.toString());
      setRunningEquation(NUM);
    } else {
      setButtonClicked(buttonClicked => {
        return buttonClicked + NUM.toString();
      });

      setRunningEquation(runningEquation => {
        return runningEquation + NUM.toString();
      });
    }
  }

  

  <NumberGrid className="num-grid-class" clickTestProp1={clickNumber} />  // passing the function as a prop in App.js


  // In the component <NumberGrid/> a second function must be created that calls clickTestProp1

  function secondFunction(num) {
    clickTestProp1(num);
  }


  //this function is then passed as another prop to the NumberPad component

  numArrayPainted = numArray.map((elem, i) => {
    return (
      <NumberPad
        key={elem.sym}
        padId={elem.name}
        padValue={elem.sym}
        secondFunctionProp={() => {
          secondFunction(elem.sym);
        }}
      />
    );
  });

  return (
    <div id="num-grid" className="num-grid">
      {numArrayPainted}
    </div>
  );
    `;

  const exampleCode2 = `
  //when math function is clicked
  function clickFunc(symbol, mathSymbol) {
    //var x = runningEquation.length-1;

    //if a function is clicked and it is not "-"
    if (mathSymbol != "-") {
      //if a math function is clicked and it is not "-", if the last character in equation IS function
      if (
        runningEquation[runningEquation.length - 1] == "*" ||
        runningEquation[runningEquation.length - 1] == "+" ||
        runningEquation[runningEquation.length - 1] == "-" ||
        runningEquation[runningEquation.length - 1] == "/"
      ) {
        //if a math function was clicked twice, ignore the last click
        if (
          runningEquation[runningEquation.length - 2] == "*" ||
          runningEquation[runningEquation.length - 2] == "+" ||
          runningEquation[runningEquation.length - 2] == "-" ||
          runningEquation[runningEquation.length - 2] == "/"
        ) {
          setRunningEquation(
            runningEquation =>
              runningEquation.substring(0, runningEquation.length - 2) +
              mathSymbol
          );
          setButtonClicked(symbol);
        } else {
          //otherwise add the last character
          setRunningEquation(
            runningEquation =>
              runningEquation.substring(0, runningEquation.length - 1) +
              mathSymbol
          );
          setButtonClicked(symbol);
        }
      }

      //else if clicked is not "-" but previous char was not a function, just add this to end of running equation
      else {
        setButtonClicked(symbol);
        setRunningEquation(runningEquation => {
          return runningEquation + mathSymbol.toString();
        });
      }

      //if clicked IS "-" and previous char was "-" don't do anything
    } else if (
      mathSymbol == "-" &&
      runningEquation[runningEquation.length - 1] == "-"
    ) {
      return;
    }

    //if clicked IS "-", and previous was not "-" just add this to the end of the running equation
    else {
      setButtonClicked(symbol);
      setRunningEquation(runningEquation => {
        return runningEquation + mathSymbol.toString();
      });
    }
  }
  `;

  const exampleCode3 = `
    transform: perspective(900px) rotateY(-20deg) skewY(-12deg) rotate3d(3, 0, 0, 18deg);
    `;
  return (
    <div className="diaryEntryBox">
      <h1 style={{ color: "#8467a1" }}>
        <strong>React Calculator</strong>
      </h1>
      <br />
      <a target="_blank" href="https://gabehaus.github.io/calculator/">
        <div className="finalAppBox">
          <img className="finalApp" src={calcApp} />
        </div>
      </a>
      <a target="_blank" href="https://gabehaus.github.io/calculator/">
        VIEW APP
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a target="_blank" href="https://github.com/Gabehaus/calculator">
        VIEW CODE
      </a>
      <br />
      <br />
      <br />
      <h2>Summary</h2>
      <p>
        This was an assignment on freeCodeCamp.com. The "user stories"
        (requirements) for designing the app can be found{" "}
        <a
          href="https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator"
          target="_blank"
        >
          here
        </a>
        .
        <br />
        <br />
        My main challenge in construction of this app was to sort out how to
        deal with nuances in the patterns of characters users might type into a
        calculator. There was also the challenge of figuring out how to send a
        function as a prop to a component that is nested inside another
        component.
        <br />
        <br />
        The vast majority of code in this project was written independently,
        without the help of tutorials or blog posts.
      </p>
      <br />
      <br />
      <h2>Noteworthy Code Concepts</h2>
      <br />
      <ul>
        <li>
          <h3>Handling clicks of (non-math function) pads on calculator</h3>
          <br />
          <p>
            An edge case that presented itself was what to do if a decimal was
            clicked twice in a row: <br />
            <code>
              {" "}
              if (NUM == "." &amp;&amp; /\./.test(buttonClicked)) &#123;
              return;}
            </code>
            <br />
            <br />
            Function clickNumber(NUM) was passed as a prop to component,
            "NumberGrid", in which a new function was created that called the
            prop containing "clickNumber(NUM)". Now days I would use Redux to
            store "clickNumber()" as a Redux action.
          </p>
          <figure>
            <pre>
              <Highlight
                {...defaultProps}
                code={exampleCode}
                language="jsx"
                theme={dracula}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps
                }) => (
                  <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                      <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </pre>
          </figure>
        </li>
        <li>
          <h3>Handling clicks of math functions</h3>
          <br />
          <p>
            Many edge cases needed to be considered. If two math functions were
            inputted successively, the last had to be ignored. But a negative
            number COULD be subtracted so it was possible for two minus signs to
            be inputted one after the other.
          </p>
          <figure>
            <pre>
              <Highlight
                {...defaultProps}
                code={exampleCode2}
                language="jsx"
                theme={dracula}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps
                }) => (
                  <pre className={className} style={style}>
                    {tokens.map((line, i) => (
                      <div {...getLineProps({ line, key: i })}>
                        {line.map((token, key) => (
                          <span {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </pre>
          </figure>
        </li>
      </ul>
      <br />
      <br />
      <h2>Visual Design</h2>
      <br />
      <p>
        I decided to use nested grid matrixes to align all buttons. It took a
        bit of math to sort out the necessary length of the calculator screen,
        as I had to account for not only the width of each button, but the width
        of grid gaps as well. A button was 100px in width while the screen was
        403 px because it spanned over 3 grid gaps.{" "}
      </p>
      <br />
      <br />
      <h2>Room For Improvement</h2>
      <br />
      <p>
        If I recreated this app I would use Redux actions instead of nested
        props containing functions.
      </p>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
