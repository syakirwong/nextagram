import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

const ProfilePage = () => {
  const userId = useParams();
  const [userImages, updateUserImages] = useState([]);
  const [userDetails, updateUserDetails] = useState([]);
  //   console.log(userId);
  const style = {
    height: "300px",
    width: "100%",
    objectFit: "cover",
  };

  useEffect(() => {
    axios
      .get("https://insta.nextacademy.com/api/v2/images", {
        params: {
          userId: userId.id,
        },
      })
      .then((response) => {
        // console.log(response.data);
        updateUserImages(response.data);
      });
  }, [userId.id]);

  useEffect(() => {
    axios
      .get(`https://insta.nextacademy.com/api/v1/users/${userId.id}`)
      .then((response) => {
        console.log(response.data);
        updateUserDetails(response.data);
      });
  }, [userId.id]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-sm-3">
            <img
              src={userDetails.profileImage}
              alt={userDetails.profileImage}
              style={{ width: "100%" }}
            ></img>
          </div>
          <div className="col-6">
            <h2>{userDetails.username}</h2>
          </div>
        </div>

        <div className="row">
          {userImages.map((userImage) => {
            return (
              <div className="col-sm-4 mb-2" key={userImage.id}>
                <img
                  style={style}
                  src={userImage.url}
                  alt={userImage.url}
                  key={userImage.id}
                ></img>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
