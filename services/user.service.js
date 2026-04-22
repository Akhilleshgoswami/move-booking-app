const User = require("../models/user.model")

const createUser = async (data) => {
 try {
  const user = await User.create(data);
  return user
 } catch (error) {
  console.log(error)
  throw error
 }
}

const getUserByEmail = async(email)=>{

 try {
  const user = await User.findOne({email:email});

  if(!user){
   return {
    status:404,
    err:"Not able to found user with the givin email"
   }
  }
  return user
 } catch (error) {
  console.log(error)
  throw error
 }
}
const getUserById = async(id)=>{
 try {
  const user = await User.findById({_id:id});

  if(!user){
   return {
    status:404,
    err:"Not able to found user with the givin email"
   }
  }
  return user
 } catch (error) {
  console.log(error)
  throw error
 }

}

module.exports = {
 createUser,getUserByEmail,getUserById
}
