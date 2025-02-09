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
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      event_points: {
        Row: {
          created_at: string
          description: string | null
          event_id: number | null
          id: number
          points: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_id?: number | null
          id?: number
          points?: number
          title: string
          updated_at: string
        }
        Update: {
          created_at?: string
          description?: string | null
          event_id?: number | null
          id?: number
          points?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_points_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_signups: {
        Row: {
          created_at: string
          event_id: number
          id: number
          status: Database["public"]["Enums"]["EVENT_SIGNUPS_STATUS"]
          updated_at: string
          user_id: number
        }
        Insert: {
          created_at?: string
          event_id: number
          id?: number
          status: Database["public"]["Enums"]["EVENT_SIGNUPS_STATUS"]
          updated_at?: string
          user_id: number
        }
        Update: {
          created_at?: string
          event_id?: number
          id?: number
          status?: Database["public"]["Enums"]["EVENT_SIGNUPS_STATUS"]
          updated_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_signups_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_signups_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          description: string | null
          end_date: string
          id: number
          latitude: number
          longitude: number
          organization_id: number
          radius_in_km: number
          required_volunteers: number
          start_date: string
          status: Database["public"]["Enums"]["EVENT_STATUS"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date: string
          id?: number
          latitude: number
          longitude: number
          organization_id: number
          radius_in_km: number
          required_volunteers: number
          start_date: string
          status?: Database["public"]["Enums"]["EVENT_STATUS"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string
          id?: number
          latitude?: number
          longitude?: number
          organization_id?: number
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
          created_at: string
          event_id: number
          id: number
          organization_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          event_id: number
          id?: number
          organization_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          event_id?: number
          id?: number
          organization_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_categories_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_categories_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations_profiles"
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
      user_points: {
        Row: {
          created_at: string
          id: number
          points_id: number
          updated_at: string
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          points_id: number
          updated_at?: string
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          points_id?: number
          updated_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_points_points_id_fkey"
            columns: ["points_id"]
            isOneToOne: false
            referencedRelation: "event_points"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_points_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
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
          full_name: string | null
          id: number
          latitude: number | null
          longitude: number | null
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
          full_name?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
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
          full_name?: string | null
          id?: number
          latitude?: number | null
          longitude?: number | null
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
          user_id: number
        }
        Insert: {
          badge_id: number
          created_at?: string
          id?: number
          user_id: number
        }
        Update: {
          badge_id?: number
          created_at?: string
          id?: number
          user_id?: number
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
            foreignKeyName: "users_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users_categories: {
        Row: {
          category_id: number
          created_at: string
          id: number
          updated_at: string
          user_id: number
        }
        Insert: {
          category_id: number
          created_at?: string
          id?: number
          updated_at?: string
          user_id: number
        }
        Update: {
          category_id?: number
          created_at?: string
          id?: number
          updated_at?: string
          user_id?: number
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
            foreignKeyName: "users_categories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      users_organizations: {
        Row: {
          created_at: string
          id: number
          organization_id: number
          status: Database["public"]["Enums"]["ORGANIZATION_STATUS"]
          updated_at: string
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          organization_id: number
          status?: Database["public"]["Enums"]["ORGANIZATION_STATUS"]
          updated_at?: string
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          organization_id?: number
          status?: Database["public"]["Enums"]["ORGANIZATION_STATUS"]
          updated_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "users_organizations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_organizations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
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
      EVENT_SIGNUPS_STATUS: "pending" | "approved" | "rejected"
      EVENT_STATUS: "open" | "closed" | "completed"
      ORGANIZATION_STATUS: "pending" | "approved" | "rejected" | "suspended"
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
