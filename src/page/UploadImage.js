import { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, FormText } from "reactstrap";
import axios from "axios";
import LivePreview from "../containers/LivePreview";

const UploadImage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let JWT = localStorage.getItem("jwt");

    let formData = new FormData();
    formData.append("image", imageFile);

    axios
      .post("https://insta.nextacademy.com/api/v1/images/", formData, {
        headers: { Authorization: `Bearer ${JWT}` },
      })
      .then((response) => {
        if (response.data.success) {
          setMessage("Image Uploaded Successfully!");
          setPreviewImage(null);
          setImageFile(null);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleFileInput = (e) => {
    console.log(e.target.files);
    setImageFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    handleFormValidation();
  });

  const handleFormValidation = () => {
    if (imageFile !== null) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  return (
    <>
      <div className="container">
        <h3 className="my-3">Upload New Image</h3>
        <Form onSubmit={handleFormSubmit}>
          <FormGroup>
            <Input
              id="file"
              type="file"
              name="file"
              className="inputfile"
              onChange={handleFileInput}
              multiple={false}
            />
            <label htmlFor="file" className="px-3 py-2 rounded-pill">
              Choose a file
            </label>

            <FormText color="muted">
              Make sure the image being uploaded is a supported format.
            </FormText>
          </FormGroup>
          <LivePreview
            previewImage={previewImage}
            message={message}
            isLoading={isLoading}
          ></LivePreview>

          <Button
            type="submit"
            color="info"
            disabled={isDisabled}
            className="mt-3"
          >
            Upload
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UploadImage;
