export interface ingredientsType {
  ingredient: string;
  quantity: string;
  id?: string;
}

export interface stepsType {
  step: string;
  id?: string;
}

export interface recipeArrType {
  name: string;
  _id?: string | undefined;
  ingridients: Array<ingredientsType>;
  time: string;
  portionsNumber: number;
  steps: Array<stepsType>;
  img?: any;
}

type createRendererParamsType = {
  meta: {
    error: string;
    submitFailed: boolean;
  };
  input: string | React.Component | React.FC;
  placeholder: string;
};

export type createRendererType = (
  render: any
) => (params: createRendererParamsType) => React.ReactNode;
