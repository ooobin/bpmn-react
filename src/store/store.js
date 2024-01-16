// store.js
import { createStore } from "redux";

const initialState = {
    // 初始状态
    yourStateProperty: "initial value",
    // 可以在这里添加更多的初始状态属性
};

const store = createStore((state = initialState) => state);

export default store;
