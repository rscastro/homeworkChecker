const initialState = {
  user: '',
  items: [],
  question: '',
  answers: [],
  user_answers: [],
  login_error: false
};

export function items(state = initialState, action) {
  switch (action.type) {
  case 'ADD_ITEM':
    return {
      ...state,
      items: [
        ...state.items, {
          text: action.fields.name.value,
        },
      ],
    };

  case 'DELETE_ITEM':
    return {
      ...state,
      items: [
        ...state.items.slice(0, action.index),
        ...state.items.slice(+action.index + 1),
      ],
    };

    case 'LOGIN_ERROR':
      return {
        ...state,
        login_error: action.val ,
      };

    case 'SET_QUESTION':
    return {
      ...state,
      question: action.question
    };
    case 'USER_ANSWERS':
    return {
      ...state,
      user_answers: action.set
    };

    case 'SET_USER':
    console.log('SHOULD BE FROM API', action.payload)
      return {
        ...state,
        items: action.payload.data,
        user: action.payload.user,
      };
      case 'SET_ANSWERS':
      console.log('SHOULD BE FROM API', action.payload)
        return {
          ...state,
          answers: action.payload,
        };
        case 'LOGOUT':
        return {
          ...state,
          question: '',
          answers: [],
          user_answers: [],
          user: '',
          items: []
        };

      case 'RESET':
        return {
          ...state,
          question: '',
          answers: [],
          user_answers: [],
        };

  default:
    return state;
  }
}
