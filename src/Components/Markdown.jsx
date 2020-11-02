import React from "react";
import markdownApp from "../images/markdownApp.png";
import finalClockApp from "../images/finalClockApp.png";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";

export default function Clock2() {
  const exampleCode = `
  findCursorPosition(e) {
    let cursorPosition = e.target.selectionStart;

    //this.setState({ cursorPosition: e.target.selectionStart });

    this.setState({
      textBeforeCursorPosition: e.target.value.substring(0, cursorPosition)
    });
    this.setState({
      textAfterCursorPosition: e.target.value.substring(
        cursorPosition,
        e.target.value.length
      )
    });
  }
    `;

  const exampleCode2 = `
  tableEnter() {
    const headerUnit = "|some text";
    const dividerUnit = "|-";
    const cellUnit = "|cell data";

    this.setState(state => ({
      lastEnteredText:
        headerUnit.repeat(this.state.columns) +
        "\\n" +
        dividerUnit.repeat(this.state.columns) +
        "\\n" +
        (cellUnit.repeat(this.state.columns) + "\\n").repeat(this.state.rows - 1)
    }));
  }
  `;

  const exampleCode3 = `
    transform: perspective(900px) rotateY(-20deg) skewY(-12deg) rotate3d(3, 0, 0, 18deg);
    `;
  return (
    <div className="diaryEntryBox">
      <h1 style={{ color: "blue" }}>
        <strong>React Markdown Previewer</strong>
      </h1>
      <br />
      <a target="_blank" href="https://gabehaus.github.io/markdownViewer/">
        <div className="finalAppBox">
          <img className="finalApp" src={markdownApp} />
        </div>
      </a>
      <a target="_blank" href="https://gabehaus.github.io/markdownViewer/">
        VIEW APP
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a target="_blank" href="https://github.com/Gabehaus/markdownViewer">
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
          href="https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer"
          target="_blank"
        >
          here
        </a>
        .
        <br />
        <br />
        My main challenges were to convert markdown to HTML, to use Bootstrap to
        create an automated markdown toolbox, and to create a text area field in
        which users are able to place a cursor at any point and then paste
        markdown text created in the toolbox.
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
          <h3>
            Code to place cursor anywhere inside a text-area element and insert
            additional text:
          </h3>
          <br />
          <p>
            Cursor position was found using e.target.selectionStart. Then any
            text previously existing before the location of this cursor point
            was saved as a string in a variable, and any text that existed at a
            location after this point was saved in a second variable. New text
            to be inserted can be added between these two strings.
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
          <h3>Function used in automated markdown table generator</h3>
          <br />
          <p>
            In this function the <code>.repeat()</code> javascript method is
            used to multiply placeholder text by the number of columns and rows
            selected in the table generator.
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
        The "react-draggable" library was used to make the user toolbox
        draggable for easier use. Bootstrap dropdown buttons were utilized in
        the toolbox toolbar.{" "}
      </p>
      <br />
      <br />
      <h2>Room For Improvement</h2>
      <br />
      <p>
        Making an ergonomic layout for users to traverse two large text fields
        and a toolbox was challenging. Especially on smaller screens. I also
        struggled with my background image not spanning the entire height of my
        app. If I recreated this app in the future I would consider using modals
        to reduce screen crowding.
      </p>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
