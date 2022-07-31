import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  CLEAR_ERROR
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };
    const { data } = await axios.post("https://oneshoptop.herokuapp.com/api/v1/order/new", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const myOrder = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDER_REQUEST });

    const { data } = await axios.get("https://oneshoptop.herokuapp.com/api/v1/orders/me");

    dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    console.log(error);
    dispatch({ type: MY_ORDER_FAIL, payload: error.response.data.message });
  }
};

// Get All Orders -- ADMIN
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDER_REQUEST });

    const { data } = await axios.get("https://oneshoptop.herokuapp.com/api/v1/admin/orders");

    dispatch({ type: ALL_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    console.log(error);
    dispatch({ type: ALL_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const updateOrders = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST });
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    };
    const { data } = await axios.put(
      `https://oneshoptop.herokuapp.com/api/v1/admin/orders/${id}`,
      order,
      config
    );
    console.log(data);

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`https://oneshoptop.herokuapp.com/api/v1/admin/orders/${id}`);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    console.log(error);
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`https://oneshoptop.herokuapp.com/api/v1/order/${id}`);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ORDER_DETAILS_FAIL
      //   payload: error.response.data.message
    });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
