import axios from "axios";
export const GET_ALL_COUNTRY = "GET_ALL_COUNTRY";
export const GET_ALL_DETAIL = "GET_ALL_DETAIL";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const SEARCH_CLEANER = "SEARCH_CLEANER";
export const SORT_COUNTRY = "SORT_COUNTRY";
export const SORT_COUNTRY_POPULATION = "SORT_COUNTRY_POPULATION";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const FILT_CONTINENTE = "FILT_CONTINENTE";
export const FILT_ACTIV = "FILT_ACTIV";
export const GET_AREA = "GET_AREA";

export const getAllCountrys = () => {
  return async function (dispatch) {
    return fetch("http://localhost:3001/countrys")
      .then((res) => res.json())
      .then((res_json) => {
        dispatch({ type: GET_ALL_COUNTRY, payload: res_json });
      });
  };
};

export const getDetail = (id) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/countrys/${id}`)
      .then((res) => res.json())
      .then((res_json) => {
        dispatch({ type: GET_ALL_DETAIL, payload: res_json });
      });
  };
};

export const searchBar = (name) => {
  return async function (dispatch) {
    return fetch(`http://localhost:3001/countrys?name=${name}`)
      .then((res) => res.json())
      .then((res_json) => {
        dispatch({ type: SEARCH_COUNTRY, payload: res_json });
      });
  };
};

export const clearSearch = () => {
  return {
    type: SEARCH_CLEANER,
  };
};

export function orden(payload) {
  return {
    type: SORT_COUNTRY,
    payload: payload,
  };
}
export function byContinent(payload) {
  return {
    type: FILT_CONTINENTE,
    payload: payload,
  };
}
export function byActiv(payload) {
  console.log(payload);
  return {
    type: FILT_ACTIV,
    payload: payload,
  };
}

export const addActivity = (INFO) => {
  return async function (dispatch) {
    let response = await axios.post(
      "http://localhost:3001/countrys/addactivity",
      INFO
    );
    console.log(response.status);
    if (response.status === 200) {
      alert("Actividad agregada con exito!");
      dispatch({
        type: POST_ACTIVITY,
        payload: response.data,
      });
    } else {
      console.log("aaaacaaaaaaa");
      alert(response.data);
    }
  };
};

export const Area = ()=>{
  return async function (dispatch) {
    return fetch("http://localhost:3001/countrys")
      .then((res) => res.json())
      .then((res_json) => {
        dispatch({ type: GET_AREA, payload: res_json });
      });
  }};
