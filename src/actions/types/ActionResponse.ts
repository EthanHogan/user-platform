export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof never]?: string[];
  };
}
