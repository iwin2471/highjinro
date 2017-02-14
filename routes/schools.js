module.exports = (router, Users, func, Schools, Schooltags) =>{
  router.get('/', (req, res)=>{
    Schools.find({}, {_id: 0}, (err, schools)=>{
      if(err) return res.status(500).send("DB err");
      if(schools) return res.status(200).send(schools);
      else return res.status(404).send("school not found");
    });
  })

  .get('/:name', (req, res)=>{
     Schools.find({name: {$regex : req.params.name}}, {_id: 0},(err, schools)=>{
      if(err) return res.status(500).send("DB err");
      if(schools) return res.status(200).send(schools);
      else return res.status(404).send("school not found");
    });
  })
  
  return router;
}
