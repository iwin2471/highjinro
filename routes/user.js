module.exports = (router, Users, passport) => {
  .get('/user/:token', (req, res) => {
    const id = req.params.token;
    Users.findOne({token: token}, (err, user) => {
      if(err) res.status(400).send("db err");
      if(user) res.status(200).json(user);
      else res.status(404).send("user not found");
    });
  })

  .get('/user/:token/fb/token', passport.authenticate('facebook-token'), (req, res)=>{
    if (req.user) {
      Users.findOne({facebook_id: req.user._json.id}, function(err, users) {
        if(err) err;
        if(users) return res.status(409).send("already exist");
        else{
          Users.update({token: req.params.token}, {$set: {facebook_id: req.user._json.id}}, (err, result)=>{
            if(err) return res.stauts(500).send("DB ERR");
            if(result) return res.status(200).send("ok");
          });
        }
      });
    }else res.status(401).send("unauthed");
  })
  
  return router;
}
