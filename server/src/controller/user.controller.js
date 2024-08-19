const { findAllUsers, findUserById, deleteUser } = require("../services/user.service");
const { isValidObjectId } = require("../utils/check.id");

const C_findAllUsers = async (req, res) => {
    try {
        const { limit = 20, offset = 0 } = req.query;
        const users = await findAllUsers(limit, offset);
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
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// create users


// del user
const C_deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) {
            return res.status(400).send({ message: 'Yalniş ID formatı' });
        }
        const user = await deleteUser.findByIdAndDelete(id);
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
    C_deleteUser,

}