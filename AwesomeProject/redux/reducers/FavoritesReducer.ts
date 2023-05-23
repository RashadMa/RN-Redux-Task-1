export function FavoritesReducer(state: any, action: any) {
  if (typeof state === 'undefined') {
    return [];
  }
  if (action.type === 'ADD_TO_FAVORITES') {
    const favoriteProduct = state.find(
      (product: any) => product.id === action.payload.id,
    );
    if (favoriteProduct) {
      return state;
    }
    return [...state, action.payload];
  } else if (action.type === 'REMOVE_FROM_FAVORITES') {
    return state.filter((product: any) => product.id !== action.payload.id);
  } else if (action.type === 'CLEAR_FAVORITES') {
    return [];
  }
}
