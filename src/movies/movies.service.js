const knex = require("../db/connection");


function list(){
    return knex("movies").select("*");
}

function listIsShowing() {
    return knex("movies as m")
    .distinct("m.movie_id")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id" )
    .select("m.title" , "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url" )
    .where({"mt.is_showing" : true})
    .orderBy("m.movie_id")
    
    
  }


  function read(movieId){
    return knex("movies as m")
    .select("*")
    .where({ movie_id: movieId }).first();

  }

module.exports ={
    list,
    listIsShowing,
    read,
    
}
