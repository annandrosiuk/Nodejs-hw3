const RequestLog = require('../../models/RequestLog');

module.exports = async (req, res, next) => {
    const requestLog = new RequestLog({
        method: req.method,
        api_url: req.url
    })

    await requestLog.save()

    next();
}