export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      badges: {
        Row: {
          created_at: string
          description: string
          id: number
          required_events_participation: number
          required_points: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          required_events_participation: number
          required_points: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          required_events_participation?: number
          required_points?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      event_signups: {
        Row: {
          created_at: string
          event_id: number
          id: number
          status: Database["public"]["Enums"]["EVENT_SIGNUPS_STATUS"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: number
          id?: number
          status: Database["public"]["Enums"]["EVENT_SIGNUPS_STATUS"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: number
          id?: number
          status?: Database["public"]["Enums"]["EVENT_SIGNUPS_STATUS"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_signups_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          deduction_points_for_absence: number
          description: string | null
          end_date: string
          event_image: string | null
          id: number
          latitude: number
          location: string
          longitude: number
          organization_id: number
          points_for_participation: number
          radius_in_km: number
          required_volunteers: number
          start_date: string
          status: Database["public"]["Enums"]["EVENT_STATUS"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          deduction_points_for_absence?: number
          description?: string | null
          end_date: string
          event_image?: string | null
          id?: number
          latitude: number
          location: string
          longitude: number
          organization_id: number
          points_for_participation?: number
          radius_in_km: number
          required_volunteers: number
          start_date: string
          status?: Database["public"]["Enums"]["EVENT_STATUS"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          deduction_points_for_absence?: number
          description?: string | null
          end_date?: string
          event_image?: string | null
          id?: number
          latitude?: number
          location?: string
          longitude?: number
          organization_id?: number
          points_for_participation?: number
          radius_in_km?: number
          required_volunteers?: number
          start_date?: string
          status?: Database["public"]["Enums"]["EVENT_STATUS"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events_categories: {
        Row: {
          category_id: number
          created_at: string
          event_id: number
          id: number
          updated_at: string
        }
        Insert: {
          category_id: number
          created_at?: string
          event_id: number
          id?: number
          updated_at?: string
        }
        Update: {
          category_id?: number
          created_at?: string
          event_id?: number
          id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "volunteering_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_categories_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events_coordinators: {
        Row: {
          coordinator_id: number
          created_at: string
          event_id: number
          id: number
          updated_at: string
        }
        Insert: {
          coordinator_id: number
          created_at?: string
          event_id: number
          id?: number
          updated_at?: string
        }
        Update: {
          coordinator_id?: number
          created_at?: string
          event_id?: number
          id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_coordinators_coordinator_id_fkey"
            columns: ["coordinator_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_coordinators_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations_profiles: {
        Row: {
          created_at: string
          description: string | null
          id: number
          status: Database["public"]["Enums"]["ORGANIZATION_STATUS"]
          title: string
          total_events_organized: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          status?: Database["public"]["Enums"]["ORGANIZATION_STATUS"]
          title: string
          total_events_organized?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          status?: Database["public"]["Enums"]["ORGANIZATION_STATUS"]
          title?: string
          total_events_organized?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_points: {
        Row: {
          created_at: string
          event_id: number
          id: number
          type: Database["public"]["Enums"]["POINTS_TYPE"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: number
          id?: number
          type: Database["public"]["Enums"]["POINTS_TYPE"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: number
          id?: number
          type?: Database["public"]["Enums"]["POINTS_TYPE"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_points_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          auth_user_id: string
          available_dates: string[] | null
          bio: string | null
          created_at: string
          fullname: string | null
          id: number
          latitude: number | null
          longitude: number | null
          profile_pic: string | null
          radius_in_km: number | null
          total_events_attended: number
          total_volunteering_hours: number
          total_volunteering_points: number
          updated_at: string
        }
        Insert: {
          auth_user_id: string
          available_dates?: string[] | null
          bio?: string | null
          created_at?: string
          fullname?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          profile_pic?: string | null
          radius_in_km?: number | null
          total_events_attended?: number
          total_volunteering_hours?: number
          total_volunteering_points?: number
          updated_at?: string
        }
        Update: {
          auth_user_id?: string
          available_dates?: string[] | null
          bio?: string | null
          created_at?: string
          fullname?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
          profile_pic?: string | null
          radius_in_km?: number | null
          total_events_attended?: number
          total_volunteering_hours?: number
          total_volunteering_points?: number
          updated_at?: string
        }
        Relationships: []
      }
      users_badges: {
        Row: {
          badge_id: number
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          badge_id: number
          created_at?: string
          id?: number
          user_id: string
        }
        Update: {
          badge_id?: number
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_badges_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["auth_user_id"]
          },
        ]
      }
      users_categories: {
        Row: {
          category_id: number
          created_at: string
          id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          category_id: number
          created_at?: string
          id?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          category_id?: number
          created_at?: string
          id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "volunteering_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_categories_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["auth_user_id"]
          },
        ]
      }
      users_organizations: {
        Row: {
          created_at: string
          id: number
          organization_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          organization_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          organization_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_organizations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteering_categories: {
        Row: {
          created_at: string
          description: string | null
          id: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      EVENT_SIGNUPS_STATUS:
        | "pending"
        | "approved"
        | "rejected"
        | "attended"
        | "absent"
      EVENT_STATUS: "open" | "closed" | "completed"
      ORGANIZATION_STATUS: "pending" | "approved" | "rejected" | "suspended"
      POINTS_TYPE: "participation" | "absence" | "organizing"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
