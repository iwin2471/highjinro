var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/highjinro');
mongoose.Promise = global.Promise;

var UsersSchema = mongoose.Schema({
  id: {type: String},
  facebook_id: {type: String},
  passwd: {type: String},
  name: {type: String},
  token: {type: String},
  profile_img:{type: String},
  interest_field: [String],
  interest_school: {type: String},
  gender: {type: String}
});

var SchoolsSchema = mongoose.Schema({
  code: {type: String},
  name: {type: String},
  tag: {type: String},
  pathways: {type: Number},
  employment: {type: Number},
  class: {type: String},
  location_x: {type: Number},
  location_y: {type: Number},
  coeducation: {type: String},
  img_url: {type: String}
});


var SchoolTagSchema = mongoose.Schema({
  tag: {type: String},
  schools: [String]
});


var BoardsSchema = mongoose.Schema({
  boardid: {type: String},
  board_writer: {type: String},
  writer_img: {type: String},
  date: {type: Date},
  contents: {type: String},
  like: {type: Number, min: 0, default: 0},
  img_url: {type: String},

  comments:[{
      writer: {type: String},
      date: {type: Date},
      summary: {type: String},
      profile_image: {type: String},
  }]
});


Users = mongoose.model("users", UsersSchema);
Schools = mongoose.model("schools", SchoolsSchema);
SchoolTag = mongoose.model("schooltags", SchoolTagSchema);
Boards = mongoose.model("boards", BoardsSchema);

exports.Users = Users;
exports.Schools = Schools;
exports.SchoolTag = SchoolTag;
exports.Boards = Boards
exports.db = db;
