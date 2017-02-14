module.exports = (router, Users, rndString,func, passport, Q, multer) =>{
  router.get('/', function(req, res) {
    res.send("hah");
  })
  
  return router;
}
