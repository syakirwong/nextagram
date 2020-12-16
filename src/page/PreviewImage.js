import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

const PreviewImage = ({ jwt }) => {
  const match = useParams();
  const [selectedImage, setSelectedImage] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [likedImageState, setLikedImageState] = useState(null);

  const style = {
    display: "block",
    margin: "auto",
    height: "400px",
  };

  const getImageData = async () => {
    try {
      const response = await axios.get(
        `https://insta.nextacademy.com/api/v2/images/${match.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      // console.log(response.data);

      setSelectedImage({ ...selectedImage, ...response.data });
    } catch (error) {
      console.error(error.response);
    }
  };

  const getImageComments = async () => {
    try {
      const response = await axios.get(
        `https://insta.nextacademy.com/api/v1/images/${match.id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      //   console.log(response.data);
      setComments(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleUndefined = () => {
    if (selectedImage.likes === undefined) {
      return <div></div>;
    } else {
      return <div>{selectedImage.likes.length} user liked this image.</div>;
    }
  };

  const handleLikeButton = async (id) => {
    try {
      const response = await axios.post(
        `https://insta.nextacademy.com/api/v1/images/${id}/toggle_like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response);
      setLikedImageState(!likedImageState);
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleSubmitComment = (id) => async (e) => {
    e.preventDefault();

    if (submitDisabled) {
      return;
    } else {
      try {
        const response = await axios.post(
          `https://insta.nextacademy.com/api/v1/images/${id}/comments`,
          {
            content: commentInput,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        console.log(response);
        setCommentInput("");
      } catch (error) {
        console.error(error.response);
      }
    }
  };

  const handleCommentInput = (e) => {
    // console.log(e.target.value);
    setCommentInput(e.target.value);
  };

  const handleLikeComment = async (id) => {
    try {
      const response = await axios.post(
        `https://insta.nextacademy.com/api/v1/comments/${id}/toggle_like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    getImageData();
    getImageComments();
    if (commentInput === "") {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
    console.log(likedImageState);
  }, [commentInput, likedImageState]);

  return (
    <div className="container">
      <img
        src={`${selectedImage.url}`}
        alt="selectedImage"
        style={style}
        className="border border-dark mb-1"
      />
      <div className="d-flex justify-content-between">
        {handleUndefined()}
        <Button
          onClick={() => {
            handleLikeButton(selectedImage.id);
          }}
          color="primary"
        >
          Like
        </Button>{" "}
      </div>
      <Form onSubmit={handleSubmitComment(selectedImage.id)}>
        <Label for="exampleText">Add Comment</Label>

        <FormGroup className="comment-form">
          <Input
            type="text"
            name="text"
            id="exampleText"
            onChange={handleCommentInput}
            value={commentInput}
            className="comment-input"
          />
          <Button
            onClick={handleSubmitComment(selectedImage.id)}
            disabled={submitDisabled}
            style={{ height: "40px" }}
          >
            Post
          </Button>
        </FormGroup>
      </Form>
      <div>
        {comments.map((comment) => {
          return (
            <div
              className="d-flex justify-content-between alignt-items-center"
              key={comment.id}
            >
              <p
                key={comment.id}
                id={comment.id}
                style={{ cursor: "pointer" }}
                className="border -border-dark mt-3"
              >
                {comment.content}
              </p>
              <Button
                onClick={() => {
                  handleLikeComment(comment.id);
                }}
                style={{ height: "40px" }}
              >
                Like
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PreviewImage;
