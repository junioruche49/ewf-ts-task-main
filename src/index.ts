import { Genre, Movie } from "./index.types"
import * as moviesList from "./db.json";

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  const movies:  Movie[] = sortAccordingToGenres()
  const filterMovies: Movie[] = []

  if (genres.length === 0) {
    // if empty list provided, return single random movie
    const randomIndex = Math.floor(Math.random() * movies.length);
    return [movies[randomIndex]];
  }
  let subGenres = genreList({genres})
  //algorithm to search for movies
  for (const movie of movies) {
   let {genres:genre} = movie
   let data: boolean = false;
    for (const {genres:genreList} of subGenres) {
      if (genreList.length != genre.length) {
        data = false
      }else{
          data = genre.every(gen=>genreList.includes(gen as Genre))
        if (data) {
          filterMovies.push(movie)
        }
      }
      
    }
    
  }
  return filterMovies;
}

//this function divides genres into sub group
function genreList({genres}: { genres: Genre[] }){
  let newGenres: { genres: Genre[]; }[] = [];
  
  const newElement = []
  if (genres.length > 2) {
  newGenres.push({genres})
  }
  for (let i = 1; i <= genres.length; i++) {
    let newGenreSlice = [...genres]
    newGenreSlice = newGenreSlice.slice(i)
    
    for (let j = 0; j <= newGenreSlice.length; j++) {
      if (!newGenreSlice[j]) {
        break
      }
      newElement.push({genres:[genres[i-1], newGenreSlice[j]]})
    }
    
  }
  for (const key in genres) {
    newElement.push({genres:[genres[key]]})
  }
  newGenres.push(...newElement)
  return newGenres;
}

//sort by genres according to the number of genres
function sortAccordingToGenres():Movie[]{
  const { movies }: {movies: Movie[]} = moviesList

  movies.sort((a,b)=>{
    if (a.genres.length > b.genres.length) {
      return -1
    }else if (a.genres.length < b.genres.length) {
      return 1
    }else{
      return 0
    }
  })
  return movies
}

const genres: Genre[] = ['Crime', 'Drama', 'Music']
console.log(genreList({genres}))
