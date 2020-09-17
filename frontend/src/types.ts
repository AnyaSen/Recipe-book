export interface recipeArrType {
  name: string;
  _id: number;
  ingridients: Array<{
    ingredient: string;
    quantity: string;
  }>;
  time: string;
  portionsNumber: number;
  steps: Array<string>;
  img: string;
}
