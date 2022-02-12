const { collectFiles } = require("../services/access");
const path = require("path");
const dotenv = require("dotenv");
const nasPath = process.env.addr;

// controller for first entry to the app
const requestBaseFile = async (req, res) => {
  //get the entry point to the storage that user requested
  const files = await collectFiles(nasPath).catch((e) => {
    console.log(`there was an error: ${e}`);
  });

  //send the file to the user
  res.send(files);
};

//controller for when the user is requesting a folder
const requestFolder = async (req, res) => {
  
  const { passedPath } = req.query;
  console.log(req.query);

  //get the files in the folder
  const FolderContents = await collectFiles(passedPath)
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

//for creating

//add function names in the braces
module.exports = { requestFolder, requestBaseFile };
