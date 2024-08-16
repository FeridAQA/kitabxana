const User = require("../models/User");
const { createUser, hasEmail } = require("../services/user.service");
const { isValidObjectId } = require("../utils/check.id");




const C_findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// find by id
const C_findUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).send({ message: 'Yanlış ID formatı' });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// create users
const C_createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Emailin mövcudluğunu yoxlamaq
        const existingUser = await hasEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Bu email artıq istifadə olunur' });
        }
        let user = await createUser(req.body)
        res.status(201).json(user);
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error.message });
    }
}

// del user
const C_deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).send({ message: 'Yanlış ID formatı' });
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    C_findAllUsers,
    C_findUserById,
    C_createUser,
    C_deleteUser,

}