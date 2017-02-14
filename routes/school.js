module.exports = (router, Users, rndString,func) =>{
  .get('/auth/auto/:token', (req, res)=>{
     var params = ['token'];

     if(func.check_param(req.params, params)){
       const token = req.params.token;
       Users.findOne({token: token}, (err, user) =>{
         if(err) return res.status(500).send("DB error"); 
         if(user) return res.status(200).json({id: user.id, name: user.name, token: user.token});
         else return res.status(404).send("user not found");
       });
     }else{
       return res.status(400).send("param missing or null");
     }
  })
  
  return router;
}
