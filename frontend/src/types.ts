export interface ingredientsType {
  ingredient: string;
  quantity: string;
  id: string;
}

export interface stepsType {
  step: string;
  id: number;
}

export interface recipeArrType {
  name: string;
  _id: number;
  ingridients: Array<ingredientsType>;
  time: string;
  portionsNumber: number;
  steps: Array<stepsType>;
  img?: string;
}
