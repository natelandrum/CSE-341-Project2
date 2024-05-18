const validator = require("../utils/validate");

const saveUser = (req, res, next) => {
    const validationRule = {
        name: "required|string",
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