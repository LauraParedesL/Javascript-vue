const { createApp } = Vue

const url = "https://moviestack.onrender.com/api/movies"
const apiKey = { headers: { "x-api-key": "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd" } }

const app = createApp({

    data() {
        return {
            movies: [],
            moviesFiltradas: [],
            favorites: []
            
          
        }
    },

    beforeCreate() {
      
        fetch(url, apiKey)
            .then(response => response.json())
            .then(data => {
                this.movies = data.movies
                this.favorites = JSON.parse(localStorage.getItem("favorites")) || []
                this.moviesFiltradas = this.movies.filter(movie => this.favorites.includes(movie.id))
            
                
        
            })
            .catch(e => { console.log(e) })
    },
    methods: {
            removeFavorites(movieId){
                this.favorites= this.movies.filter(movie => movie != movieId)
                localStorage.setItem("favorites" , JSON.stringify(this.favorites))
            },
            addFavorites(movieId){
                this.favorites.push(movieId)
                localStorage.setItem("favorites" , JSON.stringify(this.favorites))
            }
    },

    })
    
    app.mount("#app")