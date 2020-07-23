import React, { createContext, useReducer, useContext } from "react";
import { 
    UPDATE_EMPLOYEE,
    REMOVE_EMPLOYEE,
    SET_CURRENT_EMPLOYEE,
    ADD_EMPLOYEE,
    LOADING 
} from "./actions";


const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
    switch (action.type) {
    case SET_CURRENT_EMPLOYEE:
      return {
        ...state,
        currentEmployee: action.employee,
        loading: false
      };
  
    case UPDATE_EMPLOYEE:
      return {
        ...state,
        employees: [...action.employees],
        loading: false
      };
  
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [action.employee, ...state.employees],
        loading: false
      };
  
    case REMOVE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter((employee) => {
          return employee._id !== action._id; 
        })
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
  
    default:
      return state;
    }
};

const StoreProvider = ({value=[], ...props})=>{
    const [state, dispatch] = useReducer(reducer, {
        employees:[],
        currentEmployee:{
            _id:0,
            title:"",
            firstName:"",
            lastName:"",
            email:"",
            portrait:"",
            skills:[]
        },
        loading:false
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = ()=> {
    return useContext(StoreContext);
}

export {StoreProvider, useStoreContext};