module.exports = (router) =>{
  router.get('/', function(req, res){
     res.render('index');
  })

  .get('/editor', function(req, res){
     res.render('editor');
  });

  return router;
}
