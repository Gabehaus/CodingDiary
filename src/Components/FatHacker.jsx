import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import fathackerApp from "../images/fathackerApp.png";
import fathackerGuage1 from "../images/fathackerGuage1.png";
import fathackerSearch1 from "../images/fathackerSearch1.png";
import fatGraph1 from "../images/fatGraph1.png";
import fatGraph2 from "../images/fatGraph2.png";
import fatGraph3 from "../images/fatGraph3.png";
import lettuceFeather4 from "../images/lettuceFeather4.png";
import pasta1 from "../images/pasta1.png";
import fatLogInput from "../images/fatLogInput.png";
import loginGoogle from "../images/loginGoogle.png";
import fatHealthData from "../images/fatHealthData.png";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";

export default function FatHacker() {
  const exampleCode = `
  //{3} means "3 occurrences”
  const heightInCM = healthData.healthData.height.match(
    /[0-9]{3}\.*[0-9]*/
  );
    `;

  const exampleCode2 = `
  const kgs = +convert(this.state.weight)
        .from("lb")
        .to("kg")
        .toFixed(2);
  `;

  const exampleCode3 = `
  switch (activityLevel) {
    case "Little to no exercise":
      var activityFactor = 1.2;
      break;
    case "Light exercise":
      activityFactor = 1.375;
      break;
    case "Moderate exercise":
      activityFactor = 1.55;
      break;
    case "Heavy exercise":
      activityFactor = 1.725;
      break;
    case "Very heavy exercise":
      activityFactor = 1.9;
      break;
    default:
      activityFactor = 1.55;
      break;
  }
    `;

  const exampleCode4 = `
    // 10% of BMR 
    var caloriesAllowed = BMRnumber * 0.1;
    
    //1 gram of fat contains nine calories
    var fatAllowed = (caloriesAllowed / 9).toFixed(2);
    `;

  const exampleCode5 = `
 //function returns the average fat consumed at a meal (entered as an argument) over the last week
  calcMealFatAvg = mealArg => {
    let formattedDates = [];
    let fatOnDays = [];

    //pushes formatted dates for the last seven days to an array
    for (let i = 1; i <= 7; i++) {
      let day = moment() 
        .subtract(i, "days")
        .startOf("day")
        .toString();

      let formattedDate = moment(day).format("YYYY-MM-DD");
      formattedDates.push(formattedDate);
    }

    //uses .filter() to return fat logs on each of the last 7 days
    for (let i = 0; i <= 6; i++) {
      let logs = this.props.fatLog.fatLogs.filter(({ date }) => {
        //converts dates back to local time 
        let adjst = moment(date)
          .format("YYYY-MM-DD")
          .toString();

        return adjst === formattedDates[i];
      });
      //filters fat logs on each of last seven days and returns those made at particular meal
      const logsAtMeal = logs.filter(({ meal }) => meal === mealArg);

      //totals the fat consumed at desired meal on each day
      let fatOnDay = logsAtMeal.reduce((sum, { fat }) => {
        return sum + Number(fat);
      }, 0);

      //pushes the fat consumed at a specific meal on a specific day to an array
      fatOnDays.push(fatOnDay);
    }
    //totals all fat consumed at desired meal over the last week
    let mealTot = fatOnDays.reduce((sum, elem) => (sum += elem), 0);

    //finds the average fat consumed at each meal per day over the last week
    let mealAvg = (mealTot / 7).toFixed(2);

    return mealAvg;
  };

  componentDidMount() {
    this.props.getFatLogs(this.props.username);

    const totBreakfast = this.calcMealFatAvg("Breakfast");
    const totLunch = this.calcMealFatAvg("Lunch");
    const totDinner = this.calcMealFatAvg("Dinner");
    const totSnacks = this.calcMealFatAvg("Snack");
    const totRandom = this.calcMealFatAvg("Random Meal");

    this.setState({
      totalAllMeals:
        totBreakfast + totLunch + totDinner + totSnacks + totRandom,
      dataPie: {
        labels: ["Breakfast", "Lunch", "Dinner", "Snack", "Random Meal"],
        datasets: [
          {
            data: [totBreakfast, totLunch, totDinner, totSnacks, totRandom],
            backgroundColor: [
              "#29976F",
              "#0AC279",

              "#0FFA8C",
              "#73FAB5",
              "#AFFAD3",
              "#606060"
            ],
            hoverBackgroundColor: [
              "#50977D",
              "#34C28A",

              "#44FAA5",
              "#B2FAD5",
              "#D7FAE8",
              "#00FF80"
            ]
          }
        ]
      }
    });
  }

 `;

  const exampleCode6 = `
 // file: components/auth/LoginModal.js 
   import GoogleLogin from "react-google-login";
   
   // class property called by GoogleLogin button
    async responseGoogleLogin(res) {
    await this.props.oauthGoogle(res.accessToken);
  }


  // button rendered in return statement of loginModal component
  <GoogleLogin
  clientId="820113117620-
  o2qt448u2if1mim4l4p7bg1rnno0gp5s.apps.googleusercontent.com"
  buttonText="Google"
  cookiePolicy={"single_host_origin"}
  onSuccess={this.responseGoogleLogin}
  onFailure={this.responseGoogleLogin}
  className="my-facebook-button-class"
  render={renderProps => (
    <button
    onClick={renderProps.onClick}
    disabled={renderProps.disabled}
    className="login googleLogin"
    >
    {" "}
    <div className="gBox">
    <Image src={googleG} className="googleG" />
    </div>
    <div className="gText">Login With Google</div>
     </button>
    )}
    />                                                        
 `;

  const exampleCode7 = `
 //file: (Redux) Actions/ authActions.js
 
 // action receives login data from front end login modal which it sends via post request to the Express route 
export const oauthGoogle = data => {
  return async dispatch => {
    axios
      .post("/api/auth/oauth/google", { access_token: data })
      .then(res => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.token
        });
      })

      .catch(err => {});
  };
};
 `;

  const exampleCode8 = `
 // file: routes/api/auth.js
const passport = require("passport"); // passport library
const passportConf = require("../../passport"); // passport file
const passportGoogle = passport.authenticate("googleToken", { session: false });
const AuthController = require("../../controllers/auth");

// route which receives a Google access token via the oauthGoogle redux action 
router.post("/oauth/google", passportGoogle, AuthController.googleOAuth);
 `;

  const exampleCode9 = `
 //GOOGLE OAUTH STRATEGY
const passport = require("passport");
const config = require("config");
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-token-google").Strategy; 

passport.use(
  "googleToken",
  new GoogleStrategy(
    {
      clientID: config.oauth.google.clientID,
      clientSecret: config.oauth.google.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        //Check whether this current user exists in our DB
        const existingUser = await User.findOne({ "google.id": profile.id });
        if (existingUser) {
       // done receives errors as its first argument, hence “null” signifies no errors are returned 
          return done(null, existingUser);
        }

        const name = profile.emails[0].value.match(/([^@]+)/);

        //If new account
        const newUser = new User({
          method: "google",
          google: {
            name: name[0],
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

 `;

  const exampleCode10 = `
 //file: controllers/auth.js 
 const JWT = require("jsonwebtoken");
 const config = require("config");

signToken = user => {
  return JWT.sign(
    {
      iss: "GtechSolutions",
      id: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    config.jwtSecret
  );
};
    googleOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

 `;

  const exampleCode11 = `
    axios
      .post("/api/auth/oauth/google", { access_token: data })
      .then(res => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.token
        });
      })
 `;

  const exampleCode12 = `
 // file: reducers/authReducer.js   case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      // was res.data.token in action
      localStorage.setItem("token", action.payload); 

      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        isLoading: false,
        errorMessage: ""
      };
 `;

  const exampleCode13 = `
    // file: components/auth/LoginModal.js
    componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //Check for register errors
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
        store.dispatch(push("/logs"));
      }
    }
  }`;

  const exampleCode14 = `
  //file: routes/api/fatLogs.js
   const express = require("express");
   const router = express.Router();
   const auth = require("../../middleware/auth");


   router.post("/", auth, (req, res) => {
   const username = req.body.username;
   const food = req.body.food;
   const unit = req.body.unit;
   const quantity = req.body.quantity;
   const fat = req.body.fat;
   const date = Date.parse(req.body.date);
   const meal = req.body.meal;
 
   if (!food || !unit || !quantity || !fat || !date || !meal) {
     return res.status(400).json({ msg: "Please enter all fields" });
   }
 
   const newFatLog = new FatLog({
     username,
     food,
     unit,
     quantity,
     fat,
     date,
     meal
   });
 
   newFatLog.save().then(fatLog => res.json(fatLog));
 });
  `;

  const exampleCode15 = `
  //file: actions/fatLogActions.js
  
  import { tokenConfig } from "./authActions";
  import { returnErrors } from "./errorActions";
  export const addFatLog = (fatLog, getState) => dispatch => {
  axios
    .post("/api/fatLogs", fatLog, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_FATLOG,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "ADD_FATLOG_FAIL")
      )
    );
};

  // file: actions/authActions.js
  
  // Setup config/headers and token
   export const tokenConfig = getState => {
  //Get token from localstorage
   const token = localStorage.getItem("token"); // in old version used:
  //const token = store.getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

  `;

  const exampleCode16 = `
  // file: auth.js middleware 
  const config = require("config");
  const jwt = require("jsonwebtoken");

  function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //Add user from payload
    req.user = decoded;

    next();
  } catch (e) {
    res.redirect("/");
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
  `;

  const exampleCode17 = `
  // file: helpers/routeHelpers.js
  const Joi = require("joi");

module.exports = {
  validateBody: schema => {
    return (req, res, next) => {
      const result = schema.validate(req.body);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },

  schemas: {
    usersSchema: Joi.object().keys({
      name: Joi.string(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(12),
      confirm_password: Joi.string()
        .valid(Joi.ref("password"))
        .messages({ "any.only": "Passwords do not match" })
    })
  }
};


// file: actions/authActions.js
export const register = ({
  name,
  email,
  password,
  confirm_password
}) => dispatch => {
  //Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //Request body
  const body = JSON.stringify({ name, email, password, confirm_password });

  axios
    .post("/api/users", body, config)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
    })

    .catch(err => {
      if (err.response.data.details) {
        dispatch(
          returnErrors(
            err.response.data.details[0].message,
            null,
            "REGISTER_FAIL"
          )
        );
        dispatch({ type: REGISTER_FAIL, payload: "Registration failed" });
      } else {
        dispatch(returnErrors(err.response.data.error, null, "REGISTER_FAIL"));
        dispatch({ type: REGISTER_FAIL, payload: "Registration failed" });
      }
    });
};
  `;

  const exampleCode18 = `
//file: ReduxCustMiddleware/tokenCheck.js

const checkTokenExpirationMiddleware = store => next => action => {
    const token = localStorage.getItem("token");
    if (token && jwt_decode(token).exp < Date.now() / 1000) {
      next(action);
      localStorage.clear();
      console.log("token middleware was fired");
      store.dispatch(logout());
    }
    next(action);
  };
  
  export default checkTokenExpirationMiddleware;



  // file: store.js

  const middleware = [tokenCheck, thunk, routerMiddleware(history)];
  const enhancer = compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
  const store = createStore(connectRouter(history)(rootReducer), enhancer);
  
  export default store;
`;

  return (
    <div className="diaryEntryBox">
      <Link to={"/"} className="homeLink">
        Home
      </Link>
      <h1 style={{ color: "#1bcf87" }}>
        <strong>Fat Hacker</strong>
      </h1>
      <br />
      <a target="_blank" href="https://fathacker.herokuapp.com/">
        <div className="finalAppBox">
          <img className="finalApp" src={fathackerApp} />
        </div>
      </a>
      <div className="fatAnchorBox">
        <a href="/fatHacker#intro" className="fatAnchor">
          Intro
        </a>
        <a href="/fatHacker#summary" className="fatAnchor">
          App Summary
        </a>
        <a href="/fatHacker#frontEnd" className="fatAnchor">
          Coding Concepts: Front-End
        </a>
        <a href="/fatHacker#backEnd" className="fatAnchor">
          Coding Concepts: Back-End
        </a>
        <a href="/fatHacker#visual" className="fatAnchor">
          Visual Design
        </a>
        <a href="/fatHacker#lessons" className="fatAnchor">
          Lessons Learned
        </a>
        <a href="/fatHacker#improve" className="fatAnchor">
          Room For Improvement
        </a>
      </div>
      <br />
      <br />
      <a target="_blank" href="https://fathacker.herokuapp.com/">
        VIEW APP
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a
        target="_blank"
        href="https://github.com/Gabehaus/FatHackerPassportBackend"
      >
        VIEW CODE
      </a>
      <br />
      <h2 id="summary">Introduction</h2>
      <p>
        I created all elements of this app myself using React, Redux, and
        Express. I referenced a MERN tutorial series by Brad Traversy (on
        creating a shopping list) which can be found{" "}
        <a
          href="https://www.youtube.com/watch?v=PBTYxXADG_k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE"
          target="_blank"
        >
          here,{" "}
        </a>
        and a tutorial series on API authentication using Node.js found{" "}
        <a
          href="https://www.youtube.com/watch?v=PBTYxXADG_k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE"
          target="_blank"
        >
          here.
        </a>
        <br />
        <br />
        All of the following notes in this diary entry are original. I apologize
        if my attempt to explain my code does not use standard industry jargon.
      </p>
      <br />
      <br />
      <h2 id="summary">App Summary</h2>
      <p>
        This app provides a user with a password protected, json-web-token
        protected user account. Users may store two sets of data in a MongoDB
        database: <br />
        <br />
        1. personal health data <br />
        2. logs of what a person has eaten and the fat content of each entry
        <br />
        <br />
        The user’s personal health data is then used to calculate either the
        total amount of calories they must consume each day to either maintain
        their weight (BMR), or how many daily calories are needed to lose ten
        pounds. This is calculated using the{" "}
        <strong>Harris - Benedict Equation:</strong>
        <code className="greenCode">
          <br />
          <br />
          For men: BMR = ((10 × weight in kg) + (6.25 × height in cm) - (5 × age
          in years) + 5) x activity factor
        </code>
        <br />
        <br />
        <code className="greenCode">
          For women: BMR = ((10 × weight in kg) + (6.25 × height in cm) - (5 ×
          age in years) - 161) x activity factor
        </code>
        <br />
        <br />
        Ten percent of total daily calories is then converted into grams of fat.
        This is the total amount of fat a person is advised to consume over the
        course of a day.
        <br />
        <br />
        This total daily fat allowance is then displayed within a gauge chart
        using the "react-chartjs-2" library. As a user records their fat
        consumption over the course of a day, this is reflected within the gauge
        display as the percent of their daily allowance which has been consumed.
        <br />
        <br />
        <div className="clockBackgroundBox1">
          <img className="clockBackground" src={fathackerGuage1} />
        </div>
        <br />
        <br />
        Fat consumption is recorded via fat consumption logs. A fat consumption
        log input field is contained within a modal, and users can use a search
        field that connects to a national database built by edamam.com which
        returns fat content per unit of food for 700,000+ foods.
        <br />
        <br />
        <div className="clockBackgroundBox2">
          <img className="clockBackground" src={fathackerSearch1} />
        </div>
        <br />
        <br />
        Users can then access three additional graphs displaying fat consumption
        metrics: <br />
        <br />
        1. A bar graph showing their fat consumption each day of the past seven
        days. <br />
        <br />
        <div className="clockBackgroundBox1">
          <img className="clockBackground" src={fatGraph1} />
        </div>
        <br />
        <br />
        2. A bar graph showing fat consumption averages per week for the last
        seven weeks. <br />
        <br />
        <div className="clockBackgroundBox1">
          <img className="clockBackground" src={fatGraph2} />
        </div>
        <br />
        <br />
        3. A pie graph showing average fat consumption per meal over the last
        seven days
        <br />
        <br />
        <div className="clockBackgroundBox1">
          <img className="clockBackground" src={fatGraph3} />
        </div>
      </p>
      <br />
      <br />
      <h2 id="frontEnd">Main Code Concepts: Front-End</h2>
      <br />
      <br />
      <ul>
        <li>
          <h3>How user health data is received and processed: </h3>
          <br />
          <p>
            Users enter their DOB, sex, height, weight, goal, and activity level
            via Bootstrap select fields.
            <br />
            <br />
            <div className="clockBackgroundBox1">
              <img className="clockBackground" src={fatHealthData} />
            </div>
            <br />
            <br />- DOB is converted to age in years using the Moment.js
            library: <br />
            <code className="greenCode">
              {" "}
              const age = moment().diff(healthData.healthData.age, "years");{" "}
            </code>
            <br />
            <br />- Height is selected from a long list of strings showing
            height in feet and inches and a corresponding metric value:
            <br />
            <br />
            example - ‘6’5’’/ 195.5cm’
            <br />
            <br />I used a javascript regex .match() search to harvest the
            centimeter units:
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
            Weight was converted from pounds to kgs using the “convert-units”
            library:
            <br />
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
            Activity level was converted from a string option to a numerical
            value:
            <br />
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
            <br />
            <br />
            After preparing all necessary variables, BMR is calculated using the
            above equation. Recommended fat consumption per day should equal 10%
            of BMR which is then converted from calories to grams of fat.
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode4}
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
          </p>
        </li>
        <li>
          <h3>Fat Logs - graphing fat consumption totals </h3>
          <br />
          <p>
            Fat consumption logs contain the food eaten, unit of measurement,
            number of units, fat content in grams, the meal at which the food
            was consumed, and a date. Logs are stored in a MongoDB database. The
            graphs used to display fat consumption data all use similar
            combinations of .filter() to search through fat logs, .reduce() to
            sum fat consumption on different days or at different meals, and the
            Moment.js library to adjust all dates and times from UTC (MongoDB
            converts all times to UTC) to local time.
            <br />
            <br />
            <div className="clockBackgroundBox1">
              <img className="clockBackground" src={fatLogInput} />
            </div>
            <br />
            <br />
            Below is an example of how .filter() and .reduce() are used with
            moment.js to calculate fat consumption averages for each meal of the
            day over the last week.
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode5}
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
          </p>
        </li>
      </ul>
      <br />
      <br />
      <h2 id="backEnd">Main Code Concepts: Back-End</h2>
      <br />
      <p>
        The backend of this app was built using Express, Mongoose, and Passport.
        Joi is used for server-side validation of registration input data. JSON
        web tokens are used for authorization.
        <br />
        <br />
        Basic routes are created with Express - /api/users to register,
        /api/auth to login, /api/fatLogs to access fat consumption logs,
        /api/healthData to access health data, and  /api/form for node mailer.{" "}
        <br />
        <br />
        As there are too many routes in this application to cover, I will simply
        explain what happens when a person logs in to the application using
        Google.
        <br />
        <br />
      </p>
      <ul>
        <li>
          <h3>What happens when a user logs in with Gmail: </h3>
          <br />
          <p>
            Users are presented with a “Login with Google” button in the login
            modal of the app. Upon clicking this a class method is called
            (this.responseGoogleLogin). The GoogleLogin button component
            provided by the “react-google-login” library sends a request to
            Google and returns an access token as a response. This token is then
            taken as an argument by the class property
            “responseGoogleLogin(res)” which calls the
            oauthGoogle(res.accessToken) action in the Redux authActions.js
            file.
            <br />
            <br />
            <div className="clockBackgroundBox1">
              <img className="clockBackground" src={loginGoogle} />
            </div>
            <br />
            <br />
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode6}
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
            In the oauthGoogle action the Google access token is sent via post
            request to an Express route "/api/auth/oauth/google"
            <br />
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode7}
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
            This route uses passport for authentication. Passport uses
            passport.authenticate which calls a “Google Oauth” strategy in
            passport.js. Then AuthController.googleOAuth is called from within
            the controllers/auth.js file
            <br />
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode8}
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
            The Google Oauth strategy uses the clientID and clientSecret stored
            in a config file to authenticate the google access token. When the
            access token is verified the user's profile is returned, containing
            an id which is used to search for the current user in the MongoDB
            database. If no account exists, it creates one. After finding or
            creating a user the user is returned via a "done" callback function
            provided by Node.js.
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode9}
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
            In this controller file a json web token is created using the id
            stored in req.user - the user returned in the done callback of the
            google oauth strategy. This token is locked with a secret stored in
            a config file. This secret can be used to read the token at a later
            date. The token is returned by the route, and is received as a
            response by the redux action call to the "/api/auth/oauth/google"
            route.
            <br />
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode10}
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
            The oauthGoogle redux action sends the token as a payload to the
            redux reducer “authReducer.js”
            <br />
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode11}
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
            This reducer saves the token to local storage in a switch statement.
            It then changes the state variable “isAuthenticated” to true. This
            variable signifies that the user has been logged in. We check for
            this in the loginModal component using componentDidUpdate(). Once
            this variable is found to be true, the user is directed to the
            “/logs” url using the push method provided by
            “connected-react-router”
            <br />
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode12}
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
            side note - in the following loginModal component,
            store.dispatch(push(“your url here”)) is provided by
            connected-react-router which requires that a history object is
            passed to connected-react-router’s “routerMiddleware” in the Redux
            store.
            <br />
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode13}
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
          </p>
        </li>
        <li>
          <h3>JSON web token authorization </h3>
          <br />
          <p>
            This app uses json web tokens to protect routes. Tokens are stored
            in local storage. Express routes are protected by adding an “auth”
            argument within route syntax that calls an auth middleware file.
            <br />
            <br />
            In this example a post route is created to post fat consumption logs
            to a MongoDB database.
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode14}
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
          </p>

          <p>
            Post requests are made to this route from a redux action,
            "addFatLog". Within this action an axios post request is made which
            calls another redux action called "tokenConfig(getState)"" that gets
            the json web token from local storage and attaches it to a header
            which will be used in the subsequent post request.
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode15}
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
          </p>
          <p>
            When the post route receives a request with a json web token
            attached to a header, the auth.js middleware verifies the token
            using the jwt.verify() method from the node-jsonwebtoken library,
            which checks the “jwtSecret” imported from a config file. If the
            token is invalid, an error response is sent. Otherwise the post is
            authorized and proceeds.
            <br />
            <br />
            side note: the auth.js middleware decodes the token and returns the
            information stored inside the token as “req.user”. This is returned
            and can be sent as a payload to the redux auth store upon calling of
            a redux “load user” action. This payload of information stored in
            the json web token is stored in a redux reducer state variable
            “user” and contains the user’s name and id which can be accessed for
            further use in React front end components.
            <figure>
              <pre>
                <Highlight
                  {...defaultProps}
                  code={exampleCode16}
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
          </p>
        </li>
      </ul>
      <br />
      <br />
      <h2 id="visual">Visual Design</h2>
      <br />
      <p>
        This app was styled using a combination of Bootstrap (reactstrap) and
        custom styling. To make the homepage of the app more interesting I used
        Photoshop and Adobe Illustrator to cut out images of fruits and
        vegetables and imported them as pngs. <br />
      </p>
      <br />
      <br />
      <h2 id="lessons">Lessons Learned</h2>
      <br />
      <ul>
        <li>
          <h3>Using moment.js with MongoDB</h3>
          <br />

          <p>
            I struggled to figure out how to use the moment.js library to handle
            incoming MongoDB dates and times. It took some detailed reading of
            both the moment.js and MongoDB docs to realize that MongoDB converts
            all dates and times to UTC and returns them with a stamp signifying
            this ("+00:00"). Because this stamp is attached to all dates
            returned from the database, when inputting these dates inside a
            moment.js object, Moment(“enter date and time here”), moment
            converts times from UTC time to a user’s current time zone.{" "}
          </p>
        </li>
        <li>
          <h3>
            Accessing and displaying errors upon server-side validation of
            registration data
          </h3>
          <br />

          <p>
            Neither MERN tutorial I consulted explained how to complete
            serverside validation and send validation errors to the Redux store
            for display. I found I could use the Joi library for validation of
            user data but the Joi documentation was not clearly written and I
            ended up having to read through pages of posts on Stack Exchange to
            find the appropriate syntax to require that "password" and
            "confirm_password" matched.
            <br />
            <br /> Another problem was that I could not seem to figure out how
            to locate returned errors. I eventually learned that Joi returns
            errors as a response to the Axios post request that sends
            registration data to the registration post route. It turns out that
            "err.response" is the Axios error object. After printing this object
            to the console I was able to pinpoint
            "err.response.data.details[0].message" as the exact location of Joi
            validation errors.{" "}
          </p>
          <figure>
            <pre>
              <Highlight
                {...defaultProps}
                code={exampleCode17}
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
          <h3>Handling expired JSON web tokens</h3>
          <br />

          <p>
            Neither MERN tutorial I consulted explained how to handle expired
            JSON web tokens either. After reading through a handfull of posts on
            Stack Overflow and several blog posts, I decided to create a
            middleware file that could be called in the Redux store. It is my
            understanding that this enables json web tokens to be checked before
            each and every Redux action is called.
          </p>
          <figure>
            <pre>
              <Highlight
                {...defaultProps}
                code={exampleCode18}
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
        <br />
        <br />
      </ul>
      <h2 id="improve">Room For Improvement</h2>
      <br />
      <br />
      <p>
        This was the first time I used Bootstrap styling extensively. I found
        Bootstrap modals and form elements to be very helpful but I ended up
        choosing to deviate from the Bootstrap positioning syntax as I felt I
        had more control using regular CSS. Unfortunately this became
        complicated because Bootstap adds automatic styling to many elements
        that must be overwritten by adding "important!" to styling in CSS files.
        It was not always clear what styling required "important!" so I may have
        added this in more classes than were necessary.
        <br />
        <br />I also struggled to format screen display layout for all screen
        sizes. Buttons proved to be particularly challenging to format correctly
        on all screens. I especially struggled to add tiny svg and png icons to
        buttons and style them so that said images were always vertically and
        horizontally centered. I felt as though certain styling rules in CSS
        were unclear when dealing with tiny images inside tiny nested divs.
      </p>
      <br />
      <br />
      I have also not yet implemented a loading spinner that spins until all
      images have been pre-loaded and painted to the DOM.
      <br />
      <br />
      Lastly, I am struggling with loading time of the entire app. I am
      currently hosting the app with Heroku. I recently uninstalled all unused
      libraries which reduced loading time from one-minute to under 30 seconds.
      I am now wondering if another problem may be that I am hosting too many
      images locally. I'm unsure if hosting images on an external server like
      Amazon's cloud service may improve loading time. My last effort to speed
      loading time up will be to pay for a better hosting platform.
      <br />
    </div>
  );
}
