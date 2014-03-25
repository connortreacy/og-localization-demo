/* OG achievement info */

/* Serve the metadata for a specified achievement ID */
exports.load = function(req,res){
  var query = new Parse.Query('Achievement');
  query.get(req.params['achievement_id'], {
    success: function(achievement) {
      res.render('achievement', { 
        achievement: achievement,
        //TODO: fix this so it comes from a constants file
        app_id: '1393332784218683',
        url_prefix: 'http://oglocalizationdemo.parseapp.com/achievement/'
      });
    },
    error: function(obj, error) {
      res.send(404, error);
    }
  });
};

/* Convenience method to list all achievement objects */
exports.list = function(req,res){
  var query = new Parse.Query('Achievement');
  query.find({
    success: function(objs) {
      res.render('achievements', { 
        achievements: objs
      });
    },
    error: function(objs, err) {
      res.send(err);
    }
  });
};