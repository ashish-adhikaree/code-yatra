export type AuthFormState =
    | {
          errors?: {
              email?: string[];
              password?: string[];
              full_name?: string[];
          };
          message?: string;
      }
    | undefined;