
import React, { Component } from "react";
import { Get } from "react-axios";

class CardPokemon extends Component {

    render() {
        return (
            <div className="row">
                <Get url="https://pokeapi.co/api/v2/pokemon/" params={{ limit: "20", offset: "0" }}>
                    {(error, response, isLoading2, makeRequest2, axios) => {
                        if (error) {
                            return (<div>Something bad happened: {error.message} <button onClick={() => makeRequest2({ params: { reload: true } })}>Retry</button></div>)
                        }
                        else if (isLoading2) {
                            return (<div>Loading...</div>)
                        }
                        else if (response !== null) {
                            console.log("My response");
                            console.log(response.data);
                            return (
                                response.data.results.map(pokemon => {
                                    return (<div className="card col-md-3" style={{ width: "18rem" }}>
                                        <Get url={pokemon.url} params={{ limit: "1", offset: "0" }}>
                                            {(error2, response, isLoading, makeRequest, axios) => {
                                                if (error2) {
                                                    return (<div>Something bad happened: {error2.message} <button onClick={() => makeRequest({ params: { reload: true } })}>Retry</button></div>)
                                                }
                                                else if (isLoading) {
                                                    return (<div>Loading...</div>)
                                                }
                                                else if (response !== null) {
                                                    console.log(response);
                                                    return (<img className="card-img-top" src={response.data.sprites.front_shiny} alt="Dog" />)
                                                }
                                                return (<div>Default message before request is made.</div>)
                                            }}
                                        </Get>
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <a href="1" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>)
                                })
                            )
                        }
                        return (<div>Default message before request is made.</div>)
                    }}
                </Get>
            </div>
        );
    }
}

export default CardPokemon;
