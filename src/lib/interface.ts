export type AuthFormState =
    | {
          errors?: {
              email?: string[];
              password?: string[];
              full_name?: string[];
          };
          generalErrorMessage?: string;
      }
    | undefined;

export type AddFullNameDialogState =
    | {
          errors?: {
              fullname?: string[];
          };
          generalErrorMessage?: string;
      }
    | undefined;

export type CreateOrganizationState =
    | {
          success?: boolean;
          errors?: {
              title?: string[];
              description?: string[];
          };
          generalErrorMessage?: string;
      }
    | undefined;


 export type EditProfileState =
    | {
          success?: boolean;
          errors?: {
              fullname?: string[];
              latitude?:number;
              longitude?:number;
              bio?:string|null;
              radius_in_km:number;
          };
          generalErrorMessage?: string;
      }
    | undefined;