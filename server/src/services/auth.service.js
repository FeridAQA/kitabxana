const User = require("../models/User")
const { verifyPassword } = require("../utils/bcrypt");
const { encodePayload } = require("../utils/jwt");


const login = async (params) => {
    const { email, password } = params;
    let user = await User.findOne({ email });

    // Əgər istifadəçi tapılmazsa və ya parol uyğunsuzdursa
    if (!user) {
        return { error: "Email və ya parol yanlışdır", status: 401 };
    }

    const isValidPassword = await verifyPassword(password, user.password);
    console.log("Password is valid:", isValidPassword);

    if (!isValidPassword) {
        return { error: "Email və ya parol yanlışdır", status: 401 };
    }
    user.password = undefined
    

    const payloud = {
        id: user._id,
    }

    const token = encodePayload(payloud)

    return { token };
};

module.exports = {
    login,
};
