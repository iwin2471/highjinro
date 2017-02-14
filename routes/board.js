module.exports = (router) => {
  var moment = require('moment-timezone');

  var upload = function(req, res, boardid) {
    var deferred = Q.defer();
    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function(req, file, cb) {
            cb(null, "upload/board");
        },

        // 서버에 저장할 파일 명
        filename: function(req, file, cb) {
            file.uploadedFile = {
                name: boardid,
                ext: "png"
            };
            cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
        }
    });

    var upload = multer({
        storage: storage
    }).single('file');

    upload(req, res, function(err) {
        if (err) {
            deferred.reject();
        } else if (req.file === undefined) {
            return res.status(412).send("no file sended");
        } else {
            deferred.resolve(req.file.uploadedFile);
        }
    });
    return deferred.promise;
};

  router.get('/boards', (req, res) => {
    var date = moment().tz("Asia/Seoul").format('YYYY-MM-DD hh:mm');
    return res.send(date+"");
  })

  return router;
}
