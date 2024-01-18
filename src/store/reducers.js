// reducers.js
const initialState = {
    // 初始状态
    yourStateProperty: "initial value",
    // 可以在这里添加更多的初始状态属性
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_YOUR_STATE_PROPERTY':
            return {
                ...state,
                yourStateProperty: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
