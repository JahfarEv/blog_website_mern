
// const bcrypt = require("bcrypt");
// const JWT = require('jsonwebtoken')

//  const hashString = async (useValue) => {
//   const salt = await bcrypt.genSalt(10);

//   const hashedpassword = await bcrypt.hash(useValue, salt);
//   return hashedpassword;
// };

// const compareString = async (userPassword, password) => {
//   const isMatch = await bcrypt.compare(userPassword, password);
//   return isMatch;
// };
// function createJWT(id){
//     return JWT.sign({userId:id},process.env.TOKEN_SECRET,{
//         expiresIn:'1d',
//     })
// }
// module.exports ={
//   hashString,
//   compareString,
//   createJWT,
  
// } 

const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');

const hashString = async (useValue) => {
  try {
    if (!useValue) {
      throw new Error("No value provided for hashing.");
    }
    const salt = await bcrypt.genSalt(10);
    console.log('Generated salt:', salt);

    const hashedPassword = await bcrypt.hash(useValue, salt);
    console.log('Hashed password:', hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error in hashString:', error);
    throw error;
  }
};

const compareString = async (userPassword, password) => {
  try {
    const isMatch = await bcrypt.compare(userPassword, password);
    return isMatch;
  } catch (error) {
    console.error('Error in compareString:', error);
    throw error;
  }
};

function createJWT(id) {
  try {
    return JWT.sign({ userId: id }, process.env.TOKEN_SECRET, {
      expiresIn: '1d',
    });
  } catch (error) {
    console.error('Error in createJWT:', error);
    throw error;
  }
}

module.exports = {
  hashString,
  compareString,
  createJWT,
};
