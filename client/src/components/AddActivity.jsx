import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { addActivity, getAllCountrys } from "../redux/action";

import Nav from "./Nav";

export default function AddActivity() {

  let countrys = useSelector((state) => state.countrys);
  const [inputs, setInputs] = useState({
    name:'',
    difficulty:0,
    duration:'',
    season:"",
    country:[]
  })
  // ----------------- form Controler ----------
  const [errorForm, setErrorF] = useState({});
  const validate =(data)=>{
  let error = {};
  if(data.name.length<3 ||data.name.length>15 ) error.name = "invalid name";
  if(!data.country[0]) error.country = "you don't select Country"
  if(data.duration <= 0 || data.duration >= 24 )error.duration = "the duration you select it cant be"
  if(!data.season) error.season = "you don't select Season"
  return error
}
function invalidAdd(inputs){
  let error = validate(inputs)//=error(26){error.name,error.country ,error.duration ,error.season}
  if(error.name||error.difficulty||error.duration||error.season||error.country) return true
}
  // ----------------- form Controler ----------  
  const seasons = ["summer", "autumn", "winter", "spring"];
  const dispatch = useDispatch();
  useEffect(() => {console.log("montado")
    dispatch(getAllCountrys());
    return()=>{console.log("desmontado")
        dispatch(getAllCountrys())}
  }, [dispatch]);


var  handleOnChange = (e)=>{    
    console.log(inputs)
    setInputs({
        ...inputs,
        [e.target.name]:e.target.value
    });
    setErrorF(validate(inputs))
  }
const handleOnSeason = (e)=>{
        console.log(inputs)
        setInputs({
            ...inputs,
           season: e.target.value
           //genero: [new Set([...inputs.genero, e.target.value])]
        })    
        }
const handleOnCountry = (e)=>{
            console.log(inputs)
            setInputs({
                ...inputs,
               country:[...inputs.country, e.target.value]
               //genero: [new Set([...inputs.genero, e.target.value])]
            })    
            }
function handleSubmit(e) {
                e.preventDefault();
                dispatch(addActivity(inputs));
            
                alert('Actividad agregada con excito!') 
                setInputs({
                    name:'',
                    difficulty:0,
                    duration:'',
                    season:"",
                    country:[]
                }); 
              }


  return (
    <div>
      <Route strict path="/Home" component={Nav} />
      <form className="containerC" onSubmit={handleSubmit}>
        <div>
          <div className="tittleInp"> {!inputs.name?<label className="errorF">*</label>:<p></p>}
          Activity</div>
          <input
            type="text"
            name="name"
            className="inputable"
            placeholder="Ex: PaintBall..."
            onChange={handleOnChange}
          />
        </div>
        <div>
          <div className="tittleInp">Difficulty 1-5:</div>
          <input
            type="range"
            name="difficulty"
            className="difImp"
            min="1"
            max="5"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <div className="tittleInp"> {!inputs.duration?<label className="errorF">*</label>:<p></p>} Duration "hs":</div>
          <input
            type="number"
            name="duration"
            className="inputable"
            min="0"
            placeholder="Ex:hours..."
            onChange={handleOnChange}
          />
       
        </div>
        <div>
          <div className="tittleInp"> {!inputs.season?<label className="errorF">*</label>:<p></p>} Season:</div>
          <select className="inputable" onChange={handleOnSeason}>
          <option >Choose season</option>
            {seasons.map((e) => (
              <option name="season">{e}</option>
            ))}
          </select>
         
        </div>
        <div>
          <div className="tittleInp"> Country:</div>
          <select className="inputable" onChange={handleOnCountry}>
            <option >Choose country</option>
            {countrys?.map((e) => (
              <option name="country">{e.name}</option>
            ))}
          </select>
        </div>
        <div>
          {/*------------ERRORES-------*/}
        {!inputs.name?<p></p>:
          validate(inputs).name?<p className="errorF">
          -the activity name must be between 3 and 15 characters-</p>:<p></p>}
             {!inputs.duration?<p></p>:
          validate(inputs).duration?<p className="errorF">-Error duration +0hs or -25hs-</p>:<p></p>}
          {inputs.season ==="Choose country"?<p></p>:
          validate(inputs).season?<p className="errorF">-Please select season-</p>:<p></p>}
          {validate(inputs).country?<p className="errorF">-Please select country-</p>:<p></p>}
           {/*------------ERRORES-------*/}
          <button className="inputable" disabled={invalidAdd(inputs)} type="submit" >
            Add Activity
          </button>
        </div>
      </form>
    </div>
  );
}
