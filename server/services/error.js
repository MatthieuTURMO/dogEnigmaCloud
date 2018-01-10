exports.sendError = function (res, error, next) {
  if (error) {
    return res.send(500, error);
  }
}
