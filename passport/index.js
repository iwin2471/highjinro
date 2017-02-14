module.exports = (Users) =>{
  var passport = require('passport');
  var GitHubTokenStrategy = require('passport-github-token');
  var FacebookTokenStrategy = require('passport-facebook-token');
  var TwitterTokenStrategy = require('passport-twitter-token');
  var TwitterStrategy = require('passport-twitter');
  
  //passport serialize
  passport.serializeUser((user, done)=>{
    done(null, user);
  });
 
  passport.deserializeUser((obj, done)=>{
    done(null, obj);
  });

  passport.use(new FacebookTokenStrategy({
    clientID: "1096403937171552",
    clientSecret: "dafc047009f6bc772b427500cb390117",
    profileFields: ['id', 'displayName', 'photos'],
  }, (accessToken, refreshToken, profile, done)=>{
    done(null, profile);
  }))


  return passport;
}
