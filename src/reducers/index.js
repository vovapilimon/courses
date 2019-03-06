import { LOAD_PARAMS, LOAD_CONTENTS, FILTER, SEARCH, IS_BONUS } from '../constants/App'

const initialState = {
  options:{
    subjects: [],
    genres: [],
    grades: [],
  },
  byId:{},
  allIds:[],
  filter:{
    subject : "",
    genre : "",
    grade : "",
    search : ""
  },
  isBonus: false,
};

export default function data(state = initialState, action) {
  switch (action.type) {
    case LOAD_PARAMS:
      return {
        ...state,
        options:{...action.payload},
        filter :{
          ...state.filter,
          subject : action.payload.subjects[0],
          genre : action.payload.genres[0],
          grade : action.payload.grades[0],
        }
      };
    case LOAD_CONTENTS:
      return { ...state, ...action.payload};
    case FILTER:{
      const {param, value} = action.payload;
      return {
        ...state,
        filter : {
          ...state.filter,
          [param] : value,
        }
      };
    }
    case SEARCH:{
      const {value} = action.payload;
      return {
        ...state,
        filter : {
          ...state.filter,
          search : value,
        }
      };
    }
    case IS_BONUS:{
      return {...state, isBonus:action.isBonus};
    }
    default:
      return state;
 }
}
