
const badRequest = (res, errorMessage) => {
  return res.status(400).json({
    success: false,
    error: errorMessage,
    data: {},
    message: "Malformed request | Bad Request"
  });
};
const validateMovieCreateRequest = (req, res, next) => {
  const {
    name,
    description,
    casts,
    trailerUrl,
    langage,
    releaseDate,
    director,
    releaseStatus
  } = req.body;

  if (!name || typeof name !== "string") {
    return badRequest(res, "Movie name is required and must be a string");
  }

  if (!description || typeof description !== "string") {
    return badRequest(res, "Description is required and must be a string");
  }

  if (!casts || !Array.isArray(casts) || casts.length === 0) {
    return badRequest(res, "Casts must be a non-empty array of strings");
  }

  if (!trailerUrl || typeof trailerUrl !== "string") {
    return badRequest(res, "Trailer URL is required and must be a string");
  }

  if (langage && typeof langage !== "string") {
    return badRequest(res, "Language must be a string");
  }

  if (!releaseDate || typeof releaseDate !== "string") {
    return badRequest(res, "Release date is required and must be a string");
  }

  if (!director || typeof director !== "string") {
    return badRequest(res, "Director is required and must be a string");
  }

  const allowedStatus = ["RELEASED", "UNRELEASED"];
  if (releaseStatus && !allowedStatus.includes(releaseStatus)) {
    return badRequest(res, `releaseStatus must be one of ${allowedStatus.join(", ")}`);
  }

  next();
};

module.exports = validateMovieCreateRequest;
module.exports = {
validateMovieCreateRequest
}
