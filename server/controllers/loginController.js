const {loginUser} = require("../services/userLogin")


exports.checkLogin = async(req, res) =>{
    const {username, password} = req.query;
    const result = await loginUser(username, password)
    console.log(req.query)
    res.send(result)
}