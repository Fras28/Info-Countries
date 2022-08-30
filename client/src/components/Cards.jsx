import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCountrys } from "../redux/action";
import  Card  from "./Card.jsx";
import {Link} from "react-router-dom"
import "./Style/Cards.css"
export default function Cards({allCountrys}) {
  let dispatch = useDispatch();
  //let selecto = useSelector((state) => state.games);
  useEffect(() => {
    dispatch(getAllCountrys());
  }, [dispatch]);
  return (
    <div className="carta" >
      {allCountrys?.map((e) => (
          <Link to={`/home/${e.cca3}`}>
          <Card key={e.cca3} name={e.name} flags={e.flags} id={e.cca3} continente={e.continents}/>
          </Link>
        ))}
    </div>
  );
}
