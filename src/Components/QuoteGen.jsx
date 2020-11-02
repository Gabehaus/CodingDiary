import React from "react";
import quoteGenApp from "../images/quoteGenApp.png";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";

export default function QuoteGen() {
  const exampleCode = `
  async getData() { 
    const url = "http://quotes.stormconsultancy.co.uk/random.json";
    const response = await fetch(url);
    var newData = await response.json();
    this.setState({ loading: false, quoteData: newData });
    this.newQuote = this.state.quoteData.quote;
    this.setBackground();
    `;

  const exampleCode2 = `
  setBackground() {
  document.body.style.backgroundImage = "url(" +
  this.state.backgroundImages[this.state.index] + ")";
  this.handleClick(); }
  `;

  const exampleCode3 = `
  <a class="tweet-quote" <br />
  href={\`https://twitter.com/intent/tweet?text=\${this.state.quoteData.quote}\`} data-size="large" >
 
  <FontAwesomeIcon icon={faTwitter} size="2x" <br />
  color="white" 
  style={ { backgroundColor: "none", width: "10%", marginLeft: "-35%" }} > 
  </FontAwesomeIcon > </a> 
  `;

  return (
    <div className="diaryEntryBox">
      <h1 style={{ color: "blue" }}>
        <strong>React Random Quote Generator</strong>
      </h1>
      <br />
      <a target="_blank" href="https://gabehaus.github.io/ReactQuotes3/">
        <div className="finalAppBox">
          <img className="finalApp" src={quoteGenApp} />
        </div>
      </a>
      <a target="_blank" href="https://gabehaus.github.io/ReactQuotes3/">
        VIEW APP
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a target="_blank" href="https://github.com/Gabehaus/ReactQuotes3">
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
          href="https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-random-quote-machine"
          target="_blank"
        >
          here
        </a>
        .
        <br />
        <br />I needed to fetch famous quotes and corresponding info from an
        API, cycle through quotes and apply different styling to each one, and
        use the "twitter.com/intent/tweet" path so that users can tweet quotes.
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
          <h3>Fetching data using async / await</h3>
          <br />
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
          <h3>Setting background images of quotes dynamically</h3>
          <br />
          <p>
            For this app I used <code>document.body.style.backgroundImage</code>{" "}
            to change background images. Now days I prefer to change the source
            of an img element as I find it easier to work with images inside of
            divs.
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
          <h3>Making quotes "Tweetable" </h3>
          <br />
          <p>
            Code as suggested in the documentation on the Twitter developers
            site
          </p>
          <figure>
            <pre>
              <Highlight
                {...defaultProps}
                code={exampleCode3}
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
        To style my quotes I used an array of CSS styling blocks which I stored
        as a state variable to be cycled through as each new quote is generated.
        Now days I would probabaly just cycle through different class names
        using an inline conditional statement. I think storing all styling in an
        index.css file is a better practice.
        <br />
        <figure>
          <pre></pre>
        </figure>
      </p>
      <br />
      <br />
      <h2>Room For Improvement</h2>
      <br />
      <p>
        A big problem that arose was the sudden, jarring flash when cycling
        between background images. In the creation of this app I stored
        background image urls in a state array in an attempt to pre-load them.
        In future apps it would be better to use the react-preload-image or
        possibly the CSSTransition identifier from the "React Transition Group"
        library.
      </p>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
