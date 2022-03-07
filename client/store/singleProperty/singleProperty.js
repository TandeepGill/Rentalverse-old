import axios from 'axios';

// ACTION TYPES
const GET_SINGLE_PROPERTY = 'GET_SINGLE_PROPERTY';

// ACTION CREATORS
export const getSingleProperty = (property) => {
  return { type: GET_SINGLE_PROPERTY, property };
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

const initialState = [];

// REDUCER
export default function singlePropertyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_PROPERTY:
      return action.property;
    default:
      return state;
  }
}
