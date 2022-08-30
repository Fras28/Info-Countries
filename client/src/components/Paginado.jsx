import React from "react";

function Paginado(props) {
  const numeroDepagina = [];

  for (let i = 0; i < Math.ceil(props.allCountrys / props.countryPorPagina); i++) {
    numeroDepagina.push(i + 1);
  }

  return (
    <div>
      <ul>
        {numeroDepagina?.map((numeroPagi) => {
          return (
            <button
            className="btPag"
              key={numeroPagi}
              onClick={() => {
                props.paginado(numeroPagi);
              }}
            >
              {numeroPagi}
            </button>
          );
        })}
      </ul>
    </div>
  );
}

export default Paginado;
