import {useEffect, useState} from 'react'
import api from '../../services/app.js'
import { Link } from 'react-router-dom'
import './home.css'


function Home() {
    const [filmes, setFilmes] = useState([]);

    useEffect(()=> {
        async function loadFilmes() {
            const response = await api.get('/movie/now_playing', {
                params: {
                    api_key: '922829448eba551831579cc4c9f92cd6',
                    language: 'pt-BR',
                    page: 1
                }
            });
          
            setFilmes(response.data.results.slice(0, 10))
        }

        loadFilmes();
    }, [])

    return (
        <div className='container'>
            <div className='lista-filmes'>
                {
                    filmes.map((filmes) => {
                        return (
                            <article key={filmes.id}>
                                <strong>{filmes.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${filmes.backdrop_path}`} alt={filmes.title} />
                                <Link to={`/filme/${filmes.id}`}>Acessar</Link>
                            </article>
                        )
                    })    
                }
            </div>
        </div>    
    )

}


export default Home;