const winston = require('./winston')

class UDError extends Error {
    constructor(data) {
       super(data.message);
       this.status = data.status;
    }
}

const errorHandler = (err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    winston.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
      )
    res.status(err.status || 500).json({
        message: err.message
    })
    res.end()
}

module.exports = {
    errorHandler,
    UDError
}