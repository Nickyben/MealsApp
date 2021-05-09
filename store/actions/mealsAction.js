export const TOGGLE_FAV = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

export const toggleFavorite = (mealId) => {//an action creator i.e creates/defines an action
    return {
        type: TOGGLE_FAV, 
        mealId: mealId,
    };
};

export const setFilters = filterSettings => {
    return (
        {
            type: SET_FILTERS,
            filters: filterSettings
        }
    );
};