const LivePreview = ({ previewImage, message }) => {
  return (
    <div className="card">
      {previewImage ? (
        <img
          src={previewImage}
          width="50%"
          height="50%"
          className="d-block mx-auto py-2"
        />
      ) : (
        <h6 className="d-flex align-items-center justify-content-center py-2">
          {message ? message : "Upload a file"}
        </h6>
      )}
    </div>
  );
};

export default LivePreview;
