import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imageErr, setImageErr] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loading, setLoading] = useState("");
  const [needAllField, setNeedAllField] = useState("");
  const navigate = useNavigate();
  const date = new Date();
  const handleSubmit = (e) => {
    setLoading(true);
    setImageErr("");
    if (!user) {
      setLoading(false);
      setLoginErr("Login in to create a post");
      return null;
    }
    if (!name || !category || !price) {
      setLoading(false);
      setNeedAllField("* All fields are mandatory");
      return null;
    }
    if (!image) {
      setLoading(false);
      setImageErr("Upload an image to continue");
      return null;
    }
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log(url);
          firebase
            .firestore()
            .collection("products")
            .add({
              name,
              category,
              price,
              url,
              userId: user.uid,
              createdAt: date.toDateString(),
            });
          navigate("/");
        });
      })
      .catch((error) => {
        navigate("/create");
      });
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          {image && (
            <img
              alt="Posts"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            ></img>
          )}

          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          {needAllField && (
            <span style={{ fontSize: 15, color: "red" }}>{needAllField}</span>
          )}
          <br />
          {loading && (
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          <br />
          {imageErr && (
            <span style={{ fontSize: 15, color: "red" }}>{imageErr}</span>
          )}
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
          <br />
          {loginErr && (
            <span style={{ fontSize: 15, color: "red" }}>{loginErr}</span>
          )}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
