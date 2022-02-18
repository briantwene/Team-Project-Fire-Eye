import axios from "axios";
import React from "react";
import { saveAs } from "file-saver";
import bytes from "bytes";
import * as FaIcons from "react-icons/fa";

function FileInfo({ file, setModal }) {
  const download = (file = "", name = "", type = "") => {
    axios
      .get("/nas/download", {
        params: {
          filePath: file,
        },
        responseType: "blob",
      })
      .then(({ data }) => {
        saveAs(data, `${name}.${type}`);
      });
  };
  return (
    <div
      className="fileInfo-container"
      onClick={() => {
        setModal();
      }}
    >
      <div className="fileInfo">
        <table>
          <tr>
            <th>Name:</th>

            <td>{file.name}</td>
          </tr>
          <tr>
            <th>Full Path:</th>

            <td>{file.path}</td>
          </tr>
          <tr>
            <th>Date Modified:</th>

            <td>{new Date(file.details.time).toLocaleDateString}</td>
          </tr>
          <tr>
            <th>Size:</th>
            <td>{bytes(file.details.size)}</td>
          </tr>
          <tr>
            <th>Type:</th>
            <td>.{file.details.type}</td>
          </tr>
        </table>
        <button
          className="download"
          onClick={() => {
            download(file.path, file.name, file.details.type);
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default FileInfo;
