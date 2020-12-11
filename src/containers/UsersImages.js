import { useState, useEffect } from "react";
import axios from "axios";

const UsersImages = ({ userId }) => {
  const style = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
  };

  const [userImages, updateUserImages] = useState([]);

  //   console.log(userId);

  useEffect(() => {
    axios
      .get("https://insta.nextacademy.com/api/v2/images", {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        // console.log(response);
        updateUserImages(response.data);
      });
  }, [userId]);

  return (
    <>
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
    </>
  );
};

export default UsersImages;
