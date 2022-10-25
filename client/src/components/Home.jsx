import React, { useEffect, useState } from "react";
import "./Style/Home.css";
import Cards from "./Cards"
import Nav from "./Nav";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paginado from "./Paginado";
import { Area, byActiv, byContinent, getAllCountrys, orden} from "../redux/action";
import LOGO from './Assets/world.gif'
import Footer from "./Footer.jsx"




export default function Home(){
const continents = ["Africa", "Antarctica", "Asia","Europe", "North America", "Oceania", "South America"]

let allCountrys = useSelector(state =>state.countrys);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAllCountrys())
   },[dispatch])
   //----- paginado ------- 
  const [paginaActual, setPaginaActual] = useState(1);
   const [countryPorPagina, setCountryPorpagina] = useState(10);
   const indexUltimocountry = (paginaActual * countryPorPagina);
   const indexPrimercountry = indexUltimocountry - countryPorPagina;
   const countrysActuales = allCountrys?.slice(indexPrimercountry,indexUltimocountry);

   const paginado = (numeroDePagina)=>{
       setPaginaActual(numeroDePagina)
        };
         //----- paginado ------- 
         //---------filt activity----
         function filtActiv (e) {
          e.preventDefault(e)
          dispatch(byActiv(e.target.value))
          }
         //-----------Filtrado por Continente-----------
         function conti (e) {
         e.preventDefault(e)
         dispatch(byContinent(e.target.value))
         }
         //--------------sort ------------
         function zort (e){
          e.preventDefault(e);
          dispatch(orden(e.target.value))
          setPaginaActual(1)
          setOrder(`${e.target.value}`)
        }
        const [order, setOrder] = useState('')
        useEffect(()=>{
          dispatch(getAllCountrys())
         },[dispatch])
         //--------------sort ------------
          function area(e){
            e.preventDefault(e);
            dispatch(Area())

          }
  return(
      <div path="/Home" className="cointainerH">
         <Route strict path="/Home" component={Nav} />
         <div className="divSort">
         <select className="input" onChange={e=>zort(e)}>
          <option hidden disabled selected value>Sort by</option>
          <option value="-pop">-Population</option>
          <option value="+pop">+Population</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <select className="input"  onChange={conti}>
          
          <option hidden disabled selected value>Order continent</option>
          <option name="All">All Continents</option>
          {continents.map(e => <option name={e}>{e}</option>)}
        </select>
       <select className="input" onChange={filtActiv}>
        <option hidden disabled selected value>Filt Activity</option>
       <option value="all">All Countries</option>
        <option value="noA">NO Activitys</option>
        <option value="act">With Acticitys</option>
       </select>
       <button onClick={area} className="input">Area-50k</button>
         </div>
            {allCountrys?.length === 0?
         <img className="loguito" src={LOGO} alt="logo" max-height="30%"></img>:
        (<div className="cart">
          <Cards  allCountrys={countrysActuales}/>
        </div>)}
        <div>
      <Paginado  countryPorPagina={countryPorPagina} allCountrys={allCountrys.length} paginado={paginado}/>
  </div>
  <Footer />
       </div>
       )
}

/*  const allG = useSelector(state => state.games);
  console.log(allG)
  const zort = allG.sort((a,b)=>{return a.name>b.name?1:a.name<b.name?-1:0}) */