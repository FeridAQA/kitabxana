const { login } = require("../services/auth.service");

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
module.exports={
    C_login,
}