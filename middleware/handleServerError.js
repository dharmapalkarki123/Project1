module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errors=null
  // let errors = err.name;
  let msg = err.msg||"Server Error";
  // console.log(err);

  if (err.name == "ValidationError") {
    msg= "Bad Request/Validation Error"
    statusCode = 400;
    // console.loge(err.errors);
    let errsArray = Object.entries(err.errors);
    errors=[];
    
  
   errsArray.forEach((el)=>{
    errors.push({
      field: el[0],
      msg: el[1].message,
    })
   })
  }
  res.status(statusCode).send({
    msg,
    errors,
    stack:err.stack,
  })
}