const { login } = require("../services/auth.service");
const { hasEmail, createUser } = require("../services/user.service");

const C_login = async (req, res, next) => {
    try {
        const params = req.body;
        let result = await login(params);

        if (result.error) {
            return res.status(result.status).json({ error: result.error });
        }

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

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
module.exports={
    C_login,
    C_createUser,
}