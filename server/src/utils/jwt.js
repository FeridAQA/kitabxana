const jwt = require("jsonwebtoken");
const config = require("../config");

const encodePayload = (payload) => {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};

const decodePayload = (token) => {
    try {
        const payload = jwt.verify(token, config.jwtSecret);
        return payload;
    } catch (error) {
        console.error("JWT Verification Error:", error.message); // Səhv mesajını konsolda göstərin
        return false;
    }
};

module.exports = {
    encodePayload,
    decodePayload,
};