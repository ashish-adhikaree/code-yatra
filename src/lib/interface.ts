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

export type ApplyToEventFormState =
    | {
          success?: boolean;
          errors?: {
              title?: string[];
              description?: string[];
          };
          generalErrorMessage?: string;
      }
    | undefined;

export type CreateEventState =
    | {
          success?: boolean;
          errors?: {
              title?: string[];
              description?: string[];
              start_date?: string[];
              end_date?: string[];
              required_volunteers?: string[];
              latitude?: string[];
              longitude?: string[];
              radius_in_km?: string[];
              categories?: string[];
              participation_points?: string[];
              deduction_points_for_absence?: string[];
          };
          generalErrorMessage?: string;
      }
    | undefined;

export type EditProfileState =
    | {
          success?: boolean;
          errors?: {
              fullname?: string[];
              latitude?: number;
              longitude?: number;
              bio?: string | null;
              radius_in_km: number;
          };
          generalErrorMessage?: string;
      }
    | undefined;
