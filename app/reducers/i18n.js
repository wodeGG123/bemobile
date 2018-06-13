export default function (state = false, action) {
    switch (action.type) {
        case 'SET_LANGUAGE':
            return action.data; break;
        default:
            return state; break;
    }
}