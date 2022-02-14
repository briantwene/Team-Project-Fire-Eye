// import { response } from "express";
import React, { useState } from "react";
import { files } from "../components/foldertree";

function Upload() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
    console.log(event.target.files);
    setIsFilePicked(true);
  };

  const handleSUbmission = () => {
    const formData = new FormData();

    for (let i = 0; i < selectedFile.length; i++) {
      formData.append(`File[${i}]`, selectedFile[i]);
    }
    // formData.append('File', selectedFile);

    fetch("/nas/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      });

    // .catch((error)) => {
    //   console.error('Error:', error);
    // }
  };

  return (
    <div>
      {/* <form method="post" enctype="multipart/form-data"> */}
      <input type="file" name="files" onChange={changeHandler} multiple />
      {/* </form> */}
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>

          <p>lastModifiedDate: {selectedFile.lastModifiedDate}</p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={handleSUbmission}>Submit</button>
      </div>
    </div>
  );
}

export default Upload;
