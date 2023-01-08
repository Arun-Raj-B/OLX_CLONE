import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";
function Header() {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to={"/"}>
            <OlxLogo></OlxLogo>
          </Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            {user ? `Welcome ${user.displayName}` : "Login"}
          </span>
          <hr />
        </div>
        {user && (
          <div className="logout">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                firebase.auth().signOut();
                navigate("/");
              }}
            >
              Logout
            </span>
            <hr />
          </div>
        )}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span onClick={() => navigate("/create")}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
