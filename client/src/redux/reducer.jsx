import {
  GET_ALL_COUNTRY,
  GET_ALL_DETAIL,
  POST_ACTIVITY,
  SEARCH_CLEANER,
  SEARCH_COUNTRY,
  SORT_COUNTRY,
  FILT_CONTINENTE,
  FILT_ACTIV,
  GET_AREA
} from "./action";
const initialState = {
  countrys: [],
  countrys1: [],
  detail: {},
  searchC: [],
  ordenado: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  let copiaCountrys = state.countrys1;
  switch (type) {
    case GET_ALL_COUNTRY:
      return {
        ...state,
        countrys: payload,
        countrys1: payload,
      };
    case GET_ALL_DETAIL:
      return {
        ...state,
        detail: payload[0],
      };
    case SEARCH_COUNTRY:
      return {
        ...state,
        searchC:
          payload.length > 0 ? payload : [{ name: "Country n/a"}],
      };
    case SEARCH_CLEANER:
      return {
        ...state,
        searchC: [],
      };
    case POST_ACTIVITY:
      return {
        ...state,
      };
    //-------ZORT -------------
    case SORT_COUNTRY:

      const zort =
        payload === "A-Z"
          ? state.countrys.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : payload === "Z-A"
          ? state.countrys.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            })
          : payload === "-pop"
          ? state.countrys.sort(function (a, b) {
              if (a.population > b.population) {
                return 1;
              }
              if (b.population > a.population) {
                return -1;
              }
              return 0;
            })
          : payload === "+pop"
          ? state.countrys.sort(function (a, b) {
              if (a.population > b.population) {
                return b.population - a.population;
              }
              if (b.population > a.population) {
                return a.population - b.population;
              }
              return 0;
            })
          : state.countrys;
      return {
        ...state,
        ordenado: zort,
      };
    case FILT_CONTINENTE:
      const contin =
        payload === "All Continents"
          ? copiaCountrys
          : copiaCountrys.filter((e) => e.continents === payload);
      return {
        ...state,
        countrys: contin,
      };
    //-----------------------
    case FILT_ACTIV:
      let activ = [];
      payload === "noA"
        ? activ = copiaCountrys.filter((e) => e.activities.length === 0)
        : payload === "act"
        ? activ = copiaCountrys.filter((e) => e.activities.length >= 1) 
        : activ = copiaCountrys;
        console.log(activ)
      return {
        ...state,
        countrys: activ,
      };
    //-------------------
      case GET_AREA:
        console.log(payload ,"acaaaa")
        let areaC = payload.filter(e=> e.area <= 50000)
        return{
          ...state,
          countrys:areaC,
        };
    default:
      return { ...state };
  }
};

export default rootReducer;
