import axios from "axios";

import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, Link, Navigate, Outlet, useMatch } from "react-router-dom";
import Board from "../components/Board";
import { files } from "../components/foldertree";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import FileInfo from "./FileInfo";
import { FileIcon, defaultStyles } from "react-file-icon";
import FileItem from "../components/FileItem";
import * as FcIcons from "react-icons/fc";

//the explorer component as a while
function Explorer(props) {
  //setting local state for the files..
  //getting the directory from main.
  const [files, setFiles] = useState(props.files || []);
  const [currentView, setCurrentView] = useState(props.directory);
  const [contents, setContents] = useState([]);
  const [fileModal, setFileModal] = useState({
    file: null,
    isOpen: false,
  });

  const open = (file) => {
    setFileModal(({ isOpen }) => {
      return {
        file: file,
        isOpen: !isOpen,
      };
    });
  };
  const setView = (path) => {
    setCurrentView(path);
  };

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
        console.log(folder.data);
        setFiles(folder.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const fetchPage = () => {
    axios
      .get("/nas/changeDir", {
        params: {
          folder: currentView,
        },
      })
      .then((pageContents) => {
        setContents(pageContents.data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  //using useEffect to fetch the data once the component has rendered
  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    fetchPage();
    fetchPage();
  }, [currentView]);

  //rendering the tree

  const filesInFolder = files;
  console.log(filesInFolder);

  //return a unordered list
  return (
    <>
      <div className="explorer">
        <ul className="explorer_tree">
          {/* if state has the file data inside the rendere the following: */}
          {filesInFolder &&
            //create an array with a explorer_node component from the state array
            filesInFolder.map((file, key) => {
              return file.isFolderBoolean && <ExplorerNode key={key} node={file} setfunc={setView} />;
            })}
        </ul>
        <div className="view-grid-outer">
          <div className="cd-info">
            <ExplorerCrumbs path={currentView} set={setView} />
          </div>

          <div className="view-grid-inner">
            {contents &&
              contents.map((file, key) => {
                return <FileItem key={key} file={file} set={setView} open={open} />;
              })}
          </div>
        </div>
        {fileModal.isOpen && (
          <>
            <FileInfo file={fileModal.file} setModal={open} />
          </>
        )}
      </div>
    </>
  );
}

//will be used for viewing the contents of each file
function Explorer_View({ view }) {
  return <div className="explorer-view">{view}</div>;
}

const ExplorerCrumbs = ({ path, set }) => {
  const splitPath = path.split("/").filter((p) => p);

  const paths = splitPath.map((folder, index) => {
    return {
      folder: folder,
      fullPath: splitPath.slice(0, index + 1).join("/"),
    };
  });

  return (
    <>
      {paths.map((path, index) => {
        return (
          <>
            {index === 0 ? null : <div> {">"} </div>}

            <div className="pathCrumb" onClick={() => set(path.fullPath)}>
              {path.folder}
            </div>
          </>
        );
      })}
    </>
  );
};

//function for rendering the directory tree
function ExplorerNode({ node, setfunc }) {
  //create a state variable that acts as a flag for weather the sub folder is visible
  const [filesVisible, setFileVisiblity] = useState(false);
  console.log(setfunc);
  //check if the node prop has files inside its folder
  const hasChild = node.files ? true : false;

  return (
    //return a list ite,
    <li className="sublist">
      {/* when the div with the arrow is clicked toggle the visiblity */}
      <div
        className="subfolder"
        onClick={(e) => {
          setFileVisiblity((b) => !b);
          setfunc(node.filePath);
        }}
      >
        {/* if the folder has files in it then change to active state */}
        {hasChild && <div className={filesVisible ? "active" : ""}> &gt; </div>}
        <div className="folderName">
          <FcIcons.FcFolder /> <span className="folderName-text"> {node.name}</span>
        </div>
      </div>

      {/* if there is files in that folder AND the file is visible in the tree
      interate over the items in that folder and only display the folder in the tree */}
      {hasChild && filesVisible && (
        <div className="subtree-container">
          <ul className="subtree">
            {node.files.map((file) => {
              return file.isFolderBoolean && <ExplorerNode node={file} setfunc={setfunc} />;
            })}
          </ul>
        </div>
      )}
    </li>
  );
}

export default Explorer;
