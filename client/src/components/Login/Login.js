import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../UI/Buttons/Button";
import { useDispatch, useStore } from "react-redux";
import { loginAction } from "../../container/action";
import "./Login.css";

export default function Login(props) {
  let history = useHistory();
  let adminAccess = {
    id: "admin123",
    name: "admin",
    pass: "admin",
  };
  const [isAdmin, setIsAdmin] = useState(false);
  //Input storing handlers
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [adminId, setAdminId] = useState("");

  //userReference number
  const [userRno, setUserRno] = useState("");
  //Input state validity
  const [unameValidity, setUnameValidity] = useState(null);
  const [passValidity, setpassValidity] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [adminIdValidity, setAdminIdValidity] = useState(null);
  const [userRnoValidity, setUserRnoValidity] = useState(null);

  //UseDispatch

  const dispatch = useDispatch();
  const store = useStore();

  /*   const [adminPage, setAdminPage] = useState(false);
  const [adminAuth, setAdminAuth] = useState(false); */

  /*   useEffect(() => {
    if (adminAuth === true) {
      setAdminPage(true);
      console.log("true");
    } else {
      setAdminPage(false);
    }
  }, [adminAuth, setAdminPage]); */

  //Handler functions
  //Input handlers
  //Admin
  const adminIdInputHandler = (e) => {
    setAdminId(e.target.value);
  };
  //User
  const userRnoInputHandler = (e) => {
    setUserRno(e.target.value);
  };
  const nameInputHandler = (e) => {
    setUname(e.target.value);
  };
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };
  //Validity handler
  //Admin
  const adminIdValidityHandler = () => {
    if (adminId.trim() === "") {
      setAdminIdValidity(false);
      setErrorMessage("AdminId not valid!");
    } else {
      setAdminIdValidity(true);
      setErrorMessage("");
    }
  };
  //User
  const userRnoValidityHandler = () => {
    if (userRno.trim() === "") {
      setUserRnoValidity(false);
      setErrorMessage("User Identification number not valid!");
    } else {
      setUserRnoValidity(true);
      setErrorMessage("");
    }
  };
  const nameValidityHandler = () => {
    if (uname.trim() === "" || /\d/.test(uname)) {
      setUnameValidity(false);
      setErrorMessage("Username cannot contain digits or be empty!");
    } else {
      setUnameValidity(true);
      setErrorMessage("");
    }
  };
  const passwordValidityHandler = () => {
    if (password.trim() === "") {
      setpassValidity(false);
      setErrorMessage("Password field cannot be empty!");
    } else {
      setpassValidity(true);
      setErrorMessage("");
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (isAdmin) {
      if (unameValidity && passValidity && adminIdValidity) {
        if (
          adminId === adminAccess.id &&
          uname === adminAccess.name &&
          password === adminAccess.pass
        ) {
          props.setAuth(true);
          history.push("/admin");
        } else {
          setErrorMessage("Incorrect credentials!");
        }
      } else {
        setErrorMessage("Form not valid yet! Try again!");
      }
    } else {
      if (unameValidity && passValidity && userRnoValidity) {
        /* const patientCred = {
          key: "1231412452",
          name: "solwing",
          password: "hello123",
        }; */
        props.userKey(userRno);

        const patientLogin = dispatch(
          loginAction({ key: userRno, name: uname, password })
        );

        patientLogin
          .then((data) => {
            props.setAuth(true);
            history.push(`/user/${data.key}`);
          })
          .catch((error) => {
            setErrorMessage(error.err.err);
            console.log(error.err.err);
          });
      }
    }
  };

  return (
    <div>
      <div className="auth-choice-container">
        <h4>I am a / an ,</h4>
        <div>
          <button
            onClick={() => {
              setIsAdmin(true);
              setErrorMessage("");
            }}
          >
            Admin <i className="fas fa-user-lock"></i>
          </button>
          <button
            onClick={() => {
              setIsAdmin(false);
              setErrorMessage("");
            }}
          >
            User <i className="fas fa-user"></i>
          </button>
        </div>
      </div>
      <form onSubmit={formSubmitHandler}>
        <fieldset className="login-fieldset">
          <legend>{isAdmin ? "Admin" : "User"}</legend>
          {!isAdmin ? (
            <div className="userref-container">
              <label
                htmlFor="userref"
                id="user-ref-label"
                onClick={() => {
                  alert("Your unique reference number/Mobile Number:");
                }}
                style={{
                  color: `${userRnoValidity !== false ? "black" : "red"}`,
                }}
              >
                User Reference No:{" "}
              </label>
              <input
                type="text"
                id="userref"
                name="userref"
                onChange={userRnoInputHandler}
                onBlur={userRnoValidityHandler}
                style={{
                  outlineColor: `${
                    userRnoValidity !== false ? "black" : "salmon"
                  }`,
                }}
              />
              <br />
            </div>
          ) : (
            <div className="adminid-container">
              <label
                htmlFor="adminid"
                style={{
                  color: `${adminIdValidity !== false ? "black" : "red"}`,
                }}
              >
                Admin Access ID:
              </label>
              <input
                type="password"
                id="adminid"
                name="adminid"
                onChange={adminIdInputHandler}
                onBlur={adminIdValidityHandler}
                style={{
                  outlineColor: `${
                    userRnoValidity !== false ? "black" : "salmon"
                  }`,
                }}
              />
              <br />
            </div>
          )}
          <div className="username-container">
            <label
              htmlFor="uname"
              style={{ color: `${unameValidity !== false ? "black" : "red"}` }}
            >
              Username:
            </label>
            <input
              type="text"
              id="uname"
              name="uname"
              onChange={nameInputHandler}
              onBlur={nameValidityHandler}
              style={{
                outlineColor: `${unameValidity !== false ? "black" : "salmon"}`,
              }}
            />{" "}
            <br />
          </div>
          <div className="password-container">
            <label
              htmlFor="pass"
              style={{
                color: `${passValidity !== false ? "black" : "red"}`,
              }}
            >
              Password:
            </label>
            <input
              type="password"
              id="pass"
              name="pass"
              onChange={passwordInputHandler}
              onBlur={passwordValidityHandler}
              style={{
                outlineColor: `${passValidity !== false ? "black" : "salmon"}`,
              }}
            />{" "}
            <br />
          </div>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}

          <Button className="login">Login</Button>
        </fieldset>
      </form>
    </div>
  );
}
