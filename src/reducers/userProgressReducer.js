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
    case "SET_PROFILE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
