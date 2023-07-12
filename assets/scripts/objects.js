/*
BEFORE PROJECT...

const userChosenKeyName = "level";
const person = {
  "first-name": "Max",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  [userChosenKeyName]: "...",
  greet: function () {
    alert("Hi There!");
  },
  1.5: "Hello",
};
// person.greet();
console.log(person);
console.log(person["first-name"]);
console.log(person[1.5]);
const numbers = { 8: "hello", 5: "there", 1: "James" };
console.log(numbers);

const keyName = "first-name";
console.log(person[keyName]); 
*/

// PROJECT APP...

const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");
const movies = [];

const renderMovies = (filter = "") => {
  const movieList = document.getElementById("movie-list");
  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    // movieEl.textContent = movie.info.title;
    const { info, ...otherProperties } = movie;
    console.log(otherProperties);

    let { getFormattedTitle } = movie;
    // getFormattedTitle = getFormattedTitle.bind(movie);
    let text = getFormattedTitle.call(movie) + " - ";
    for (const key in info) {
      if (key !== "title" && key !== "_title") {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (extraName.trim() === "" || extraValue === "") {
    return;
  }

  const newMovie = {
    info: {
      set title(val) {
        if (val.trim() === "") {
          this._title = "DEFAULT";
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    getFormattedTitle: function () {
      return this.info.title.toUpperCase();
    },
  };

  newMovie.info.title = title;
  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
