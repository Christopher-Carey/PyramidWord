const pyramid = require('../controllers/pyramids.js');
module.exports = function (app) {

    app.get("/api", (request, response) => pyramid.index(request,response));  

    app.get("/api/task/:id", (request, response) => pyramid.show(request,response));

    app.post("/api/task/new", (request, response) => pyramid.create(request,response)); 

    app.put("/api/task/update/:id", (request, response) => pyramid.update(request,response));

    app.delete("/api/task/destroy/:id", (request, response) => pyramid.destroy(request,response));  

}