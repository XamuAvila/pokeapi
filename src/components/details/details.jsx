import React, { Component } from 'react'
import Logo from '../logo'
import './details.css'
import { Get } from "react-axios";
import { HeartFill, Heart } from 'react-bootstrap-icons';
export class Details extends Component {

    constructor(props) {
        super(props);
        const name = window.location.pathname.split('/')[2];
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    like() {
        const name = window.location.pathname.split('/')[2];
        if (window.localStorage.getItem(name)) {
            window.localStorage.removeItem(name)
        } else {
            window.localStorage.setItem(name, 'liked');
        }
        window.location.reload()
    }

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

        let element = <Heart onClick={this.like} />;
        const name = window.location.pathname.split('/')[2];
        if (window.localStorage.getItem(name)) {
            element = <HeartFill onClick={this.like} />
        } else {
            element = <Heart onClick={this.like} />
        }

        return (
            <div className='backgroundGeneral'>
                <Logo />
                <div className='row justify-content-center'>
                    <div className="card" style={{ width: '30rem', marginTop: '3em' }}>
                        <Get url={`https://pokeapi.co/api/v2/pokemon/${window.location.pathname.split('/')[2]}`}>
                            {(error, response, isLoading, makeRequest, axios) => {
                                if (error) {
                                    return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                                }
                                else if (isLoading) {
                                    return (<div>Loading...</div>)
                                }
                                else if (response !== null) {
                                    return (
                                        <div className='text-center'>
                                            <div className='heart'>
                                                {element}
                                            </div>
                                            <img className="card-img-top" style={{ background: "#dde9ef", 'marginTop': '0.8em', height: '25rem', width: '25rem' }} src={response.data.sprites.front_shiny ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png'} alt="Pokemon detail" />
                                            <div className="card-body">
                                                <h5 className="card-title">{this.capitalizeFirstLetter(response.data.name)}</h5>
                                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <div className='row justify-content-center'>
                                                        {
                                                            response.data.types.map(type => {
                                                                return (
                                                                    <div className='col-md-6 justify-content-center'>
                                                                        <div className='btn btn-primary' style={{ width: '100%', marginTop: '1em', marginBottom: '1em', background: types[type.type.name] }}>{type.type.name}</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </li>
                                                <li className="list-group-item">Height: {response.data.height}</li>
                                                <li className="list-group-item">Weight: {response.data.weight}</li>
                                                <li className="list-group-item">Base Experience: {response.data.base_experience}</li>
                                                <li className="list-group-item">Skills: {response.data.abilities.map((ability, index) => {
                                                    return (
                                                        <div key={index} className='btn btn-primary' style={{ marginRight: '0.5em' }}>
                                                            {ability.ability.name}
                                                        </div>
                                                    )
                                                })}</li>
                                            </ul>
                                        </div>
                                    )
                                }
                                return (<div>Default message before request is made.</div>)
                            }}
                        </Get>
                    </div>
                </div>
            </div>
        )
    }
}

export default Details
