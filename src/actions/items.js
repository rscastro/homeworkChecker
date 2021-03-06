
export function reset() {
  return {
    type: 'RESET',
  };
}

export function loginError(val) {
  return {
    type: 'LOGIN_ERROR',
    val,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function userAnswers(set) {
  return {
    type: 'USER_ANSWERS',
    set: set
  };
}

export function setUser(username, callback) {
  if (username.type === 'teacher') {
    return function(dispatch) {
      $.ajax({
        method: 'GET',
        url: '/api/teacherassignments/' + username.user_name,
        dataType: 'json',
        cache: false,
        success: function(data) {
          dispatch({
            type: 'SET_USER',
            payload: {
              user: data.user,
              data: data.data
            }
          });
          dispatch({
            type: 'LOGIN_ERROR',
            val: false
          });
        },
        error: function(error) {

        }
      });
    };
  } else {
    return function(dispatch) {
      $.ajax({
        method: 'GET',
        url: '/api/studentassignments/' + username.user_name,
        dataType: 'json',
        cache: false,
        success: function(data) {
          dispatch({
            type: 'SET_USER',
            payload: {
              user: data.user,
              data: data.data
            }
          });
        },
        error: function(error) {
          callback(error);
        }
      });
    };
  }

}

export function initializeQuestion(question) {
  return {
    type: 'SET_QUESTION',
    question,
  };
}

export function initializeAnswers(id) {
  if (id === '') {
    return {
      type: 'SET_ANSWERS',
      payload: []
    }
  } else {
    return function(dispatch) {
      $.ajax({
        method: 'GET',
        url: '/api/populateAnswers/' + id,
        dataType: 'json',
        cache: false,
        success: function(data) {
          dispatch({
            type: 'SET_ANSWERS',
            payload: data
          });
        },
        error: function(error) {
          //callback();
        }
      });
    };
  }

}