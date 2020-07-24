import React, { createContext, useReducer, useContext } from "react";
import { 
    GET_ALL_EMPLOYEES,
    UPDATE_EMPLOYEES,
    UPDATING_EMPLOYEE,
    UPDATE_EMPLOYEE,
    REMOVE_EMPLOYEE,
    SET_CURRENT_EMPLOYEE,
    ADD_EMPLOYEE,
    LOADING,
    ADD_SKILL,
    REMOVE_SKILL,
    FILTER_EMPLOYEES,
    SHOW_FILTER,
    HIDE_FILTER,
    ADD_FILTER,
    REMOVE_FILTER,
    SEARCH_EMPLOYEES,
    SELECT_SEARCH_CATERGORY
} from "./actions";


const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
    switch (action.type) {
    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: action.employees,
        totalEmployees: action.employees
      }
    case SET_CURRENT_EMPLOYEE:
      return {
        ...state,
        currentEmployee: action.employee,
        loading: false
      };
    case UPDATING_EMPLOYEE:
      console.log("IN GLOBALE STORE ACTION AND STATE",action, state)
      
      return{
        ...state,
        currentEmployee:{ ...state.currentEmployee, ...action.update}
      }
    case UPDATE_EMPLOYEES:
      return {
        ...state,
        employees: [...action.employees],
        loading: false
      };
    case FILTER_EMPLOYEES:
        const {totalEmployees, filters} = state;
        let filteredEmployees = totalEmployees.filter(employee=>{
          for(let i=0; i<filters.length; i++){
            if(!employee.skills.includes(filters[i])){
              
              return false;
            }
          }
          return true;
        })
        
      return{
        ...state,
        employees: filteredEmployees
      }
    case UPDATE_EMPLOYEE:
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
        filters: [action.filter, ...state.filters],
        employees:[...state.employees.filter(employee=>employee.skills.includes(action.filter))]
      }
    case REMOVE_FILTER:
       let newFilter = state.filters.filter((filter)=>{
        return filter !== action.filter
      })
        return{
          ...state,
          filters: [...newFilter]
        }
    case SELECT_SEARCH_CATERGORY:
      return{
        ...state,
        category:action.category
      }
    case SEARCH_EMPLOYEES:
        return {
          ...state,
          employees: state.totalEmployees.filter(employee=>{
            for(let i=0; i<action.search.length;i++){
              let search = (action.search[i]).toLowerCase();
              let data = (employee[state.category][i]).toLowerCase();
              if(search!== data){
                return false;
              }
            }
            return true;
          })
        }
    default:
      return state;
    }
};

const StoreProvider = ({value=[], ...props})=>{
    const [state, dispatch] = useReducer(reducer, {
        totalEmployees:[],
        employees:[],
        currentEmployee:{
            id:0,
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
        filters:[],
        search:"",
        category:"title"
    });
    return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = ()=> {
    return useContext(StoreContext);
}

export {StoreProvider, useStoreContext};