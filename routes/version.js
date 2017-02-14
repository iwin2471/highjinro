module.exports = (router) =>{
  router.get('/version', (req, res) =>{
     res.json({version: "1.0.0.0"});
  })

  return router;
}
