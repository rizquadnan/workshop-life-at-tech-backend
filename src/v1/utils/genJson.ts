type TData = Record<any, any> | Array<Record<any, any>>;

type TGenerateJSON = {
  status: "success" | "fail";
  message?: string;
  data?: TData;
};

export const generateJson = (args: TGenerateJSON): TGenerateJSON => {
  return args;
};
