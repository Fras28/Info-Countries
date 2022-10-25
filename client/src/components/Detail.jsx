import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import  { Route, useParams } from "react-router-dom";
import { getDetail } from "../redux/action";
import Nav from "./Nav";
import "./Style/Detail.css"
import Footer from "./Footer.jsx"

export default function Detalles (){
    let dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
      dispatch(getDetail(id));
    }, [dispatch, id]);
   const {flags,name,capital,continents,cca3,subregion,area,population,activities,idioma}= useSelector(state=> state.detail);

    return(
       <div className="DetailCol">
            <Route strict path="/Home" component={Nav} />
            <div className="contD">
       <div >
          <img className="imgCard" src={flags}  alt={ "portada"} />
        </div>
        <div className="contD1">
          <h2> {name}</h2>
          <h3 >Capital: {capital}</h3>
          <p ><b>Continent: </b>  {continents}</p>
          <p> <b>Id:  </b>{cca3}</p>
          <p> <b>Subregion: </b>{subregion}</p>
          <p> <b>Area: </b>{area}km²</p>
          <p> <b>Population: </b> {population}</p>
          {activities?<h3><b>Activities: </b></h3>:""}
          {activities?.map(e=><div>
            <ul>
            <li className="pd"><b>Name:</b>{e.name}</li>
            <li><b>Dificultad:</b><p className="pd">{e.difficulty}</p></li>
            <li><b>Duration:</b><p className="pd">{e.duration}HS</p></li>
            <li><b>Season:</b><p className="pd">{e.season}</p></li>
            <li><b>Idioma:</b><p className="pd">{e.idioma}</p></li>
            </ul>
          </div>
          )}
          
        </div>
    </div>
    <div>
  <Footer />
       </div>
      </div>
    )
}