//tell the user that the files have been uploaded
const fileUpload = (req, res) => {
  console.log(req.file);
  res.send({ success: "images have been uploaded" });
};

module.exports = { fileUpload };
