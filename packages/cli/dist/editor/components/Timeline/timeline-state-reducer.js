"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timelineStateReducer = void 0;
const timelineStateReducer = (state, action) => {
    if (action.type === 'collapse') {
        return {
            ...state,
            collapsed: {
                ...state.collapsed,
                [action.hash]: true,
            },
        };
    }
    if (action.type === 'expand') {
        return {
            ...state,
            collapsed: {
                ...state.collapsed,
                [action.hash]: false,
            },
        };
    }
    return state;
};
exports.timelineStateReducer = timelineStateReducer;
//# sourceMappingURL=timeline-state-reducer.js.map