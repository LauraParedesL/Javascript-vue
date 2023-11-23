const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/movies"
const apiKey = { headers: { "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd" } }

const app = createApp({

    data() {
        return {
            movies: [],
            moviesFiltradas: [],
            genres: [],
            search: "",
            select: "",
            idMovies: "",
            movie: "",
          
        }
    },

    beforeCreate() {
      
        fetch(url, apiKey)
            .then(response => response.json())
            .then(data => {
                this.movies = data.movies
               // this.moviesFiltradas = this.movies
               // this.genres = [...new Set(this.movies.map(movie => movie.genres).flat())]
                this.idMovies = new URLSearchParams(window.location.search).get("id")
                this.movie =this.movies.find(movie => movie.id == this.idMovies)
        
            })
            .catch(e => { console.log(e) })
    }
    })
    app.mount("#app")

