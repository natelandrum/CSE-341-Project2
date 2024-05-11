const validator = require("../utils/validate");

const saveSong = (req, res, next) => {
    const validationRule = {
        name: "required|string",
        artist: "required|string",
        album: "string",
        genre: "string",
        duration: "required|integer",
        featured: "string",
        songwriters: "string",
        composers: "string",
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
    saveSong
};