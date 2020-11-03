import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import drumMachineApp from "../images/drumMachineApp.png";
import { render } from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";

export default function DrumMach() {
  const exampleCode = `
  function playAudio(e) {
    if (power == true) {
      setIsHeard(e);

      e.play();
      e.currentTime = 0;
      console.log(e.paused);
      setSamplePlaying(e.title);

      e.volume = value / 100;
    } else if (power == false) {
      e.volume = 0;
    }
  }

 // button that triggers playAudio()
  <button
  className="drum-pad"
  id="Backward-Loop"
  onClick={() => playAudio(qRef.current)}>
  <audio
    src="https://freecodecampassets.s3.us-east-2.amazonaws.com/drum+machine+wavs/back+roll+wav.wav"
    type="audio/ogg"
    className="clip"
    id="Q"
    ref={qRef}
    title="Backward-Loop"></audio>
  Q
  </button>    
`;

  const exampleCode2 = `
const handleUserKeyPress = event => {
const { key, keyCode } = event;

if (keyCode === 81) {
playAudio(qRef.current);
setSamplePlaying("Backward-Loop");
}
};

useEffect(() => {
window.addEventListener("keydown", handleUserKeyPress);
return () => {
window.removeEventListener("keydown", handleUserKeyPress);
};
});
`;

  const exampleCode3 = `
              .Button-box { 
              position: relative;
              top: 50%;
              -ms-transform: translateY(-50%);             
              transform: translateY(-50%);              
              display: grid;              
              grid-template-columns: 1fr 1fr 1fr;              
              grid-template-rows: 1fr 1fr 1fr;              
              height: 80%;              
              width: 90%;              
              grid-gap: 10px 10px;             
              margin: auto;
              }`;
  return (
    <div className="diaryEntryBox">
      <Link to={"/"} className="homeLink">
        Home
      </Link>
      <h1 style={{ color: "blue" }}>
        <strong>React Drum Machine</strong>
      </h1>
      <br />
      <a target="_blank" href="https://gabehaus.github.io/PomodoroClock/">
        <div className="finalAppBox2">
          <img className="finalApp" src={drumMachineApp} />
        </div>
      </a>
      <a target="_blank" href="https://gabehaus.github.io/DrumMachine/">
        VIEW APP
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a target="_blank" href="https://github.com/Gabehaus/DrumMachine">
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
          href="https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-drum-machine"
          target="_blank"
        >
          here
        </a>
        .
        <br />
        <br />
        My main challenges were to figure out how to target audio elements , how
        to trigger playback of audio via keystrokes, and how to preload audio
        samples on the first render of the drum machine app.
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
          <h3>Targeting audio elements</h3>
          <br />
          <p>
            This was done using refs and the javascript play() method. After
            each sample is played, it's important that the sample is rewound
            back to its starting point via setting{" "}
            <code>e.currentTime = 0</code>
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
          <h3>Triggering audio playback via keystroke:</h3>
          <br />
          <p>
            I used{" "}
            <code>window.addEventListener("keydown", handleUserKeyPress);</code>
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
        CSS grid was used with a grid gap to produce the drum pad matrix.
        <br />
        <br />
        <figure>
          <figcaption>
            <strong>CSS grid styling</strong>
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
        My CSS code was still bloated at this point in my coding journey. I also
        would use the react-preload-image library in the future to handle
        loading of the background image. A final problem is that my audio
        samples do not pre-load on mobile browsers. "The mobile platforms are
        making a tradeoff to save battery and data usage to only load media when
        it's actually interacted with by the user or programmatically played
        (autoplay generally doesn't work for similar reasons)." In the future I
        would consider using the SoundJS library to trigger sound playback
        faster.{" "}
      </p>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
