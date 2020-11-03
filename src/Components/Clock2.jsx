import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OriginalClockBackground from "../images/OriginalClockBackground.png";
import finalClockApp from "../images/finalClockApp.png";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";

export default function Clock2() {
  const exampleCode = `
    function useInterval(callback, delay) {
        const savedCallback = useRef();
                
        // Remember the latest callback.
        useEffect(() => { savedCallback.current =
        callback;  }, [callback]);
                
        // Set up the interval.
        useEffect(() => {
        function tick() {
        savedCallback.current();
        } 
        if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
        }
        }, [delay]);
        }
                
        const App = () => {
        let [time, setTime] = useState(0); 
        useInterval(() => setTime(time - 1000), active ? 1000 :
        null);}
    `;

  const exampleCode2 = `
  minutes = Math.floor(ms / 60000), // 1 Minutes = 60000 Milliseconds;
  seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1Second = 1000 Milliseconds;
  `;

  const exampleCode3 = `
    transform: perspective(900px) rotateY(-20deg) skewY(-12deg) rotate3d(3, 0, 0, 18deg);
    `;
  return (
    <div className="diaryEntryBox">
      <Link to={"/"} className="homeLink">
        Home
      </Link>
      <h1>
        <strong>React Pomodoro Clock</strong>
      </h1>
      <br />
      <a target="_blank" href="https://gabehaus.github.io/PomodoroClock/">
        <div className="finalAppBox2">
          <img className="finalApp" src={finalClockApp} />
        </div>
      </a>
      <a target="_blank" href="https://gabehaus.github.io/PomodoroClock/">
        VIEW APP
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a target="_blank" href="https://github.com/Gabehaus/PomodoroClock">
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
          href="https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-25--5-clock"
          target="_blank"
        >
          here
        </a>
        .
        <br />
        <br />
        My main challenges were to figure out how to create a looping function
        to tick the clock downward, and to sort out the math necessary to
        convert milliseconds to a minutes and seconds format.
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
          <h3>Calculating minutes and seconds from milliseconds:</h3>
          <br />
          <p>
            Math.floor and the remainder operand (%) do the heavy lifting here.
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
        <li>
          <h3>Making the clock tick</h3>
          <br />
          <p>
            I initially considered using setTimeout inside useEffect(),
            triggering useEffect by passing the time variable as a second
            argument. Then I learned that setInterval is designed to
            continuously fire after a given delay. I decided to use setInterval
            inside a hook but then learned about the "stale closure problem" in
            which setInterval references the same callback repeatedly, and
            therefore does not update state via the callback. I found that this
            can be solved by storing the callback in a mutable ref, which means
            the latest callback can be saved in the ref on each render.
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
      </ul>
      <br />
      <br />
      <h2>Visual Design</h2>
      <br />
      <p>
        I wanted an impressive visual display and got the idea to search for a
        photograph of a jumbotron set in an urban landscape. I found this photo:{" "}
        <br />
        <div className="clockBackgroundBox1">
          <img className="clockBackground" src={OriginalClockBackground} />
        </div>
        <br />
        This opened up the opportunity to use several 3D transfrom properties to
        pain my clock data onto a 3D building.
        <br />
        <br />
        <figure>
          <figcaption>
            <strong>CSS transform example</strong>
          </figcaption>
          <pre>
            <Highlight
              {...defaultProps}
              code={exampleCode3}
              language="jsx"
              theme={dracula}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
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
      </p>
      <br />
      <br />
      <h2>Room For Improvement</h2>
      <br />
      <p>
        I did not realize that in using 3D transforms I would face an extremely
        complicated challenge regarding dealing with different screensizes. In
        the future I would like to tackle this challenge - possibly using the
        "react-sizeme" library to load different versions of the photo
        background depending on screen size. For now, I just used a quick fix in
        which smaller screens show a much simpler 2D clock using a different
        background. This was also a point in my coding development in which my
        CSS syntax was a bit bloated.{" "}
      </p>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
