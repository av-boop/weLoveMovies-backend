const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function getReviewsCritics(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .join("movies as m", "m.movie_id", "r.movie_id")
    .select("r.*", "c.*")
    .where({ "m.movie_id": movieId });
}

function read(reviewId) {
  return knex("reviews as r")
    .select("*")
    .where({ review_id: reviewId })
    .join("critics as c", "c.critic_id", "r.critic_id")
    .first()
    .then((data) => {
      return addCritic(data);
    });
}

function update(review, reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .update(review);
}

function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

module.exports = {
  delete: destroy,
  update,
  read,
  getReviewsCritics,
};
