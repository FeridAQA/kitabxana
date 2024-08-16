const User = require("../models/User")
const bcrypt = require('bcrypt');


const login = async (params) => {
    const { email, password } = params;
    let user = await User.findOne({ email });

    // Əgər istifadəçi tapılmazsa və ya parol uyğunsuzdursa
    if (!user) {
        return { error: "Email və ya parol yanlışdır", status: 401 };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log("Password is valid:", isValidPassword);

    if (!isValidPassword) {
        return { error: "Email və ya parol yanlışdır", status: 401 };
    }
    user.password=undefined

    return { user, status: 200 };
};

module.exports = {
    login,
};

module.exports={
    login,
}