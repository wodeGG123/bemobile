export default function(state=false, action){
    switch (action.type) {
        case 'SET_DEVICE_SIZE':
          return action.data;break;
        default:
          return state;break;
    }
}