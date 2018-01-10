exports.printPath = function(req, res, next){
    console.log(req.method, req.url, req.session.user);
    next();
}