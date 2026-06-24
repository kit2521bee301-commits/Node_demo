const logger = (req, res, next) => {

    console.log(
        `${req.method} ${req.originalUrl} has been hit`
    );

    next();
};

module.exports = logger;