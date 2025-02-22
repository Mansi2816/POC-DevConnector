import axios from 'axios'
import { setAlert } from './alert'

import { GET_REPOS,GET_PROFILES, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, DELETE_ACCOUNT, CLEAR_PROFILE } from './types'

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

//Get all profiles
export const getProfiles = () => async dispatch => {
 dispatch({type: CLEAR_PROFILE})
  try {
    const res = await axios.get('/api/profile')
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}


//Get Profile by id: 

//Get all profiles
export const getProfilesById = (userId) => async dispatch => {
   try {
     const res = await axios.get(`/api/profile/user/${userId}`)
     dispatch({
       type: GET_PROFILE,
       payload: res.data
     })
   } catch (error) {
     dispatch({
       type: PROFILE_ERROR,
       payload: { msg: error.response.statusText, status: error.response.status }
     })
   }
 }
 
//Get github Repos
export const getGitHubRepos = (username) => async dispatch => {
  
  try {
    const res = await axios.get(`/api/profile/github/${username}`)
    dispatch({
      type: GET_REPOS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

//create or update a profile
//history has a push method that will redirect to client side route
export const createProfile =
  (formData, history, edit = false) =>
  async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await axios.post('/api/profile', formData, config)
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })

      dispatch(
        setAlert(edit ? 'Profile updated' : 'profile created', 'success')
      )
      if (!edit) {
        history.push('/dashboard')
      }
    } catch (error) {
      if (error) {
        const errors = error.response.data.errors
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        dispatch({
          type: PROFILE_ERROR,
          payload: {
            msg: error.response.statusText,
            status: error.response.status
          }
        })
      }
    }
  }

//Add Experience

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put('/api/profile/experience', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Added', 'success'))

    history.push('/dashboard')
  } catch (error) {
    if (error) {
      const errors = error.response.data.errors
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      })
    }
  }
}

//Add Education

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.put('/api/profile/education', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Added', 'success'))

    history.push('/dashboard')
  } catch (error) {
    if (error) {
      const errors = error.response.data.errors
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      })
    }
  }
}

//Delete experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)
    //we will dispatch update profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Removed', 'success'))
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}


//delete education 

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)
    //we will dispatch update profile
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Removed', 'success'))
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}

//delete account and profile
export const deleteAccount = () => async dispatch => {
  
  if(window.confirm('Are you sure you want to delete')) {
  try {
    await axios.delete(`/api/profile`)
    //we will dispatch update profile
    dispatch({type:CLEAR_PROFILE})

    dispatch({type:DELETE_ACCOUNT})


    dispatch(setAlert('Your account has been permanently deleted'))
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
}
}

