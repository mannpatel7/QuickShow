import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";

const API_KEY = "81baa01a";

const popularMovies = [
  "Oppenheimer",
  "Barbie",
  "Dune",
  "John Wick",
  "Avengers",
  "Spider-Man",
  "Batman",
  "Jawan",
  "Pathaan",
  "RRR"
];

export const getNowPlayingMovies = async (req, res) => {
  try {
    const movies = [];

    for (let title of popularMovies) {
      const response = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: API_KEY,
          t: title
        }
      });

      if (response.data && response.data.Response === "True") {
        const omdbMovie = response.data;

       
        let movie = await Movie.findOne({ id: omdbMovie.imdbID });

        if (!movie) {
          movie = new Movie({
            id: omdbMovie.imdbID,
            title: omdbMovie.Title,
            overview: omdbMovie.Plot,
            poster_path: omdbMovie.Poster,
            backdrop_path: omdbMovie.Poster,
            release_date: omdbMovie.Released,
            original_language: omdbMovie.Language,
            tagline: "",
            genres: omdbMovie.Genre ? omdbMovie.Genre.split(",") : [],
            casts: omdbMovie.Actors ? omdbMovie.Actors.split(",") : [],
            vote_average: parseFloat(omdbMovie.imdbRating) || 0,
            runtime: parseInt(omdbMovie.Runtime) || 0
          });

          await movie.save();
        }

        movies.push(movie); 
      }
    }

    res.json({ success: true, nowPlaying: movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const addShows = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const showsToCreate = [];

    showsInput.forEach(show => {
      const showDate = show.date;

      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}`;

        showsToCreate.push({
          movie: movie._id,
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {}
        });
      });
    });

    const createdShows = await Show.insertMany(showsToCreate);

    res.status(201).json({
      success: true,
      message: "Shows added successfully",
      shows: createdShows
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add shows" });
  }
};


//api for get all shows

export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({
      showDateTime: { $gte: new Date() }
    })
      .populate("movie")
      .sort({ showDateTime: 1 });

    res.json({ success: true, shows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch shows" });
  }
};


//api for get show by movie id

export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params; // MongoDB _id

    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() }
    }).sort({ showDateTime: 1 });

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];

      if (!dateTime[date]) {
        dateTime[date] = [];
      }

      dateTime[date].push({
        time: show.showDateTime,
        showId: show._id
      });
    });

    res.json({ success: true, movie, dateTime });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
