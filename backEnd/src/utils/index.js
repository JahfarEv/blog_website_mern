
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken')

 const hashedToken = async (useValue) => {
  const salt = await bcrypt.genSalt(10);

  const hashedpassword = await bcrypt.hash(password, salt);
  return hashedpassword;
};

const compareString = async (userPassword, password) => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};
function createJWT(id){
    return JWT.sign({userId:id},process.env.TOKEN_SECRET,{
        expiresIn:'1d',
    })
}
module.exports ={
  hashedToken,
  compareString,
  createJWT
} 