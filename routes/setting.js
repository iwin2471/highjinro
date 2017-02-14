module.exports = (router, fs, Users, async, func) =>{
  router.get('/setting/:token', (req, res)=>{
    var token = req.params.token;
    Users.findOne({token: token}, (err, users)=>{
      if(err) res.status(500).send("DB err");
      if(users) res.status(200).send(users.setting);
      else res.status(404).send("user not found");
    });
  })
  .post('/setting', (req, res) =>{
    var token = req.body.token;
    Users.update({token: token}, {$set: {setting: req.body.setting}}, (err, result)=>{
      if(err) res.status(500).send("DB err");
      if(result) res.status(200).send("success");
    });
  })

  return router;
}
