export const initialUserProgress = {
  level: 1,
  xp: 0,
  streakDays: 0,
  achievements: [],
};

export function userProgressReducer(state, action) {
  switch (action.type) {
    case "ADD_XP":
      return { ...state, xp: state.xp + action.payload };
    case "COMPLETE_LEVEL":
      const isNextLevel = action.payload.level === state.level;
      return {
        ...state,
        xp: state.xp + action.payload.xp,
        level: isNextLevel ? state.level + 1 : state.level
      };
    case "UPDATE_STREAK":
      return { ...state, streakDays: state.streakDays + 1 };
    case "SET_PROFILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
