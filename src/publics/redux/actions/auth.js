import axios from 'axios';

import '../../../config';


export const login = (body) => {
	console.warn(apiUrl)
  return{
    type : 'POST_LOGIN',
    payload : axios.post(`${apiUrl}/auth/login`, body)
  }
}
export const logout = (token, refreshToken) => {
	return{
		type : 'POST_LOGOUT',
		payload : axios.post(`${apiUrl}/auth/logout`, 
			{refreshToken}, 
			{ headers : 
				{ Authorization : `Bearer ${token}`}
			}
		)
	}
}

export const register = (body) => {
	return{
		type : 'POST_REGIST',
		payload : axios.post(`${apiUrl}/auth/register`, body)
	}
}
