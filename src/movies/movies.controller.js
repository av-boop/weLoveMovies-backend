const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const query = req.query.is_showing;
  const data = query
    ? await moviesService.listIsShowing()
    : await moviesService.list();

  res.json({
    data,
  });
}

async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  movieExists,
};
