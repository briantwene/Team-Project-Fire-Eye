const { generateTree, getFiles } = require("../services/access");
const path = require("path");
const dotenv = require("dotenv");
const nasPath = process.env.addr;
const fs = require("fs/promises");
const fs2 = require("fs");

const { response } = require("express");
// controller for first entry to the app
const requestEntryPoint = async (req, res) => {
  const { passedPath } = req.query;
  console.log(req.query);

  //get the entry point to the storage that user requested
  const files = await generateTree(passedPath).catch((e) => {
    console.log(`there was an error: ${e}`);
  });

  //send the file to the user
  res.send(files);
};

//controller for when the user is requesting a folder
const requestFolder = async (req, res) => {
  const { folder } = req.query;
  console.log(req.query);

  //get the files in the folder
  const FolderContents = await getFiles(folder)
    .then((files) => {
      console.log(files);
      return files;
    })
    .catch((e) => {
      console.log(`there was an error ${e}`);
    });
  //send the fontend
  console.log(FolderContents);
  res.send(FolderContents);
};

//for deleting

const removeFile = async (req, res) => {
  const { Files } = req.query;
  try {
    await fs.unlink(Files);
  } catch (e) {
    console.log(e);
    res.send(`There was an error: ${e}`);
  }
  res.send("Success");
};

//for creating

const createFolder = async (req, res) => {
  const { newFolder } = req.query;
  try {
    await fs.mkdir(newFolder);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ fail: `There was an error: ${e}` });
  }
  res.send("New Folder created");
};

//Deleting a folder

const deleteFolder = async (req, res) => {
  const { fileDelete } = req.query;
  try {
    await fs.rmdir(fileDelete);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ fail: `There was an error: ${e}` });
  }
  res.send("Folder deleted");
};

// Downloading a file

// const downloadAny = (req, res) =>{
//   const{response} = req.query;
//   try{
//     const streamD = fs2.createWriteStream(response)
//      res.pipe(streamD)
//   }
//   catch(e){
//     console.log(e)
//     return res.status(400).json({fail: `There was an error: ${e}`})
//   }

// }

const downloadAny = (req, res, next) => {
  console.log("fileController.download: starrted");
  const { response } = req.query;
  try {
    const file = fs2.createReadStream(response);
    const filename = new Date().toISOString();
    res.setHeader("Content-Disposition", 'attachment: filename="' + filename + '"');
    file.pipe(res);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ fail: `There was an error: ${e}` });
  }
};

//add function names in the braces
module.exports = { requestFolder, requestEntryPoint, removeFile, createFolder, deleteFolder, downloadAny };
