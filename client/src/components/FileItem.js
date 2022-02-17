import React from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import * as FcIcons from "react-icons/fc";
import { iconMap } from "./icons";

function FileItem({ file, set, open }) {
  return (
    <div className="fileItem">
      {file.details.type !== "Folder" ? (
        <div className="fileIcon" onClick={() => open(file)}>
          {iconMap[file.details.type in iconMap ? file.details.type : "other"]}
        </div>
      ) : (
        <div
          className="fileIcon"
          onClick={(e) => {
            set(file.path);
          }}
        >
          <FcIcons.FcFolder />
        </div>
      )}

      <span className="filename">{file.name}</span>
    </div>
  );
}

export default FileItem;
