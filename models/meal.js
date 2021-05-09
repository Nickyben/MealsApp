class Meal {
    constructor(
        id,
        categoryIds,
        title,
        affordability,
        complexity,
        imageUri,
        duration, 
        ingredients,
        steps,
        isGlutenFree,
        isVegan,
        isVegetarian,
        isLactoseFree
    ) {
        this.id = id;
        this.categoryIds = categoryIds;
        this.title = title;
        this.affordability = affordability;
        this.imageUri = imageUri;
        this.steps = steps;
        this.isVegan = isVegan;
        this.isVegetarian = isVegetarian;
        this.complexity = complexity;
        this.duration = duration;
        this.isGlutenFree = isGlutenFree;
        this.ingredients = ingredients;
        this.isLactoseFree = isLactoseFree;
        
    }
}

export default Meal;