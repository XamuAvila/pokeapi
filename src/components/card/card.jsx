import React, { Component } from 'react'
import { Get } from "react-axios";

export default class Card extends Component {

    render() {
        const types =
        {
            "normal": "#00C7BB",
            "fire": "#F32222",
            "water": "#00518C",
            "electric": "#CDB202",
            "grass": "#025F16",
            "ice": "#007BD3",
            "fighting": "#6F0323",
            "poison": "#320356",
            "ground": "#47290D",
            "flying": "#C96101",
            "psychic": "#405723",
            "bug": "#7DA019",
            "rock": "black",
            "ghost": "#764978",
            "dragon": "#BD1D1D",
            "dark": "#1B1C1B",
            "steel": "#868686",
            "fairy": "#D1003F"
        }
        return (
            <div id={this.props.id} className="card col-md-3 cardPokemon" style={{ width: "15rem", padding: "0 0 0 0", margin: "10px 2px 2px 2px" }}>
                <Get url={this.props.url}>
                    {(error, response, isLoading, makeRequest, axios) => {
                        if (error) {
                            return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                        }
                        else if (isLoading) {
                            return (<div>Loading...</div>)
                        }
                        else if (response !== null) {
                            console.log(response.data.types[0].type.name);
                            return (<div id={response.data.id}>
                                <img className="card-img-top" style={{ background: "white" }} src={response.data.sprites.front_shiny} alt="Pokemon" />
                                <div className="card-body cardBackground" style={{ background: types[response.data.types[0].type.name] }}>
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
    }
}
