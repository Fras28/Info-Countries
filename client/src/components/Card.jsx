import React from "react";


export default function Card ({ name, flags,continente }) {

  return (
 /*  <div className="card">
      <div class="card-image">
          <img className="imgCard" src={flags}  alt={name + "portada"} />
      </div>
          <div class="card-description">
        <p class="text-title"> {name}</p>
        <p class="text-title"> {continente}</p>
           </div>
    </div>
  );
}*/

<div className="card">
    <div className="card-image">
        <img className="imgCard" src={flags}  alt={name + "portada"}  />
    </div>
    <div className="card-description">
        <b className="text-title"> {name}</b>
        <p className="text-title"> {continente}</p>
       

    </div>
</div>
  );
}


