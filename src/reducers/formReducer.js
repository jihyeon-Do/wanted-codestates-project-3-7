import { CREATE_FORM, SUBMIT_FORM, DELETE_FORM } from '../actions';
import { initialState } from './initialState';

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FORM: {
      return {
        ...state,
        forms: [...state.forms, action.payload.form],
      };
    }
    case SUBMIT_FORM: {
      const forms = state.forms.map(item => {
        if (item.formId === action.payload.formId) {
          return {
            ...item,
            submitData: [...item.submitData, action.payload.data],
          };
        }
        return item;
      });

      return {
        ...state,
        forms,
      };
    }
    case DELETE_FORM: {
      return {
        ...state,
        forms: [
          ...state.forms.filter(el => el.formId !== action.payload.formId),
        ],
      };
    }
    default:
      return state;
  }
};
