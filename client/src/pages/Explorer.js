import axios from "axios";
import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, Link, Navigate, Outlet, useMatch } from "react-router-dom";
import Board from "../components/Board";
import { files } from "../components/foldertree";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

//the explorer component as a while
function Explorer(props) {
  //setting local state for the files..
  //getting the directory from main.
  const [files, setFiles] = useState(props.files || []);

  //using use effect to fetch the directory when the component is rendered

  //function for calling the backend
  const fetchFolders = () => {
    //axios to use HTTP get request for the filesystem data
    axios
      .get("/nas/gather", {
        params: {
          passedPath: props.directory,
        },
      })
      .then((folder) => {
        setFiles(folder.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  //using useEffect to fetch the data once the component has rendered
  useEffect(() => {
    fetchFolders();
  }, []);

  //rendering the tree

  const filesInFolder = files;
  console.log(filesInFolder);

  //return a unordered list
  return (
    <ul className="master-list">
      {/* if state has the file data inside the rendere the following: */}
      {filesInFolder &&
        //create an array with a explorer_node component from the state array
        filesInFolder.map((file) => {
          return file.isFolderBoolean && <Explorer_Node node={file} />;
        })}
      {/* {filesInFolder &&
        filesInFolder.map((file) => {
          const filePath = file.filePath;
          const fileName = filePath.split("/").slice(-1).join(" ");
          return (
            file.isFolderBoolean && (
              <li key={`${filePath} Directory`}>
                {`${fileName}`}
                <Explorer directory={file.filePath} files={file.files} />
              </li>
            )
          );
        })} */}
    </ul>
  );
}

//will be used for viewing the contents of each file
function Explorer_View() {
  return <div className="explorer-view"></div>;
}

const FolderGenerator = () => {
  return <></>;
};

//function for rendering the directory tree
function Explorer_Node({ node }) {
  //create a state variable that acts as a flag for weather the sub folder is visible
  const [filesVisible, setFileVisiblity] = useState(false);

  //check if the node prop has files inside its folder
  const hasChild = node.files ? true : false;

  return (
    //return a list ite,
    <li className="sublist">
      {/* when the div with the arrow is clicked toggle the visiblity */}
      <div
        onClick={(e) => {
          setFileVisiblity((b) => !b);
        }}
      >
        {/* if the folder has files in it then change to active state */}
        {hasChild && <div className={filesVisible ? "active" : ""}> &gt; </div>}
      </div>
      <div>{node.name}</div>

      {/* if there is files in that folder AND the file is visible in the tree
      interate over the items in that folder and only display the folder in the tree */}
      {hasChild && filesVisible && (
        <div>
          <ul>
            {node.files.map((file) => {
              return file.isFolderBoolean && <Explorer_Node node={file} />;
            })}
          </ul>
        </div>
      )}
    </li>
  );
}

export default Explorer;
