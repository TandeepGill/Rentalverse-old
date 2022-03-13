import axios from 'axios';

// ACTION TYPES
const GET_SINGLE_LEASE = 'GET_SINGLE_LEASE';
const RESET_SINGLE_LEASE = 'RESET_SINGLE_LEASE';
const ADD_NEW_LEASE = 'ADD_NEW_LEASE';
const END_CURRENT_LEASE = 'END_CURRENT_LEASE';

// ACTION CREATORS
export const getSingleLease = (lease) => {
  return { type: GET_SINGLE_LEASE, lease };
};

export const resetSingleLease = () => {
  return { type: RESET_SINGLE_LEASE };
};

export const setNewLease = (lease) => {
  return { type: ADD_NEW_LEASE, lease };
};

export const setEndCurrentLease = () => {
  return { type: END_CURRENT_LEASE };
};

// THUNK CREATORS
export const fetchSingleLease = (propertyId) => {
  return async function (dispatch) {
    try {
      let { data } = await axios.get(`/api/properties/${propertyId}/lease`);
      dispatch(getSingleLease(data));
    } catch (error) {
      return error;
    }
  };
};

export const addNewLease = (lease, ids) => {
  return async function (dispatch) {
    try {
      let propertyId = ids.propertyId;
      let userId = ids.userId;

      let { data } = await axios.post(
        `/api/properties/${propertyId}/lease/new/${userId}`,
        lease
      );
      dispatch(setNewLease(data));
    } catch (error) {
      return error;
    }
  };
};

export const endCurrentLease = (leaseId) => {
  return async function (dispatch) {
    try {
      let { data } = await axios.put(`/api/tenants/${leaseId}/end`);
      dispatch(setEndCurrentLease());
    } catch (error) {
      return error;
    }
  };
};

const initialState = {};

// REDUCER
export default function singleLeaseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_LEASE:
      return action.lease;
    case RESET_SINGLE_LEASE:
      return initialState;
    case ADD_NEW_LEASE:
      return action.lease;
    case END_CURRENT_LEASE:
      return initialState;
    default:
      return state;
  }
}
