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
            favorites: []
        }
    },

    beforeCreate() {
        fetch(url, apiKey)
            .then(response => response.json())
            .then(data => {
                this.movies = data.movies
                this.moviesFiltradas = this.movies
                this.genres = [...new Set(this.movies.map(movie => movie.genres).flat())]
                this.favorites = JSON.parse(localStorage.getItem("favoritas")) || []
                
            })
            .catch(e => { console.log(e) })
    },

    methods: {
        guardarSearch(event) {
            this.search = event.target.value
            this.filtro()
        },
        guardarSelect(event) {
            this.select = event.target.value
            this.filtro()
        },
        filtro() {
            this.moviesFiltradas = this.movies.filter(movie => movie.title.toLowerCase().includes(this.search.toLowerCase())
                && movie.genres.includes(this.select))

        },
        removeFavorites(movieId){
            this.favorites= this.favorites.filter(movie => movie != movieId)
            localStorage.setItem("favorites" , JSON.stringify(this.favorites))
        },
        addFavorites(movieId){
            this.favorites.push(movieId)
            localStorage.setItem("favorites" , JSON.stringify(this.favorites))
        }
    }
})

app.mount("#app")

