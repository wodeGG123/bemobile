export default function(state=false, action){
    switch (action.type) {
        case 'SET_USER_INFO':
          return action.data;break;
        default:
          return state;break;
    }
}