import axios from 'axios';

// ACTION TYPES
const ADD_NEW_PROPERTY = 'ADD_NEW_PROPERTY';

// ACTION CREATORS
export const setProperty = (property) => {
  return {
    type: ADD_NEW_PROPERTY,
    property,
  };
};

// THUNK CREATORS
export const addNewProperty = (property, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/api/properties/new/${userId}`,
        property
      );
      dispatch(setProperty(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = [];

// REDUCER FUNCTION
export default function allItinerariesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_PROPERTY:
      return {
        ...state,
        properties: [...state.properties, action.property],
      };
    default:
      return state;
  }
}
