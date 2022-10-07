import React from 'react';

const Pagination = ({ pokemonsPerPage, totalPokemon, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPokemon / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} style={{ cursor: "pointer" }} className={`page-item ${currentPage === number ? "active" : ""}`}>
                        <span onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
