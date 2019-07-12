import axios from 'axios';

import '../../../config';

export const getSongs = (token) => {
  return{
    type: 'GET_SONGS',
    payload : axios.get(`${apiUrl}/songs`,
    { headers : { Authorization : `Bearer ${token}`} })
  }
}

export const getSong = (id, token) => {
  return{
    type: 'GET_SONG',
    payload : axios.get(`${apiUrl}/song/${id}`)
  }
}
