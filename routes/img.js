module.exports = (router) => {
  router.get('/:token', (req, res) => {
    return res.sendFile('/node/server_management/upload/'+req.params.token+".jpeg");
  })
  return router;
}
