//tell the user that the files have been uploaded
const fileUpload = (req, res) => {
  console.log(req.files);
  res.send("images have been uploaded");
};

module.exports = { fileUpload };
