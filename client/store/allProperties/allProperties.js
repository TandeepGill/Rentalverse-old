import axios from 'axios';

// ACTION TYPES
const GET_ALL_PROPERTIES = 'GET_ALL_PROPERTIES';

// ACTION CREATORS
export const getAllProperties = (properties) => {
  return { type: GET_ALL_PROPERTIES, properties };
};

// THUNK CREATORS
export const fetchAllProperties = (userId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/properties/${userId}`);
      dispatch(getAllProperties(data));
    } catch (error) {
      return error;
    }
  };

const initialState = [];

// REDUCER
export default function allPropertiesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PROPERTIES:
      return action.properties;
    default:
      return state;
  }
}
