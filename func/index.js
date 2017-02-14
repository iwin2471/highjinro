exports.check_param = (req_param, params) =>{
  return params.every(str => req_param[str] != undefined && req_param[str] != null && req_param[str].length > 0);
}
