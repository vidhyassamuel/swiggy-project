const reducer = (state, action) => {
  switch (action.type) {
    case "CARD_DATE":
      return { ...state, cardData: action.payload };
    default:
      return state;
  }
};

export default reducer;
