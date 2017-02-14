module.exports = (router) => {
  router.get('img/:token', (req, res) => {
    return res.sendFile('/node/server_management/upload/'+req.params.token+".jpeg");
  })
  return router;
}
