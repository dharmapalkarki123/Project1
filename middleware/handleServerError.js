module.exports = (err, req, res, next) => {
  let statusCode = 500;
  let error = err.name;
  let msg = "Server Error";
  console.log(err);

  if (err.name == "ValidationError") {
    msg= "Bad Request/Validation Error"
    statusCode = 400;
    error = {
      email: "already exists",
      password: "required field"
    }
  }
  res.status(statusCode).send({
    msg,
    error,
    stack:err.stack,
  })
}