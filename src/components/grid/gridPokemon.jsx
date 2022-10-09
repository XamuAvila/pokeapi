
import { Component } from "react";
import axios from 'axios';
import './gridPokemon.css'
import Pagination from "../pagination.js";
import Card from "../card";
import Logo from "../logo/index.js";
class GridPokemon extends Component {

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
        } = this.state;

        const totalPokemons = allPokemons.length;

        if (totalPokemons === 0) return null;

        return (
            <div>
                <Logo />
                <div className="row d-flex justify-content-center">
                    {currentPokemons.map(pokemon => {
                        return (
                            <Card id={pokemon.id} url={pokemon.url} />
                        )
                    })}
                    <div className="d-flex flex-row py-4 justify-content-center align-items-center align-center">
                        <Pagination
                            totalRecords={totalPokemons}
                            pageLimit={20}
                            pageNeighbours={1}
                            onPageChanged={this.onPageChanged}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default GridPokemon;
