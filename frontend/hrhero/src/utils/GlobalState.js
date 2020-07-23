import React, { createContext, useReducer, useContext } from "react";
import { 
    UPDATE_CURRENT_EMPLOYEES,
    UPDATE_CURRENT_EMPLOYEE,
    REMOVE_EMPLOYEE,
    SET_CURRENT_EMPLOYEE,
    ADD_EMPLOYEE,
    LOADING,
    ADD_SKILL,
    REMOVE_SKILL,
    SHOW_FILTER,
    HIDE_FILTER,
    ADD_FILTER,
    REMOVE_FILTER
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
      
    case UPDATE_CURRENT_EMPLOYEES:
      return {
        ...state,
        employees: [...action.employees],
        loading: false
      };
    case UPDATE_CURRENT_EMPLOYEE:
      return {
        ...state,
        employees: [action.employee, ...state.employees.filter((employee) => {
          return employee.id !== action.employee.id; 
        })
      ]
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
          return employee.id !== action.id; 
        })
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_SKILL:
      return {
        ...state,
        formSkills:[action.skill, ...state.formSkills]
      }
    case REMOVE_SKILL:
      return{
        ...state,
        formSkills: state.formSkills.filter((skill)=>{
          return skill !== action.skill
        })
      }
    case SHOW_FILTER:
      return{
      ...state,
      showFilter:true
    }
    case HIDE_FILTER:
      return{
        ...state,
        showFilter:false
      }
    case ADD_FILTER:
      return{
        ...state,
        filters: [action.filter, ...state.filters]
      }
    case REMOVE_FILTER:
        return{
          ...state,
          filters: state.filters.filter((filter)=>{
            return filter !== action.filter
          })
        }
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
        loading:false,
        formSkills:[],
        showFilter:false,
        filters:[]
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = ()=> {
    return useContext(StoreContext);
}

export {StoreProvider, useStoreContext};