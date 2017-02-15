module.exports = (router, Users, func, Schools, Schooltags) =>{
  router.get('/schools', (req, res)=>{
    Schools.find({}, {_id: 0}, (err, schools)=>{
      if(err) return res.status(500).send("DB err");
      if(schools) return res.status(200).send(schools);
      else return res.status(404).send("school not found");
    });
  })

  .get('/schools/tag', (req, res)=>{
    return res.status(200).json({tag: ["복지","항공","의료장비","사무","서비스","의상","화학","음악","체육","뷰티아트","신소재","응용연구","로봇","만화","게임 일러스트","외국어","재료","정보보안","금속가공","유비쿼터스","유아교육","토목","환경","영상","게임개발","제어계측","요리","시스템 연구","전기","금융·회계·세무","관광","네트워크","보건","무역·유통","컴퓨터디자인","하드웨어","생활디자인","디자인"]});
  })

  .get('/schools/tag/:interest', (req, res)=>{
    var interest = req.params.interest.split(",");
    Schools.find({coeducation: {$regex: interest[2]+"고|공학"}}, (err, school)=>{
      if(err) return res.status(500).send("DB ERR");
      if(school){
        Schooltags.find({$or:[{tag:interest[0]},{tag:interest[1]}]}, {_id: 0},(err, schools)=>{
          if(err) return res.status(500).send("DB err");
          if(schools){
            var data = [];
            var data2 = [];
            for(var j = 0; j<schools.length; j++){
              for(var k = 0; k<schools[j].schools.length; k++){
                for(var i = 0; i<school.length; i++){
                  if(schools[j].schools[k].includes(school[i].name) && j == 0){
                    data.push(school[j].schools[k]);
                    break;
                  }else if(schools[j].schools[k].includes(school[i].name) && j>0){
                    data2.push(schools[j].schools[k])
                    break;
                  }
                }
              }
            }
            return res.status(200).json([{tag: schools[0].tag, schools:data}, {tag: schools[1].tag, schools:data2}]);
          }else return res.status(404).send("not found");
        });
      }else return res.status(404).send("not found");
    });
  })

  .get('/schools/:name', (req, res)=>{
     Schools.findOne({name: {$regex : req.params.name}}, {_id: 0},(err, schools)=>{
      if(err) return res.status(500).send("DB err");
      if(schools.length != 0) return res.status(200).send(schools);
      else return res.status(400).send("school not found");
    });
  })
  return router;
}
