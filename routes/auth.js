module.exports = (router, Users, rndString,func) =>{
  router.post('/auth/signup', (req, res) => {
    var params = ['id', 'passwd', 'name', 'interest_field', 'interest_school'];

    if(func.check_param(req.body, params)){
      const id = req.body.id;
      const passwd = req.body.passwd;
      const name = req.body.name;
      const field = req.body.interest_field;
      const school = req.body.interest_school;
    
      const new_user = new Users({
        id: id,
        passwd: passwd,
        name: name,
        token: rndString.generate(),
        interest_field: field,
        interest_school: school,
      });
    
      new_user.save((err, data)=>{
        if(err) return res.status(400).send("save err");
        return res.status(200).json(new_user);
      });

    }else{
      return res.status(400).send("param missing or null");
    } 
  })
  
  .post('/auth/signin', (req,res)=>{
    var params = ['id', 'passwd'];
    if(func.check_param(req.body, params)){
      Users.findOne({id: req.body.id, passwd: req.body.passwd}, {_id: 0, _v: 0}, (err, user)=>{
        if(err) return res.status(500).send("DB err");
        if(user) return res.status(200).json(user);
        else return res.status(412).send("incorrect id or passwd");
      });
    }else return res.status(400).send("param missing or null");
  })

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
