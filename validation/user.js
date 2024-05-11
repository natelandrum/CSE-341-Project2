const validator = require("../utils/validate");

const saveUser = (req, res, next) => {
    const validationRule = {
        username: "required|string",
        email: "required|email",
        password: "required|string|regex:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,40}$/",
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    status: false,
                    message: "Validation failed",
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    saveUser
};