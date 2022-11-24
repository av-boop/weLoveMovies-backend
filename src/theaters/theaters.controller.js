const theatersService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { movieId } = req.params;

    
    const data = movieId? await theatersService.moviesTheaters(movieId) : await theatersService.list();
    res.json({ data });
    
  
}

module.exports = { list: asyncErrorBoundary(list) };
