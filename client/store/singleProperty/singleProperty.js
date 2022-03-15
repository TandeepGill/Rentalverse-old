import axios from 'axios';

// ACTION TYPES
const GET_SINGLE_PROPERTY = 'GET_SINGLE_PROPERTY';
const RESET_SINGLE_PROPERTY = 'RESET_SINGLE_PROPERTY';
const DELETE_SINGLE_PROPERTY = 'DELETE_SINGLE_PROPERTY';

// ACTION CREATORS
export const getSingleProperty = (property) => {
  return { type: GET_SINGLE_PROPERTY, property };
};

export const resetSingleProperty = () => {
  return { type: RESET_SINGLE_PROPERTY };
};

export const removeSingleProperty = () => {
  return { type: DELETE_SINGLE_PROPERTY };
};

// THUNK CREATORS
export const fetchSingleProperty = (propertyId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/properties/${propertyId}`);
      dispatch(getSingleProperty(data));
    } catch (error) {
      return error;
    }
  };

export const deleteSingleProperty = (propertyId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.delete(`/api/properties/${propertyId}/delete`);
      dispatch(removeSingleProperty(data));
    } catch (error) {
      return error;
    }
  };

const initialState = {};

// REDUCER
export default function singlePropertyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PROPERTY:
      return action.property;
    case RESET_SINGLE_PROPERTY:
      return initialState;
    case DELETE_SINGLE_PROPERTY:
      return initialState;
    default:
      return state;
  }
}
