export const data = {
  fatCode: [
    {
      code1: `
        //{3} means "3 occurrences”
        const heightInCM = healthData.healthData.height.match(
          /[0-9]{3}\.*[0-9]*/
        );
        `
    },
    {
      code2: `
      const kgs = +convert(this.state.weight)
      .from("lb")
      .to("kg")
      .toFixed(2);
      `
    },
    {
      code3: `
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
      `
    },
    {
      code4: `
      // 10% of BMR 
    var caloriesAllowed = BMRnumber * 0.1;
    
    //1 gram of fat contains nine calories
    var fatAllowed = (caloriesAllowed / 9).toFixed(2);
      `
    },
    {
      code5: `
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

      `
    },
    {
      code6: `
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
      `
    },
    {
      code7: `
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
      `
    },
    {
      code8: `
      // file: routes/api/auth.js
const passport = require("passport"); // passport library
const passportConf = require("../../passport"); // passport file
const passportGoogle = passport.authenticate("googleToken", { session: false });
const AuthController = require("../../controllers/auth");

// route which receives a Google access token via the oauthGoogle redux action 
router.post("/oauth/google", passportGoogle, AuthController.googleOAuth);
      `
    },
    {
      code9: `
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

      `
    },
    {
      code10: `
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

    `
    },
    {
      code11: `
      axios
      .post("/api/auth/oauth/google", { access_token: data })
      .then(res => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data.token
        });
      })
      `
    },
    {
      code12: `
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
    `
    },
    {
      code13: `
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
  }
      `
    },
    {
      code14: `
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
      `
    },
    {
      code15: `
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
      `
    },
    {
      code16: `
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
      `
    },
    {
      code17: `
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
      `
    },
    {
      code18: `
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
      `
    }
  ]
};
