require('../vendors/GollumJS/Class/Class.js');
require('../vendors/GollumJS/Class/Exception.js');

//jQuery = require('../vendors/jQuery/jquery/dist/jquery.js');

require('./SMC/namespace.js');
require('./Api/Core/Controller.js');
require('./Api/Controller/Episode.js');
require('./Api/Controller/Serie.js');
require('./HTTP/HTTPServer.js');
require('./SMC/App.js');


SMC.App.start();
