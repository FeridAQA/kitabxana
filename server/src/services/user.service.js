const User = require("../models/User");
const { hashPassword } = require("../utils/bcrypt");

User.syncIndexes();

const findAllUsers = async () => {
    const Users = await User.find()
    return Users
}

// find by id
const findUserById = async (id) => {
    const user = await User.findById(id);
    return user
}

// create user
const createUser = async (params) => {
    const { username, email, password } = params;

    // parolu hashlamaq
    const hash = await hashPassword(password);

    // İstifadəçini yaratmaq
    const user = new User({ username, email, password:hash });
    const savedUser = await user.save();
    return savedUser;
};

const hasEmail = async (email) => {
    let user = await User.findOne({ email })
    return user
}


// del  user
const deleteUser = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        return { message: "User not found" }
    }
    await user.remove()
    return user
}




module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    hasEmail,
    deleteUser,

}