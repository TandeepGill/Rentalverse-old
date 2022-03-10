import axios from 'axios';

// ACTION TYPES
const GET_SINGLE_LEASE = 'GET_SINGLE_LEASE';
const RESET_SINGLE_LEASE = 'RESET_SINGLE_LEASE';

// ACTION CREATORS
export const getSingleLease = (lease) => {
  return { type: GET_SINGLE_LEASE, lease };
};

export const resetSingleLease = () => {
  return { type: RESET_SINGLE_LEASE };
};

// THUNK CREATORS
export const fetchSingleLease = (propertyId) =>
  async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/properties/${propertyId}/lease`);
      dispatch(getSingleLease(data));
    } catch (error) {
      return error;
    }
  };

const initialState = {};

// REDUCER
export default function singleLeaseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_LEASE:
      return action.lease;
    case RESET_SINGLE_LEASE:
      return initialState;
    default:
      return state;
  }
}
