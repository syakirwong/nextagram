import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const MyProfilePage = ({ jwt }) => {
  const style = {
    height: "300px",
    width: "100%",
    objectFit: "cover",
  };
  const [user, setUser] = useState({});
  const [userImages, setUserImages] = useState([]);
  const [isUploadButton, setIsUploadButton] = useState(true);

  let history = useHistory();

  useEffect(() => {
    axios
      .get(`https://insta.nextacademy.com/api/v1/users/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setIsUploadButton(false);
      })
      .catch((error) => {
        console.log(error.response);
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/");
      });
  }, [jwt]);

  useEffect(() => {
    axios
      .get(`https://insta.nextacademy.com/api/v1/images/me`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })
      .then((response) => {
        console.log(response.data);
        setUserImages(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [jwt]);

  return (
    <>
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-sm-3">
            <img
              src={user.profile_picture}
              alt={user.profile_picture}
              style={{ width: "100%" }}
            ></img>
          </div>
          <div className="col-6">
            <h2>{user.username}</h2>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5>My Image</h5>
          <button
            type="button"
            className="btn btn-outline-info"
            disabled={isUploadButton}
            onClick={() => {
              history.push(`/profile/${user.username}/uploadimage`);
            }}
          >
            Upload Image
          </button>
        </div>

        <div className="row">
          {userImages.map((userImage, index) => {
            return (
              <div className="col-sm-4 mb-2" key={index}>
                <img style={style} src={userImage} alt={userImage}></img>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyProfilePage;
