import { MEALS } from '../../data/dummyData';
import { TOGGLE_FAV, SET_FILTERS } from '../actions/mealsAction';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
};

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAV:
            const existingIndex = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if (existingIndex >= 0) {
                const updatedFavMeals = [...state.favoriteMeals,];//there was no mutation but just a copy
                updatedFavMeals.splice(existingIndex, 1);//mutation here is irrelevant to concept of not mutating our state
                return {//returns a replacement for the prev state with an updated val for favoriteMeals
                    ...state,
                    favoriteMeals: updatedFavMeals
                }
            } else {
                const newFavMeal = state.meals.find(meal => meal.id === action.mealId)
                return {//returns a replacement for the prev state with an updated val for favoriteMeals
                    ...state,
                    favoriteMeals: state.favoriteMeals.concat(newFavMeal)//concat does not mutate it
                }
            }

        case SET_FILTERS:
            const appliedFilters = action.filters;
            const mealsFiltered = state.meals.filter(
                meal => {
                    if (appliedFilters.wantGlutenFree && !meal.isGlutenFree) {
                        return false;
                    }
                    if (appliedFilters.wantLactoseFree && !meal.isLactoseFree) {
                        return false
                    }
                    if (appliedFilters.wantVegan && !meal.isVegan) {
                        return false;
                    }
                    if (appliedFilters.wantVegetarian && !meal.isVegetarian) {
                        return false;
                    }
                    return true;
                }
            );
            return ({
                ...state,
                filteredMeals: mealsFiltered
            });

        default:
            return state;
    }
};

export default mealsReducer;