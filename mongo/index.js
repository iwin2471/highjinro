var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/radionoise');
mongoose.Promise = global.Promise;

var UsersSchema = mongoose.Schema({
  id: {type: String},
  passwd: {type: String},
  name: {type: String},
  token: {type: String},
  school_name: {type: String}
});

var SchoolsSchema = mongoose.Schema({
  code: {type: String},
  name: {type: String},
  tag: {type: Stirng},
  pathways: {type: Double},
  employment: {type: Double},
  class: {type: String},
  location_x: {type: Double},
  location_y: {type: Double},
  coeducation: {type: String}
});


var SchoolTagSchema = mongoose.Schema({
  tag: {type: String},
  schools: [String]
});


Users = mongoose.model("users", UsersSchema);
Schools = mongoose.model("schools", SchoolsSchema);
SchoolTag = mongoose.model("schooltags", SchoolsSchema);
exports.Users = Users;
exports.Schools = Schools;
exports.SchoolTag = SchoolTag;
exports.db = db;
