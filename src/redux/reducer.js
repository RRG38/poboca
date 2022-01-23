import axios from 'axios'

const initialState = {
  username: '',
  school: '',
  loggedIn: false
};

const LOGGED_IN = 'LOGGED_IN';
const LOGGED_OUT = 'LOGGED_OUT';

export const loginUser = (loginInfo) => {
    const user = axios.post('/auth/login', loginInfo).then(res => {
        // console.log(res.data)
        return res.data });

    // console.log(user);
    return {
        type: LOGGED_IN,
        payload: user
    }
}

export const logoutUser = () => {
    const user = axios.get('/auth/logout').then(res => {
        return res.data
    })
    return {
        type: LOGGED_OUT,
        payload: user
    }
}

export default function reducer(state=initialState, action){
    switch(action.type){
        case `${LOGGED_IN}_PENDING`: {
            return {
                ...state,
            }
        }

        case `${LOGGED_IN}_FULFILLED`: {
            console.log(action.payload);
            return {
                ...state,
                loggedIn: true,
                username: action.payload.username,
                school: action.payload.school
            }
        }

        case `${LOGGED_IN}_REJECTED`: {
            return {
                ...state,
                errorMessages: action.payload
            }
        }
        case `${LOGGED_OUT}_PENDING`: {
            return {
                ...state,
            }
        }

        case `${LOGGED_OUT}_FULFILLED`: {
            // console.log(action.payload);
            return {
                ...state,
                loggedIn: false
            }
        }

        case `${LOGGED_OUT}_REJECTED`: {
            return {
                ...state,
                errorMessages: action.payload
            }
        }
        default:{
            return state;
        }
    }
}
