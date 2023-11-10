import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

import api from '../../services/app'

function Filme() {
    const { id } = useParams();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '922829448eba551831579cc4c9f92cd6',
                    language: 'pt-BR',
                }
            })
            .then((response) => {
                setFilme(response.data)
                console.log(response.data)
                setLoading(false)
            })
            .catch(() => {
                console.log('Filme Não encontrado!')
            })
        }

        loadFilme()
    }, [])

    if(loading) {
        return (
            <div className="filme-info">
                <h1>Carregando Detalhes...</h1>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.evote_average}/10</strong>
        </div>
    )
}

export default Filme;