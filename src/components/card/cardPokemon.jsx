
import { Component } from "react";
import { Get } from "react-axios";
import axios from 'axios';
import './cardPokemon.css'
import Pagination from "../pagination.js";
class CardPokemon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allPokemons: [],
            currentPokemons: [],
            currentPage: null,
            totalPages: null
        }
    }


    componentDidMount = async () => {
        const allPokemons = await (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000')).data.results
        if (allPokemons) {
            this.setState({ allPokemons: allPokemons });
        }
    }

    onPageChanged = data => {
        const { allPokemons } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentPokemons = allPokemons.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentPokemons, totalPages });
    };

    render() {
        const {
            allPokemons,
            currentPokemons,
            currentPage,
            totalPages
        } = this.state;
        const totalPokemons = allPokemons.length;

        if (totalPokemons === 0) return null;

        return (
            <div className="row cardPokemon d-flex justify-content-center">
                {currentPokemons.map(pokemon => {
                    return (
                        <div id={pokemon.id} className="card col-md-3 cardPokemon" style={{ width: "18rem", padding: "0 0 0 0", margin: "2px 2px 2px 2px" }}>
                            <Get url={pokemon.url}>
                                {(error, response, isLoading, makeRequest, axios) => {
                                    if (error) {
                                        return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                                    }
                                    else if (isLoading) {
                                        return (<div>Loading...</div>)
                                    }
                                    else if (response !== null) {
                                        return (<div id={response.data.id}>
                                            <img className="card-img-top" style={{ background: "#5db9ff" }} src={response.data.sprites.front_shiny} alt="Pokemon" />
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
                <div className="d-flex flex-row py-4 justify-content-center align-items-center align-center">
                    <Pagination
                        totalRecords={totalPokemons}
                        pageLimit={12}
                        pageNeighbours={1}
                        onPageChanged={this.onPageChanged}
                    />
                </div>
            </div>
        );
    }
}

export default CardPokemon;
