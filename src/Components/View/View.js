import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../store/Context";
import { PostContext } from "../../store/PostContext";

import "./View.css";
function View() {
  const [sellerDetails, setSellerDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const sellerId = postDetails.userId;
    firebase
      .firestore()
      .collection("users")
      .where("id", "==", sellerId)
      .get()
      .then((res) => {
        res.forEach((doc) => setSellerDetails(doc.data()));
      });
  }, []);
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={postDetails.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {sellerDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{sellerDetails.username}</p>
            <p>{sellerDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default View;
