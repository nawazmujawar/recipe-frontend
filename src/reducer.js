// export const initialState = {
//   basket: [],
//   user: null,
// };

// export const getBasketTotal = (basket) =>
//   basket?.reduce((amount, item) => item.price + amount, 0);

// export const reducer = (state, action) => {
//   switch (action.type) {
//     case "SET_USER":
//       return {
//         ...state,
//         user: action.user,
//       };
//     case "ADD_TO_BASKET":
//       return {
//         ...state,
//         basket: [...state.basket, action.item],
//       };
//     case "REMOVE_FROM_BASKET":
//       let newBasket = [...state.basket];

//       const index = state.basket.findIndex(
//         (basketItem) => basketItem.id === action.id
//       );
//       if (index >= 0) {
//         newBasket.splice(index, 1);
//       } else {
//         console.warn("Nothing to delete");
//       }
//       return {
//         ...state,
//         basket: newBasket,
//       };
//     default:
//       return state;
//   }
// };

export const initialState = {
  recipes: [],
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
    //   case "SET__onSEARCHRECIPE":
    //       let recName = action.recipeName
    //   return {
    //     ...state,
    //     name: [...state.recipes, action.recipes],
    //   };
    case "SET__SEARCH":
      /* let newRecipes = [...state.recipes];

      const response = newRecipes.filter((recipe) => {
        return recipe.name === action.payload;
      });*/
      console.log("response(reducer)", action.recipes.data.docs);
      let search = action.recipes.data.docs;
      return { ...state, recipes: search };
    default:
      return state;
  }
};
