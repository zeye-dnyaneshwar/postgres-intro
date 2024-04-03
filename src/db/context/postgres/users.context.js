const Users = require("../../../models/postgres/Users.model");

const getUserByEmail = async (email) => {
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    return user;
};

const createNewUser = async ({ name, email, password, employeeId, designation, department }) => {
    const user = await Users.create({
      name,
      email,
      password,
      employeeId,
      designation,
      department
    });
    return {
      id: user.dataValues.id,
      name: user.dataValues.name,
      email: user.dataValues.email,
    };
  };

const getUserById=async(id)=>{
    const user=await Users.findOne({
        where:{
            id
        }
    })
    return user
}

const updateUserById=async(id,payload)=>{
    const [updatedRowsCount, [updatedUser]] = await Users.update(payload, {
        where: { id },
        returning: true // Return the updated user
    });
    return updatedUser
}

module.exports={getUserByEmail,createNewUser,getUserById,updateUserById}