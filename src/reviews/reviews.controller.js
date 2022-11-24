const reviewsService = require("./reviews.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const reviewId = req.params.reviewId;

  const reviewExist = await reviewsService.read(reviewId);
  if (reviewExist) {
    res.locals.review = reviewExist;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found",
  });
}

async function destroy(req, res) {
  const reviewId = req.params.reviewId;
  await reviewsService.delete(reviewId);
  res.sendStatus(204);
}

async function update(req, res, next) {
  const reviewId = req.params.reviewId;
  const reviewUpdate = req.body.data;
  await reviewsService.update(reviewUpdate, reviewId);
  res.json({ data: await reviewsService.read(reviewId) });
}

async function getReviewsWithCritics(req, res, next) {
  const movieId = req.params.movieId;
  if (movieId) {
    const criticData = await reviewsService.getReviewsCritics(movieId);

    const data = criticData.map((row) => {
      return {
        review_id: row.review_id,
        content: row.content,
        score: row.score,
        created_at: row.created_at,
        updated_at: row.updated_at,
        critic_id: row.critic_id,
        movie_id: row.movie_id,
        critic: {
          critic_id: row.critic_id,
          preferred_name: row.preferred_name,
          surname: row.surname,
          organization_name: row.organization_name,
          created_at: row.created_at,
          updated_at: row.updated_at,
        },
      };
    });
    res.json({ data });
  }
}
module.exports = {
  list: asyncErrorBoundary(getReviewsWithCritics),
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};
