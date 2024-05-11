const validator = require("../utils/validate");

const saveUser = (req, res, next) => {
    const validationRule = {
        username: "required|string",
        email: "required|email",
        password: "required|password",
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