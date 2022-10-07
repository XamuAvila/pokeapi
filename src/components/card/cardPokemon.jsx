
import React, { Component } from "react";
import { Get } from "react-axios";
import axios from 'axios';
import './cardPokemon.css'
import Pagination from "../pagination/pagination";
class CardPokemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemons: [],
            currentPage: 1,
            pokemonsPerPage: 10,
            totalCount: 0,
        }
    }

    componentDidMount = async () => {
        const allPokemons = await (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=892')).data.results
        if (allPokemons) {
            this.setState({ pokemons: allPokemons });
            this.setState({ totalCount: allPokemons.length })
        }
    }

    paginate = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    render() {
        const { pokemons, currentPage, pokemonsPerPage } = this.state;
        var currentPokemon = []
        if (pokemons.length !== 0) {
            const indexOfLastPokemon = currentPage * pokemonsPerPage;
            const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
            currentPokemon = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
        }

        return (
            <div className="row cardPokemon d-flex justify-content-center">
                {currentPokemon.map(pokemon => {
                    return (
                        <div className="card col-md-3 cardPokemon" style={{ width: "18rem", padding: "0 0 0 0", margin: "2px 2px 2px 2px" }}>
                            <Get url={pokemon.url}>
                                {(error, response, isLoading, makeRequest, axios) => {
                                    if (error) {
                                        return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                                    }
                                    else if (isLoading) {
                                        return (<div>Loading...</div>)
                                    }
                                    else if (response !== null) {
                                        return (<div>
                                            <img className="card-img-top" style={{ background: "#5db9ff" }} src={response.data.sprites.front_shiny} alt="Dog" />
                                            <div className="card-body cardBackground">
                                                <h5 className="card-title text-center cardText">{response.data.name}</h5>
                                            </div>
                                        </div>
                                        )
                                    }
                                    return (<div>Default message before request is made.</div>)
                                }}
                            </Get>
                        </div>
                    )
                })}

                <div className="mt-4 mr-3 d-flex justify-content-center" >
                    <Pagination
                        pokemonsPerPage={pokemonsPerPage}
                        totalPokemon={pokemons.length}
                        currentPage={currentPage}
                        paginate={this.paginate}
                    />
                </div>
            </div>
        );
    }
}

export default CardPokemon;
