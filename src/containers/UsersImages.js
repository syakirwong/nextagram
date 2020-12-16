import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const UsersImages = ({ userId }) => {
  const style = {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    cursor: "pointer",
  };

  const [userImages, updateUserImages] = useState([]);

  let history = useHistory();

  const handleOnClickImage = (id) => {
    history.push(`/image/${id}`);
  };

  useEffect(() => {
    axios
      .get("https://insta.nextacademy.com/api/v2/images", {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
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
                onClick={() => {
                  handleOnClickImage(userImage.id);
                }}
              ></img>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UsersImages;
