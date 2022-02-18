// import { response } from "express";
import React, { useState } from "react";
const bytes = require("bytes");

function Upload() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files);
    setIsFilePicked(true);
  };

  const handleSUbmission = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("/nas/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setUploadStatus(result.success);
      })
      .catch((e) => {
        console.log(`there was an error: ${e}`);
      });

    // .catch((error)) => {
    //   console.error('Error:', error);
    // }
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {bytes(selectedFile.size)}</p>

          <p>lastModifiedDate: {selectedFile.ModifiedDate}</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSUbmission}>Submit</button>
      </div>
      <div>{uploadStatus}</div>
    </div>
  );
}

export default Upload;
