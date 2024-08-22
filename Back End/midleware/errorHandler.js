
const {constants} = require("../constants.js");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !==200 ? res.statusCode : 500;
  res.status(statusCode)
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "validation faild",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break; 
    case constants.NOT_FOUND:
      res.json({
        title: "Employee not found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  
  default:
    console.log("no error all good");
    break;
}


};

module.exports = errorHandler;
