module.exports = (router, Users, rndString,func) =>{
  var multer = require('multer');
  var Q = require('q');

  var upload = (req, res, token) => {
  var deferred = Q.defer();
  var storage = multer.diskStorage({
  // 서버에 저장할 폴더
    destination: function (req, file, cb) {
      cb(null, "upload");
    },
        // 서버에 저장할 파일 명
    filename: function (req, file, cb) {
      var token = req.body.token;

      file.uploadedFile = {
        name: token,
        ext: file.mimetype.split('/')[1]
      };

      cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
    }
  });

  var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
    if (err) deferred.reject();
    else if (req.file === undefined){
       const id = req.body.id;
         const passwd = req.body.passwd;
         const name = req.body.name;
         const field = req.body.interest_field;
         const school = req.body.interest_school;
  
         const new_user = new Users({
           id: id,
           passwd: passwd,
           name: name,
           token: token,
           profile_img: "unll",
           interest_field: field,
           interest_school: school,
         });
  
        new_user.save((err, data)=>{
          if(err) return res.status(400).send("save err");
          return res.status(200).json(new_user);
        });
    }else deferred.resolve(req.file.uploadedFile);
        
    });
    return deferred.promise;
};

  router.post('/auth/signup', (req, res) => {
    var params = ['id', 'passwd', 'name', 'interest_field', 'interest_school'];

    if(func.check_param(req.body, params)){
       var token = rndString.generate();
       func.profile_upload(req, res, token).then(function (file) {
         const id = req.body.id;
         const passwd = req.body.passwd;
         const name = req.body.name;
         const field = req.body.interest_field;
         const school = req.body.interest_school;
   
         const new_user = new Users({
           id: id,
           passwd: passwd,
           name: name,
           token: token,
           profile_img: "http://hacka.iwin247.kr/img/"+token,
           interest_field: field,
           interest_school: school,
         });
   
        new_user.save((err, data)=>{
          if(err) return res.status(400).send("save err");
          return res.status(200).json(new_user);
        });

       }, function (err) {
         if(err) return res.status(500).send(err);
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

   .get('/fb/token', passport.authenticate('facebook-token'), function(req, res) {
    if (req.user) {
      Users.findOne({facebook_id: req.user._json.id}, {_id: 0}, function(err, users) {
        if(err) err;
        if(users) res.status(200).send(users);
        else{
          facebook_user = new Users({
            facebook_id: req.user._json.id,
            name: req.user._json.name,
            token: rndString.generate(),
          });
          facebook_user.save((err, result)=>{
            if(err) return res.stauts(500).send("DB err");
            if(result) return res.status(200).json(facebook_user);
          });
        }
      });
    } else  res.status(401).send("unauthed");
  })
  
  return router;
}
