import { useEffect, useState } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Favoritos(){

    const [filmes, setFilmes] = useState([])

    useEffect(()=>{

        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes( JSON.parse(minhaLista)|| [])

    },[])



    function excluirFilme(id){
        
        let filtroFilmes = filmes.filter((filmes) => {

            return(filmes.id !== id)

        })

        setFilmes(filtroFilmes);
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes))
        toast.error("Filme excluido!");
    }

    return(
        <div className="meus-filmes">
            <h1>Meus Filmes</h1>


            {filmes.length === 0 && <span>Voce ainda não adicionou nenhum favorito 😕</span>}

            <ul>
                {filmes.map((filme)=>{
                    return(
                        <li key={filme.id}>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filmes/${filme.id}`}>Ver detalhes</Link>
                                <button onClick={() => excluirFilme(filme.id)}> Excluir </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;