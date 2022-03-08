import axios from 'axios';

// ACTION TYPES
const GET_ALL_TENANTS = 'GET_ALL_TENANTS';

// ACTION CREATORS
export const getAllTenants = (tenants) => {
  return { type: GET_ALL_TENANTS, tenants };
};

// THUNK CREATORS
export const fetchAllTenants = (userId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/tenants/${userId}`);
      dispatch(getAllTenants(data));
    } catch (error) {
      return error;
    }
  };

const initialState = [];

// REDUCER
export default function allTenantsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TENANTS:
      return action.tenants;
    default:
      return state;
  }
}
