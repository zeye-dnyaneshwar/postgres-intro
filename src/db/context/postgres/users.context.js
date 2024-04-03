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

module.exports={getUserByEmail,createNewUser}