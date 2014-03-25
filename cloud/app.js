var
  express = require('express'),
  product = require('cloud/product'),
  achievement = require('cloud/achievement');;

var app = express();
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body

app.get('/achievements', achievement.list);
app.get('/achievements/:achievement_id', achievement.load);

app.get('/products', product.list);
app.get('/products/:pid', product.load);

app.listen();