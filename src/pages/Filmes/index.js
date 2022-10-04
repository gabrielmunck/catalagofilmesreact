import {useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import api from '../../services/api'

import './filme-info.css'

import { toast } from 'react-toastify'

function Filmes(){

    const {id} = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() =>{
        async function loadFilmes(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:'9546d84592c787ad3d889a10ba23333e',
                    language: "pt-br",
                }
            })
            .then((response) =>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log('Filme Nao encontrado');
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilmes();



        return () => {
            console.log('componente desmontado')
        }
        //parametros externos do useEffect sao passados como parametro aqui
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeflix')


        //Se a lista nao existir sera criada uma
        let filmesSalvos = JSON.parse(minhaLista) || [];


        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme === true){
            toast.warn("Esse filme ja esta na sua lista!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
        toast.success("✨ Filme salvo com sucesso! ✨");
    }


    if(loading === true){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes do filme...</h1>
            </div>
        )
    }
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className='area-buttons'>

                <button onClick={salvarFilme}>Salvar</button>


                <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title}+trailer`}>
                     <button>
                        Trailer 
                     </button>
                </a>
            </div>


        </div>
    )
}

export default Filmes;