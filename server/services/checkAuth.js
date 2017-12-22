//check si le client est connecté à l'application
exports.isAuthenticated = function (req, res, next) {
    if(req.session && req.session.user){
        next();
    }
    else{
        res.status(403);
        res.send({
            "logged": false
        });
    }
}