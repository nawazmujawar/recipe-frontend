export const initialState = {
  recipes: [],
  recipe: {},
  author: {},
  comments: [],
};
console.log(initialState.recipes);

export const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "SET__RECIPES":
      return {
        ...state,
        recipes: action.recipes,
      };

    case "SET__SEARCH":
      // console.log("response(reducer)", action.recipes.data.docs);
      let search = action.recipes.data.docs;
      return { ...state, recipes: search };

    case "SET__SINGLERECIPE":
      return {
        ...state,
        recipe: action.payload,
        author: action.payload.user,
        comments: action.payload.comments,
      };

    default:
      return state;
  }
};
