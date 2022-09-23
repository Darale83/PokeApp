import React from "react";
import "./Pagination.css";

export default function Paginado({
  pokemonsPerPage,
  allPokemons,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="ulPos">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="pagination" key={number}>
              <button
                className={currentPage === number ? "active" : "paginationBtn"}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}
