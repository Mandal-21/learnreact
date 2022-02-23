const initialState = {
    tasks: [],
    taskID: 0,
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                ...state,
                tasks: action.payload
            }
        case 'SET_TASK_ID':
            return {
                ...state,
                taskID: action.payload
            }
        default:
            return state;
    }
}

export default taskReducer;