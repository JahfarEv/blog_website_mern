import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const hashedToken = async (useValue) => {
  const salt = await bcrypt.genSalt(10);

  const hashedpassword = await bcrypt.hash(password, salt);
  return hashedpassword;
};

export const compareString = async (userPassword, password) => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};
export function createJWT(id){
    return JWT.sign({userId:id},process.env.TOKEN_SECRET,{
        expiresIn:'1d',
    })
}