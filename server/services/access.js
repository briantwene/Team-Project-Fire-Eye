"use strict";
//import modules
const fs = require("fs").promises;
const util = require("util");
const path = require("path");
const dotenv = require("dotenv");
const { resolve } = require("path");
dotenv.config();
//test link for file system
//const address = process.env.addr;

//convert read directory method into one that will return a promise
const isFolder = (filepath) => {
  const isFolder = path.extname(filepath);
  return isFolder === "" ? "Folder" : isFolder;
};
//this code will run asynchronously
const imageDates = async (filepath) => {
  // return new Promise(async (resolve) => {
  //   resolve({
  //     name: path.basename(filepath),
  //     path: filepath,
  //     details: await fs.stat(filepath).then((stat) => {
  //       console.log();
  //       return {
  //         time: stat.mtime,
  //         size: stat.size,
  //       };
  //     }),
  //     type: isFolder(filepath),
  //   });
  // });

  return fs.stat(filepath).then((fileData) => {
    const file = {};
    file.filePath = filepath;
    file.isFileBoolean = fileData.isFile();

    if (file.isFileBoolean) {
      return collectFiles(file.filePath)
        .then((fileNameSub) => {
          file.files = fileNameSub;
        })
        .catch(console.error);
    }
    console.log(file);
    return file;
  });
};

//service function for getting the images out of file that they are in
//the result is then returned to the controller that called it

const collectFiles = async (directoryString) => {
  //read the directory
  const arrayOfFileNameStrings = await fs.readdir(directoryString);

  const fileData = arrayOfFileNameStrings.map(async (fileNameString) => {
    const fullPath = `${directoryString}/${fileNameString}`;
    const fileData = await fs.stat(fullPath);
    let file = {};
    file.filePath = fullPath;
    file.isFolderBoolean = fileData.isDirectory();
    file.name = fullPath.split("/").slice(-1).join(" ");
    /* Here is where we'll do our recursive call */
    //if the file is a folder
    if (file.isFolderBoolean) {
      //call the folder again to get its contents
      file.files = await collectFiles(file.filePath);
    }
    /* End recursive condition */
    return file;
  });
  return Promise.all(fileData);
};

module.exports = { collectFiles };
