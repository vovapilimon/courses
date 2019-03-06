import { URL, LOAD_PARAMS, LOAD_CONTENTS, FILTER, SEARCH, IS_BONUS } from '../constants/App'
import axios from 'axios'
import json from '../config/data.json'

export function loadParams() {
  return (dispatch) => {
    dispatch({
      type: LOAD_PARAMS,
      payload: json
    })

    const {subjects,genres,grades} = json;
    const obj = {
      subject:subjects[0],
      genre:genres[0],
      grade:grades[0],
    };
    axios.post(URL, {
      data: JSON.stringify(obj)
    })
    .then(res=>{
      const byId = {};
      const allIds = [];
      const {items} = res.data;
      items.forEach((item)=>{
        byId[item.courseId] = item;
        allIds.push(item.courseId);
      })
      dispatch({
        type: LOAD_CONTENTS,
        payload: {byId, allIds},
      })
    })
  }
}

export function filterParams(param, value) {
  return {
    type: FILTER,
    payload: {param,value},
  }
}

export function onSearch(value) {
  return {
    type: SEARCH,
    payload: {value},
  }
}

export function onIsBonus(value) {
  return {
    type: IS_BONUS,
    isBonus: value,
  }
}
