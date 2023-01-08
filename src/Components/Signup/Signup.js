import React, { useState, useContext } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../store/Context";
import { Link } from "react-router-dom";
import Logo from "../../olx-logo.png";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [signupErr, setSignupErr] = useState(false);
  const { firebase } = useContext(FirebaseContext);
  const [loading, setLoading] = useState("");
  let result1;
  // const dispatch = useDispatch();

  // const firebase = useSelector((state) => state.firebase);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSignupErr(false);
    setLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result1 = result;
        result.user.updateProfile({ displayName: username });
      })
      .then(() => {
        firebase
          .firestore()
          .collection("users")
          .add({
            id: result1.user.uid,
            username: username,
            phone: phone,
          });
      })
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
        setSignupErr(error.message);
      });
    // console.log(firebase);
    // dispatch(signup({ username, email, phone, password }));
  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            name="name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            value={phone}
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {loading ? (
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : null}
          {signupErr ? (
            <span style={{ fontSize: 12, color: "red" }}>{signupErr}</span>
          ) : null}

          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link style={{ color: "black" }} to={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
}
