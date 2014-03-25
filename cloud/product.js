/* OG product info */

/* Serve the metadata for a specified product ID */
exports.load = function(req,res){
  var data = {
    url_prefix: 'http://oglocalizationdemo.parseapp.com/product/',
  };
  var productQuery = new Parse.Query('Product');
  var priceQuery = new Parse.Query('ProductPrice');
  var localizationQuery = new Parse.Query('ProductLocalization');

  productQuery.get(req.params['pid']).then(function(product){
    data.product = product;
    priceQuery.equalTo('product', product);
    return priceQuery.find();
  }).then(function(prices){
    data.prices = prices;
    localizationQuery.equalTo('product', data.product);
    return localizationQuery.find();
  }).then(function(localizations){
    data.localizations = localizations;
    res.render('product', data)
  }, function(error){
    res.send(404, error);
  });
}

/*
  , {
    success: function(product) {
      query = new Parse.Query('ProductPrice');
      query.equalTo('product', product);
      query.find({
        success: function(prices) {
          res.render('product', { 
            product: product,
            url_prefix: 'http://oglocalizationdemo.parseapp.com/product/',
            prices: prices
          });
        },
        error: function() {
          res.render('product', { 
            product: product,
            url_prefix: 'http://oglocalizationdemo.parseapp.com/product/',
            prices: null
          });
        }
      })
    },
    error: function(obj, error) {
      res.send(404, error);
    }
  });
};
*/

/* Convenience method to list all product objects */
exports.list = function(req,res){
  var query = new Parse.Query('Product');
  query.find({
    success: function(objs) {
      res.render('products', { 
        products: objs
      });
    },
    error: function(objs, err) {
      res.send(err);
    }
  });
};

/* Get a request ID for a given user-product-quantity */
exports.getRequestID = function(req,res){

  var Request = Parse.Object.extend('Request');
  var Product = Parse.Object.extend('Product');

  var request = new Request();

  var user = new Parse.User();
  user.id = req.params['user'];
  request.set('user', user);

  var product = new Product();
  product.id = req.params['product'];
  request.set('product', product);

  if( req.params['quantity'] && !isNaN(req.params['quantity']) ) {
    request.set('quantity', parseInt(req.params['quantity']));
  } else {
    request.set('quantity', 1);
  }

  request.save(null, {
    success: function(request) {
      res.send(request.id);
    },
    error: function(request, error){
      console.log(error);
      res.send(error);
    }
  })
};