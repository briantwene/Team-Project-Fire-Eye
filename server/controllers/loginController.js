const {loginUser} = require("../services/userLogin")


exports.updateLogin = async(req, res) =>{
    const result = await loginUser("brian", "fireeye123")
    
    res.send(result)
}