import React, { Component } from 'react';
import './logo.css';
export class Logo extends Component {
    render() {
        return (
            <div className="row main-row justify-content-center">
                <div class="col-md-4">
                    <a href="/">
                        <img style={{ width: '30em' }} className='img-fluid' src={require('../../assets/logo.png')} alt="Logo" />
                    </a>
                </div>
            </div>
        )
    }
}

export default Logo
