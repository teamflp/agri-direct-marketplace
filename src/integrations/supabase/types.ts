export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          created_at: string | null
          criteria: Json
          description: string
          icon: string
          id: string
          name: string
          points: number | null
          rarity: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          criteria: Json
          description: string
          icon: string
          id?: string
          name: string
          points?: number | null
          rarity?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          criteria?: Json
          description?: string
          icon?: string
          id?: string
          name?: string
          points?: number | null
          rarity?: string | null
        }
        Relationships: []
      }
      addresses: {
        Row: {
          city: string
          country: string
          id: string
          street: string
          user_id: string | null
          zip_code: string
        }
        Insert: {
          city: string
          country: string
          id?: string
          street: string
          user_id?: string | null
          zip_code: string
        }
        Update: {
          city?: string
          country?: string
          id?: string
          street?: string
          user_id?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_game_moves: {
        Row: {
          board_state_after: Json
          created_at: string
          game_id: string
          id: string
          move_type: string
          player_type: string
          position: Json | null
          score_earned: number
          tiles_used: Json
          word: string | null
        }
        Insert: {
          board_state_after?: Json
          created_at?: string
          game_id: string
          id?: string
          move_type?: string
          player_type: string
          position?: Json | null
          score_earned?: number
          tiles_used?: Json
          word?: string | null
        }
        Update: {
          board_state_after?: Json
          created_at?: string
          game_id?: string
          id?: string
          move_type?: string
          player_type?: string
          position?: Json | null
          score_earned?: number
          tiles_used?: Json
          word?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_game_moves_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "ai_games"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_games: {
        Row: {
          ai_score: number
          ai_tiles: Json
          board_state: Json
          created_at: string
          current_turn: string
          difficulty: string
          id: string
          moves_history: Json
          status: string
          tiles_bag: Json
          updated_at: string
          user_id: string
          user_score: number
          user_tiles: Json
          winner: string | null
        }
        Insert: {
          ai_score?: number
          ai_tiles?: Json
          board_state?: Json
          created_at?: string
          current_turn?: string
          difficulty?: string
          id?: string
          moves_history?: Json
          status?: string
          tiles_bag?: Json
          updated_at?: string
          user_id: string
          user_score?: number
          user_tiles?: Json
          winner?: string | null
        }
        Update: {
          ai_score?: number
          ai_tiles?: Json
          board_state?: Json
          created_at?: string
          current_turn?: string
          difficulty?: string
          id?: string
          moves_history?: Json
          status?: string
          tiles_bag?: Json
          updated_at?: string
          user_id?: string
          user_score?: number
          user_tiles?: Json
          winner?: string | null
        }
        Relationships: []
      }
      ai_suggestions: {
        Row: {
          board_state: Json
          created_at: string
          game_id: string
          id: string
          player_tiles: Json
          suggestions: Json
          user_id: string
        }
        Insert: {
          board_state: Json
          created_at?: string
          game_id: string
          id?: string
          player_tiles: Json
          suggestions: Json
          user_id: string
        }
        Update: {
          board_state?: Json
          created_at?: string
          game_id?: string
          id?: string
          player_tiles?: Json
          suggestions?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_suggestions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_history: {
        Row: {
          amount: number
          billing_period_end: string | null
          billing_period_start: string | null
          created_at: string | null
          currency: string | null
          id: string
          invoice_url: string | null
          metadata: Json | null
          payment_date: string | null
          status: string
          stripe_invoice_id: string | null
          subscription_id: string
        }
        Insert: {
          amount: number
          billing_period_end?: string | null
          billing_period_start?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          invoice_url?: string | null
          metadata?: Json | null
          payment_date?: string | null
          status: string
          stripe_invoice_id?: string | null
          subscription_id: string
        }
        Update: {
          amount?: number
          billing_period_end?: string | null
          billing_period_start?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          invoice_url?: string | null
          metadata?: Json | null
          payment_date?: string | null
          status?: string
          stripe_invoice_id?: string | null
          subscription_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_history_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "premium_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          quantity: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          quantity?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          quantity?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      challenge_completions: {
        Row: {
          challenge_id: string
          completed_at: string
          id: string
          score: number
          user_id: string
        }
        Insert: {
          challenge_id: string
          completed_at?: string
          id?: string
          score: number
          user_id: string
        }
        Update: {
          challenge_id?: string
          completed_at?: string
          id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_completions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "daily_challenges"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          created_at: string | null
          id: string
          institution_id: string | null
          name: string
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          institution_id?: string | null
          name: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          institution_id?: string | null
          name?: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      club_activities: {
        Row: {
          id: string
          name: string
          position: number
          schedule: string
        }
        Insert: {
          id?: string
          name: string
          position?: number
          schedule: string
        }
        Update: {
          id?: string
          name?: string
          position?: number
          schedule?: string
        }
        Relationships: []
      }
      club_members: {
        Row: {
          club_id: string
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          club_id: string
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          club_id?: string
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      club_settings: {
        Row: {
          address: string
          contact_email: string
          contact_phone: string
          description: string
          id: string
          join_info: string
          mission: string
          name: string
          social_links: Json
          updated_at: string | null
          vision: string
        }
        Insert: {
          address?: string
          contact_email?: string
          contact_phone?: string
          description?: string
          id?: string
          join_info?: string
          mission?: string
          name?: string
          social_links?: Json
          updated_at?: string | null
          vision?: string
        }
        Update: {
          address?: string
          contact_email?: string
          contact_phone?: string
          description?: string
          id?: string
          join_info?: string
          mission?: string
          name?: string
          social_links?: Json
          updated_at?: string | null
          vision?: string
        }
        Relationships: []
      }
      club_videos: {
        Row: {
          description: string
          id: string
          position: number
          thumbnail: string
          title: string
          url: string
        }
        Insert: {
          description: string
          id?: string
          position?: number
          thumbnail?: string
          title: string
          url?: string
        }
        Update: {
          description?: string
          id?: string
          position?: number
          thumbnail?: string
          title?: string
          url?: string
        }
        Relationships: []
      }
      clubs: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_public: boolean
          max_members: number | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_public?: boolean
          max_members?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_public?: boolean
          max_members?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          handled_at: string | null
          handled_by: string | null
          id: string
          ip: string | null
          message: string
          name: string
          status: Database["public"]["Enums"]["contact_status"]
          subject: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          ip?: string | null
          message: string
          name: string
          status?: Database["public"]["Enums"]["contact_status"]
          subject: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          ip?: string | null
          message?: string
          name?: string
          status?: Database["public"]["Enums"]["contact_status"]
          subject?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      daily_challenges: {
        Row: {
          challenge_data: Json
          challenge_date: string
          challenge_type: string
          created_at: string
          id: string
          reward_points: number
        }
        Insert: {
          challenge_data: Json
          challenge_date: string
          challenge_type: string
          created_at?: string
          id?: string
          reward_points?: number
        }
        Update: {
          challenge_data?: Json
          challenge_date?: string
          challenge_type?: string
          created_at?: string
          id?: string
          reward_points?: number
        }
        Relationships: []
      }
      daily_puzzles: {
        Row: {
          created_at: string | null
          difficulty: string | null
          id: string
          points_reward: number | null
          puzzle_data: Json
          puzzle_date: string
          puzzle_type: string
          solution: Json
        }
        Insert: {
          created_at?: string | null
          difficulty?: string | null
          id?: string
          points_reward?: number | null
          puzzle_data: Json
          puzzle_date: string
          puzzle_type: string
          solution: Json
        }
        Update: {
          created_at?: string | null
          difficulty?: string | null
          id?: string
          points_reward?: number | null
          puzzle_data?: Json
          puzzle_date?: string
          puzzle_type?: string
          solution?: Json
        }
        Relationships: []
      }
      daily_stats: {
        Row: {
          best_word: string | null
          best_word_score: number | null
          created_at: string
          date: string
          games_played: number
          games_won: number
          id: string
          time_played: number
          total_score: number
          user_id: string
        }
        Insert: {
          best_word?: string | null
          best_word_score?: number | null
          created_at?: string
          date?: string
          games_played?: number
          games_won?: number
          id?: string
          time_played?: number
          total_score?: number
          user_id: string
        }
        Update: {
          best_word?: string | null
          best_word_score?: number | null
          created_at?: string
          date?: string
          games_played?: number
          games_won?: number
          id?: string
          time_played?: number
          total_score?: number
          user_id?: string
        }
        Relationships: []
      }
      data_deletion_requests: {
        Row: {
          admin_notes: string | null
          email: string | null
          id: string
          metadata: Json
          processed_at: string | null
          processed_by: string | null
          reason: string | null
          requested_at: string
          status: Database["public"]["Enums"]["deletion_status"]
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          email?: string | null
          id?: string
          metadata?: Json
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          requested_at?: string
          status?: Database["public"]["Enums"]["deletion_status"]
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          email?: string | null
          id?: string
          metadata?: Json
          processed_at?: string | null
          processed_by?: string | null
          reason?: string | null
          requested_at?: string
          status?: Database["public"]["Enums"]["deletion_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "data_deletion_requests_processed_by_fkey"
            columns: ["processed_by"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "data_deletion_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_tracking: {
        Row: {
          created_at: string | null
          delivery_person: string | null
          estimated_delivery: string | null
          id: string
          location: string | null
          notes: string | null
          order_id: string
          status: string
          tracking_number: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_person?: string | null
          estimated_delivery?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          order_id: string
          status?: string
          tracking_number?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_person?: string | null
          estimated_delivery?: string | null
          id?: string
          location?: string | null
          notes?: string | null
          order_id?: string
          status?: string
          tracking_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_tracking_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      df_clients: {
        Row: {
          address: string | null
          created_at: string
          created_by: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          created_by: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          created_by?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      df_documents: {
        Row: {
          dossier_id: string | null
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          name: string
          uploaded_at: string
          uploaded_by: string | null
        }
        Insert: {
          dossier_id?: string | null
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          name: string
          uploaded_at?: string
          uploaded_by?: string | null
        }
        Update: {
          dossier_id?: string | null
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          name?: string
          uploaded_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "df_documents_dossier_id_fkey"
            columns: ["dossier_id"]
            isOneToOne: false
            referencedRelation: "df_dossiers"
            referencedColumns: ["id"]
          },
        ]
      }
      df_dossiers: {
        Row: {
          client_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          property_id: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          property_id?: string | null
          status?: string
          type: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          property_id?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "df_dossiers_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "df_clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "df_dossiers_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "df_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      df_messages: {
        Row: {
          content: string
          dossier_id: string | null
          id: string
          read_at: string | null
          recipient_id: string | null
          sender_id: string | null
          sent_at: string
        }
        Insert: {
          content: string
          dossier_id?: string | null
          id?: string
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          sent_at?: string
        }
        Update: {
          content?: string
          dossier_id?: string | null
          id?: string
          read_at?: string | null
          recipient_id?: string | null
          sender_id?: string | null
          sent_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "df_messages_dossier_id_fkey"
            columns: ["dossier_id"]
            isOneToOne: false
            referencedRelation: "df_dossiers"
            referencedColumns: ["id"]
          },
        ]
      }
      df_properties: {
        Row: {
          address: string | null
          created_at: string
          created_by: string | null
          created_by_role: string | null
          description: string | null
          id: string
          images: Json | null
          location: string
          price: number
          rooms: number | null
          status: string
          surface: number | null
          title: string
          transaction_type: string
          type: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          created_by?: string | null
          created_by_role?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          location: string
          price: number
          rooms?: number | null
          status?: string
          surface?: number | null
          title: string
          transaction_type: string
          type: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          created_by?: string | null
          created_by_role?: string | null
          description?: string | null
          id?: string
          images?: Json | null
          location?: string
          price?: number
          rooms?: number | null
          status?: string
          surface?: number | null
          title?: string
          transaction_type?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      dictionary_searches: {
        Row: {
          found: boolean
          id: string
          search_term: string
          searched_at: string
          user_id: string
        }
        Insert: {
          found?: boolean
          id?: string
          search_term: string
          searched_at?: string
          user_id: string
        }
        Update: {
          found?: boolean
          id?: string
          search_term?: string
          searched_at?: string
          user_id?: string
        }
        Relationships: []
      }
      dictionary_words: {
        Row: {
          category: string | null
          created_at: string | null
          definition: string
          etymology: string | null
          examples: Json | null
          frequency_score: number | null
          id: string
          language: string | null
          pronunciation: string | null
          word: string
          word_length: number
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          definition: string
          etymology?: string | null
          examples?: Json | null
          frequency_score?: number | null
          id?: string
          language?: string | null
          pronunciation?: string | null
          word: string
          word_length: number
        }
        Update: {
          category?: string | null
          created_at?: string | null
          definition?: string
          etymology?: string | null
          examples?: Json | null
          frequency_score?: number | null
          id?: string
          language?: string | null
          pronunciation?: string | null
          word?: string
          word_length?: number
        }
        Relationships: []
      }
      edge_rate_limits: {
        Row: {
          count: number
          id: string
          key: string
          route: string
          window_sec: number
          window_start: string
        }
        Insert: {
          count?: number
          id?: string
          key: string
          route: string
          window_sec: number
          window_start: string
        }
        Update: {
          count?: number
          id?: string
          key?: string
          route?: string
          window_sec?: number
          window_start?: string
        }
        Relationships: []
      }
      faq_items: {
        Row: {
          answer: string
          id: string
          position: number
          question: string
        }
        Insert: {
          answer: string
          id?: string
          position?: number
          question: string
        }
        Update: {
          answer?: string
          id?: string
          position?: number
          question?: string
        }
        Relationships: []
      }
      farmer_analytics: {
        Row: {
          avg_order_value: number | null
          created_at: string | null
          date: string
          farmer_id: string
          id: string
          new_customers: number | null
          products_sold: number | null
          revenue: number | null
          total_orders: number | null
          total_sales: number | null
        }
        Insert: {
          avg_order_value?: number | null
          created_at?: string | null
          date?: string
          farmer_id: string
          id?: string
          new_customers?: number | null
          products_sold?: number | null
          revenue?: number | null
          total_orders?: number | null
          total_sales?: number | null
        }
        Update: {
          avg_order_value?: number | null
          created_at?: string | null
          date?: string
          farmer_id?: string
          id?: string
          new_customers?: number | null
          products_sold?: number | null
          revenue?: number | null
          total_orders?: number | null
          total_sales?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "farmer_analytics_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
        ]
      }
      farmer_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          recipient_id: string
          sender_id: string
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id: string
          sender_id: string
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          recipient_id?: string
          sender_id?: string
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      farmer_subscriptions: {
        Row: {
          auto_renew: boolean | null
          billing_cycle: string
          created_at: string | null
          end_date: string | null
          farmer_id: string | null
          features: Json | null
          id: string
          next_billing_date: string | null
          plan_type: string
          price: number
          start_date: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_renew?: boolean | null
          billing_cycle?: string
          created_at?: string | null
          end_date?: string | null
          farmer_id?: string | null
          features?: Json | null
          id?: string
          next_billing_date?: string | null
          plan_type?: string
          price: number
          start_date?: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_renew?: boolean | null
          billing_cycle?: string
          created_at?: string | null
          end_date?: string | null
          farmer_id?: string | null
          features?: Json | null
          id?: string
          next_billing_date?: string | null
          plan_type?: string
          price?: number
          start_date?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "farmer_subscriptions_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
        ]
      }
      farmers: {
        Row: {
          address: string | null
          created_at: string | null
          delivery_zones: string[] | null
          description: string | null
          distance: number | null
          farm_name: string | null
          id: string
          is_certified: boolean | null
          latitude: number | null
          location: string
          longitude: number | null
          name: string
          phone: string | null
          rating: number | null
          reviews_count: number | null
          updated_at: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          delivery_zones?: string[] | null
          description?: string | null
          distance?: number | null
          farm_name?: string | null
          id?: string
          is_certified?: boolean | null
          latitude?: number | null
          location: string
          longitude?: number | null
          name: string
          phone?: string | null
          rating?: number | null
          reviews_count?: number | null
          updated_at?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          delivery_zones?: string[] | null
          description?: string | null
          distance?: number | null
          farm_name?: string | null
          id?: string
          is_certified?: boolean | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          name?: string
          phone?: string | null
          rating?: number | null
          reviews_count?: number | null
          updated_at?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          farmer_id: string | null
          id: string
          product_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          farmer_id?: string | null
          id?: string
          product_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          farmer_id?: string | null
          id?: string
          product_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      friendships: {
        Row: {
          addressee_id: string
          created_at: string
          id: string
          requester_id: string
          status: string
          updated_at: string
        }
        Insert: {
          addressee_id: string
          created_at?: string
          id?: string
          requester_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          addressee_id?: string
          created_at?: string
          id?: string
          requester_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt: string
          id: string
          position: number
          src: string
        }
        Insert: {
          alt: string
          id?: string
          position?: number
          src?: string
        }
        Update: {
          alt?: string
          id?: string
          position?: number
          src?: string
        }
        Relationships: []
      }
      game_analyses: {
        Row: {
          analysis_data: Json
          created_at: string
          game_id: string
          id: string
          improvement_tips: Json
          score_breakdown: Json
          user_id: string
        }
        Insert: {
          analysis_data: Json
          created_at?: string
          game_id: string
          id?: string
          improvement_tips: Json
          score_breakdown: Json
          user_id: string
        }
        Update: {
          analysis_data?: Json
          created_at?: string
          game_id?: string
          id?: string
          improvement_tips?: Json
          score_breakdown?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_analyses_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      game_history: {
        Row: {
          best_word: string | null
          best_word_score: number | null
          duration: number | null
          game_data: Json | null
          game_type: string
          id: string
          opponent_name: string | null
          opponent_score: number
          played_at: string
          result: string
          total_moves: number | null
          user_id: string
          user_score: number
        }
        Insert: {
          best_word?: string | null
          best_word_score?: number | null
          duration?: number | null
          game_data?: Json | null
          game_type: string
          id?: string
          opponent_name?: string | null
          opponent_score?: number
          played_at?: string
          result: string
          total_moves?: number | null
          user_id: string
          user_score?: number
        }
        Update: {
          best_word?: string | null
          best_word_score?: number | null
          duration?: number | null
          game_data?: Json | null
          game_type?: string
          id?: string
          opponent_name?: string | null
          opponent_score?: number
          played_at?: string
          result?: string
          total_moves?: number | null
          user_id?: string
          user_score?: number
        }
        Relationships: []
      }
      game_invitations: {
        Row: {
          created_at: string
          expires_at: string
          game_id: string
          id: string
          invitee_id: string
          inviter_id: string
          message: string | null
          responded_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          game_id: string
          id?: string
          invitee_id: string
          inviter_id: string
          message?: string | null
          responded_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          game_id?: string
          id?: string
          invitee_id?: string
          inviter_id?: string
          message?: string | null
          responded_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_invitations_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      game_lobbies: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          game_settings: Json
          id: string
          is_private: boolean
          max_players: number
          name: string
          password_hash: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          game_settings?: Json
          id?: string
          is_private?: boolean
          max_players?: number
          name: string
          password_hash?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          game_settings?: Json
          id?: string
          is_private?: boolean
          max_players?: number
          name?: string
          password_hash?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      game_moves: {
        Row: {
          board_state_after: Json
          created_at: string
          direction: string | null
          exchanged_tiles: Json | null
          game_id: string
          id: string
          is_exchange: boolean
          is_pass: boolean
          move_number: number
          player_id: string
          position_end: Json | null
          position_start: Json | null
          score_earned: number
          tiles_used: Json
          time_taken: number | null
          word_played: string | null
        }
        Insert: {
          board_state_after?: Json
          created_at?: string
          direction?: string | null
          exchanged_tiles?: Json | null
          game_id: string
          id?: string
          is_exchange?: boolean
          is_pass?: boolean
          move_number: number
          player_id: string
          position_end?: Json | null
          position_start?: Json | null
          score_earned?: number
          tiles_used?: Json
          time_taken?: number | null
          word_played?: string | null
        }
        Update: {
          board_state_after?: Json
          created_at?: string
          direction?: string | null
          exchanged_tiles?: Json | null
          game_id?: string
          id?: string
          is_exchange?: boolean
          is_pass?: boolean
          move_number?: number
          player_id?: string
          position_end?: Json | null
          position_start?: Json | null
          score_earned?: number
          tiles_used?: Json
          time_taken?: number | null
          word_played?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_moves_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      game_players: {
        Row: {
          game_id: string
          id: string
          is_current_turn: boolean | null
          joined_at: string
          score: number | null
          tiles: Json | null
          user_id: string
        }
        Insert: {
          game_id: string
          id?: string
          is_current_turn?: boolean | null
          joined_at?: string
          score?: number | null
          tiles?: Json | null
          user_id: string
        }
        Update: {
          game_id?: string
          id?: string
          is_current_turn?: boolean | null
          joined_at?: string
          score?: number | null
          tiles?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          board_state: Json | null
          created_at: string
          current_player_id: string | null
          id: string
          status: string
          tiles_bag: Json | null
          updated_at: string
          winner_id: string | null
        }
        Insert: {
          board_state?: Json | null
          created_at?: string
          current_player_id?: string | null
          id?: string
          status?: string
          tiles_bag?: Json | null
          updated_at?: string
          winner_id?: string | null
        }
        Update: {
          board_state?: Json | null
          created_at?: string
          current_player_id?: string | null
          id?: string
          status?: string
          tiles_bag?: Json | null
          updated_at?: string
          winner_id?: string | null
        }
        Relationships: []
      }
      institutions: {
        Row: {
          address: string | null
          admin_id: string | null
          created_at: string | null
          email: string | null
          id: string
          logo: string | null
          name: string
          phone: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          admin_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          name: string
          phone?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          admin_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          name?: string
          phone?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      leagues: {
        Row: {
          color: string
          created_at: string
          description: string | null
          icon: string | null
          id: string
          max_elo: number
          min_elo: number
          name: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          max_elo?: number
          min_elo?: number
          name: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          max_elo?: number
          min_elo?: number
          name?: string
        }
        Relationships: []
      }
      lobby_participants: {
        Row: {
          id: string
          is_ready: boolean
          joined_at: string
          lobby_id: string
          user_id: string
        }
        Insert: {
          id?: string
          is_ready?: boolean
          joined_at?: string
          lobby_id: string
          user_id: string
        }
        Update: {
          id?: string
          is_ready?: boolean
          joined_at?: string
          lobby_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lobby_participants_lobby_id_fkey"
            columns: ["lobby_id"]
            isOneToOne: false
            referencedRelation: "game_lobbies"
            referencedColumns: ["id"]
          },
        ]
      }
      login_attempts: {
        Row: {
          created_at: string | null
          email: string
          failure_reason: string | null
          id: string
          ip_address: string | null
          success: boolean
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          failure_reason?: string | null
          id?: string
          ip_address?: string | null
          success?: boolean
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          failure_reason?: string | null
          id?: string
          ip_address?: string | null
          success?: boolean
          user_agent?: string | null
        }
        Relationships: []
      }
      message_reactions: {
        Row: {
          created_at: string
          id: string
          message_id: string
          reaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message_id: string
          reaction_type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message_id?: string
          reaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_reactions_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      message_threads: {
        Row: {
          created_at: string
          id: string
          participants: Json
          thread_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          participants?: Json
          thread_type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          participants?: Json
          thread_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          club_id: string | null
          content: string
          created_at: string
          game_id: string | null
          id: string
          is_private: boolean
          message_type: string
          recipient_id: string | null
          sender_id: string
          thread_id: string | null
          updated_at: string
        }
        Insert: {
          club_id?: string | null
          content: string
          created_at?: string
          game_id?: string | null
          id?: string
          is_private?: boolean
          message_type?: string
          recipient_id?: string | null
          sender_id: string
          thread_id?: string | null
          updated_at?: string
        }
        Update: {
          club_id?: string | null
          content?: string
          created_at?: string
          game_id?: string | null
          id?: string
          is_private?: boolean
          message_type?: string
          recipient_id?: string | null
          sender_id?: string
          thread_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      nc_categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      nc_prestataires: {
        Row: {
          active: boolean | null
          address: string | null
          availability_hours: Json | null
          certifications: string[] | null
          city: string | null
          company_name: string | null
          created_at: string
          description: string | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          latitude: number | null
          longitude: number | null
          phone: string | null
          rating: number | null
          reviews_count: number | null
          specialties: string[] | null
          updated_at: string
          user_id: string
          verified: boolean | null
          website: string | null
          zip_code: string | null
        }
        Insert: {
          active?: boolean | null
          address?: string | null
          availability_hours?: Json | null
          certifications?: string[] | null
          city?: string | null
          company_name?: string | null
          created_at?: string
          description?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          rating?: number | null
          reviews_count?: number | null
          specialties?: string[] | null
          updated_at?: string
          user_id: string
          verified?: boolean | null
          website?: string | null
          zip_code?: string | null
        }
        Update: {
          active?: boolean | null
          address?: string | null
          availability_hours?: Json | null
          certifications?: string[] | null
          city?: string | null
          company_name?: string | null
          created_at?: string
          description?: string | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          rating?: number | null
          reviews_count?: number | null
          specialties?: string[] | null
          updated_at?: string
          user_id?: string
          verified?: boolean | null
          website?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      nc_profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          role: string
          updated_at: string
          user_id: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
          user_id: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
          user_id?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      nc_reservations: {
        Row: {
          address: string | null
          city: string | null
          client_id: string
          created_at: string
          duration: number
          id: string
          notes: string | null
          prestataire_id: string
          reservation_date: string
          reservation_time: string
          service_id: string
          status: string
          stripe_payment_intent_id: string | null
          total_price: number
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          client_id: string
          created_at?: string
          duration: number
          id?: string
          notes?: string | null
          prestataire_id: string
          reservation_date: string
          reservation_time: string
          service_id: string
          status?: string
          stripe_payment_intent_id?: string | null
          total_price: number
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          client_id?: string
          created_at?: string
          duration?: number
          id?: string
          notes?: string | null
          prestataire_id?: string
          reservation_date?: string
          reservation_time?: string
          service_id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          total_price?: number
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nc_reservations_prestataire_id_fkey"
            columns: ["prestataire_id"]
            isOneToOne: false
            referencedRelation: "nc_prestataires"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nc_reservations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "nc_services"
            referencedColumns: ["id"]
          },
        ]
      }
      nc_services: {
        Row: {
          active: boolean | null
          category_id: string
          created_at: string
          description: string | null
          duration: number
          id: string
          images: string[] | null
          location_type: string
          name: string
          prestataire_id: string
          price: number
          requirements: string[] | null
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          category_id: string
          created_at?: string
          description?: string | null
          duration: number
          id?: string
          images?: string[] | null
          location_type?: string
          name: string
          prestataire_id: string
          price: number
          requirements?: string[] | null
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          category_id?: string
          created_at?: string
          description?: string | null
          duration?: number
          id?: string
          images?: string[] | null
          location_type?: string
          name?: string
          prestataire_id?: string
          price?: number
          requirements?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "nc_services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "nc_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nc_services_prestataire_id_fkey"
            columns: ["prestataire_id"]
            isOneToOne: false
            referencedRelation: "nc_prestataires"
            referencedColumns: ["id"]
          },
        ]
      }
      news_events: {
        Row: {
          content: string
          created_at: string
          created_by: string | null
          end_date: string | null
          event_type: string
          id: string
          published: boolean
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          event_type?: string
          id?: string
          published?: boolean
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          event_type?: string
          id?: string
          published?: boolean
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string
          data: Json | null
          expires_at: string | null
          id: string
          message: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          data?: Json | null
          expires_at?: string | null
          id?: string
          message: string
          read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          data?: Json | null
          expires_at?: string | null
          id?: string
          message?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          product_id: string | null
          quantity: number
          unit_price: number
        }
        Insert: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity: number
          unit_price: number
        }
        Update: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          quantity?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_history: {
        Row: {
          changed_by: string | null
          created_at: string | null
          id: string
          new_status: string
          notes: string | null
          old_status: string | null
          order_id: string | null
        }
        Insert: {
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status: string
          notes?: string | null
          old_status?: string | null
          order_id?: string | null
        }
        Update: {
          changed_by?: string | null
          created_at?: string | null
          id?: string
          new_status?: string
          notes?: string | null
          old_status?: string | null
          order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_id: string | null
          created_at: string | null
          delivery_address: string | null
          delivery_date: string | null
          delivery_method: string | null
          farmer_id: string | null
          id: string
          notes: string | null
          payment_metadata: Json | null
          payment_method: string | null
          payment_status: string | null
          status: string
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          total: number
          updated_at: string | null
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string | null
          delivery_address?: string | null
          delivery_date?: string | null
          delivery_method?: string | null
          farmer_id?: string | null
          id?: string
          notes?: string | null
          payment_metadata?: Json | null
          payment_method?: string | null
          payment_status?: string | null
          status: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          total: number
          updated_at?: string | null
        }
        Update: {
          buyer_id?: string | null
          created_at?: string | null
          delivery_address?: string | null
          delivery_date?: string | null
          delivery_method?: string | null
          farmer_id?: string | null
          id?: string
          notes?: string | null
          payment_metadata?: Json | null
          payment_method?: string | null
          payment_status?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          total?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          id: string
          logo: string
          name: string
          position: number
        }
        Insert: {
          id?: string
          logo?: string
          name: string
          position?: number
        }
        Update: {
          id?: string
          logo?: string
          name?: string
          position?: number
        }
        Relationships: []
      }
      plan_limits: {
        Row: {
          enforcement: string
          feature: string
          id: string
          limit_per_day: number | null
          limit_per_month: number | null
          plan_id: string
        }
        Insert: {
          enforcement?: string
          feature: string
          id?: string
          limit_per_day?: number | null
          limit_per_month?: number | null
          plan_id: string
        }
        Update: {
          enforcement?: string
          feature?: string
          id?: string
          limit_per_day?: number | null
          limit_per_month?: number | null
          plan_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plan_limits_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      plan_usage: {
        Row: {
          feature: string
          id: string
          period_end: string
          period_start: string
          used: number
          user_id: string
        }
        Insert: {
          feature: string
          id?: string
          period_end: string
          period_start: string
          used?: number
          user_id: string
        }
        Update: {
          feature?: string
          id?: string
          period_end?: string
          period_start?: string
          used?: number
          user_id?: string
        }
        Relationships: []
      }
      player_achievements: {
        Row: {
          achievement_id: string
          id: string
          progress: Json | null
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          achievement_id: string
          id?: string
          progress?: Json | null
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          achievement_id?: string
          id?: string
          progress?: Json | null
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      player_analytics: {
        Row: {
          average_score: number | null
          average_think_time: number | null
          best_word: string | null
          best_word_score: number | null
          created_at: string | null
          date: string
          favorite_words: Json | null
          games_played: number | null
          id: string
          letters_used: Json | null
          total_score: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          average_score?: number | null
          average_think_time?: number | null
          best_word?: string | null
          best_word_score?: number | null
          created_at?: string | null
          date?: string
          favorite_words?: Json | null
          games_played?: number | null
          id?: string
          letters_used?: Json | null
          total_score?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          average_score?: number | null
          average_think_time?: number | null
          best_word?: string | null
          best_word_score?: number | null
          created_at?: string | null
          date?: string
          favorite_words?: Json | null
          games_played?: number | null
          id?: string
          letters_used?: Json | null
          total_score?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      player_goals: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          current_value: number | null
          deadline: string | null
          description: string | null
          goal_type: string
          id: string
          metric_type: string
          reward_points: number | null
          target_value: number
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_value?: number | null
          deadline?: string | null
          description?: string | null
          goal_type: string
          id?: string
          metric_type: string
          reward_points?: number | null
          target_value: number
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_value?: number | null
          deadline?: string | null
          description?: string | null
          goal_type?: string
          id?: string
          metric_type?: string
          reward_points?: number | null
          target_value?: number
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      player_rankings: {
        Row: {
          best_streak: number
          current_streak: number
          draws: number
          elo_rating: number
          games_played: number
          highest_elo: number
          id: string
          losses: number
          rank_position: number | null
          updated_at: string
          user_id: string
          wins: number
        }
        Insert: {
          best_streak?: number
          current_streak?: number
          draws?: number
          elo_rating?: number
          games_played?: number
          highest_elo?: number
          id?: string
          losses?: number
          rank_position?: number | null
          updated_at?: string
          user_id: string
          wins?: number
        }
        Update: {
          best_streak?: number
          current_streak?: number
          draws?: number
          elo_rating?: number
          games_played?: number
          highest_elo?: number
          id?: string
          losses?: number
          rank_position?: number | null
          updated_at?: string
          user_id?: string
          wins?: number
        }
        Relationships: []
      }
      player_stats: {
        Row: {
          average_score: number | null
          best_word: string | null
          best_word_score: number | null
          id: string
          total_games: number | null
          updated_at: string
          user_id: string
          wins: number | null
        }
        Insert: {
          average_score?: number | null
          best_word?: string | null
          best_word_score?: number | null
          id?: string
          total_games?: number | null
          updated_at?: string
          user_id: string
          wins?: number | null
        }
        Update: {
          average_score?: number | null
          best_word?: string | null
          best_word_score?: number | null
          id?: string
          total_games?: number | null
          updated_at?: string
          user_id?: string
          wins?: number | null
        }
        Relationships: []
      }
      player_streaks: {
        Row: {
          best_count: number | null
          created_at: string | null
          current_count: number | null
          id: string
          is_active: boolean | null
          last_activity_date: string | null
          streak_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          best_count?: number | null
          created_at?: string | null
          current_count?: number | null
          id?: string
          is_active?: boolean | null
          last_activity_date?: string | null
          streak_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          best_count?: number | null
          created_at?: string | null
          current_count?: number | null
          id?: string
          is_active?: boolean | null
          last_activity_date?: string | null
          streak_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      practice_sessions: {
        Row: {
          best_word: string | null
          best_word_score: number | null
          completed: boolean | null
          created_at: string | null
          difficulty: string | null
          duration: number | null
          hints_used: number | null
          id: string
          mistakes_count: number | null
          score: number | null
          session_data: Json | null
          session_type: string
          user_id: string
          words_found: number | null
        }
        Insert: {
          best_word?: string | null
          best_word_score?: number | null
          completed?: boolean | null
          created_at?: string | null
          difficulty?: string | null
          duration?: number | null
          hints_used?: number | null
          id?: string
          mistakes_count?: number | null
          score?: number | null
          session_data?: Json | null
          session_type: string
          user_id: string
          words_found?: number | null
        }
        Update: {
          best_word?: string | null
          best_word_score?: number | null
          completed?: boolean | null
          created_at?: string | null
          difficulty?: string | null
          duration?: number | null
          hints_used?: number | null
          id?: string
          mistakes_count?: number | null
          score?: number | null
          session_data?: Json | null
          session_type?: string
          user_id?: string
          words_found?: number | null
        }
        Relationships: []
      }
      premium_subscriptions: {
        Row: {
          auto_renew: boolean | null
          billing_cycle: string | null
          created_at: string
          expiration_notifications_sent: Json | null
          expires_at: string
          id: string
          institution_id: string | null
          last_payment_date: string | null
          next_billing_date: string | null
          payment_method_id: string | null
          plan: string
          plan_id: string | null
          starts_at: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          trial_starts_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          auto_renew?: boolean | null
          billing_cycle?: string | null
          created_at?: string
          expiration_notifications_sent?: Json | null
          expires_at: string
          id?: string
          institution_id?: string | null
          last_payment_date?: string | null
          next_billing_date?: string | null
          payment_method_id?: string | null
          plan?: string
          plan_id?: string | null
          starts_at?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          trial_starts_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          auto_renew?: boolean | null
          billing_cycle?: string | null
          created_at?: string
          expiration_notifications_sent?: Json | null
          expires_at?: string
          id?: string
          institution_id?: string | null
          last_payment_date?: string | null
          next_billing_date?: string | null
          payment_method_id?: string | null
          plan?: string
          plan_id?: string | null
          starts_at?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          trial_starts_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "premium_subscriptions_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "premium_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      processed_webhook_events: {
        Row: {
          error: string | null
          event_id: string
          id: string
          idempotency_key: string | null
          payload: Json
          processed_at: string | null
          received_at: string
          source: string
          status: string
        }
        Insert: {
          error?: string | null
          event_id: string
          id?: string
          idempotency_key?: string | null
          payload?: Json
          processed_at?: string | null
          received_at?: string
          source: string
          status?: string
        }
        Update: {
          error?: string | null
          event_id?: string
          id?: string
          idempotency_key?: string | null
          payload?: Json
          processed_at?: string | null
          received_at?: string
          source?: string
          status?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          available_from: string | null
          available_to: string | null
          category_id: string | null
          created_at: string | null
          description: string | null
          farm_pickup: boolean | null
          farmer_id: string | null
          free_delivery: boolean | null
          id: string
          image_url: string | null
          images: Json | null
          is_organic: boolean | null
          is_seasonal: boolean | null
          name: string
          price: number
          primary_image_url: string | null
          quantity: number
          rating: number | null
          reviews_count: number | null
          stock: number | null
          tags: string[] | null
          unit: string | null
        }
        Insert: {
          available_from?: string | null
          available_to?: string | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          farm_pickup?: boolean | null
          farmer_id?: string | null
          free_delivery?: boolean | null
          id?: string
          image_url?: string | null
          images?: Json | null
          is_organic?: boolean | null
          is_seasonal?: boolean | null
          name: string
          price: number
          primary_image_url?: string | null
          quantity: number
          rating?: number | null
          reviews_count?: number | null
          stock?: number | null
          tags?: string[] | null
          unit?: string | null
        }
        Update: {
          available_from?: string | null
          available_to?: string | null
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          farm_pickup?: boolean | null
          farmer_id?: string | null
          free_delivery?: boolean | null
          id?: string
          image_url?: string | null
          images?: Json | null
          is_organic?: boolean | null
          is_seasonal?: boolean | null
          name?: string
          price?: number
          primary_image_url?: string | null
          quantity?: number
          rating?: number | null
          reviews_count?: number | null
          stock?: number | null
          tags?: string[] | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          institution_id: string | null
          last_name: string | null
          phone_number: string | null
          role: string
        }
        Insert: {
          first_name?: string | null
          id: string
          institution_id?: string | null
          last_name?: string | null
          phone_number?: string | null
          role?: string
        }
        Update: {
          first_name?: string | null
          id?: string
          institution_id?: string | null
          last_name?: string | null
          phone_number?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      puzzle_completions: {
        Row: {
          attempts: number | null
          completed_at: string | null
          id: string
          puzzle_id: string
          score: number | null
          time_taken: number | null
          user_id: string
        }
        Insert: {
          attempts?: number | null
          completed_at?: string | null
          id?: string
          puzzle_id: string
          score?: number | null
          time_taken?: number | null
          user_id: string
        }
        Update: {
          attempts?: number | null
          completed_at?: string | null
          id?: string
          puzzle_id?: string
          score?: number | null
          time_taken?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "puzzle_completions_puzzle_id_fkey"
            columns: ["puzzle_id"]
            isOneToOne: false
            referencedRelation: "daily_puzzles"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_alerts: {
        Row: {
          content: string
          created_at: string
          id: string
          is_active: boolean
          level: string
          resident_id: string | null
          title: string
          type: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_active?: boolean
          level: string
          resident_id?: string | null
          title: string
          type: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean
          level?: string
          resident_id?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_alerts_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_appointments: {
        Row: {
          appointment_date: string
          appointment_type: string
          created_at: string
          created_by: string
          description: string | null
          end_time: string
          id: string
          location: string | null
          notes: string | null
          reminder_sent: boolean
          reminder_sent_at: string | null
          resident_id: string
          staff_id: string | null
          start_time: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_type: string
          created_at?: string
          created_by: string
          description?: string | null
          end_time: string
          id?: string
          location?: string | null
          notes?: string | null
          reminder_sent?: boolean
          reminder_sent_at?: string | null
          resident_id: string
          staff_id?: string | null
          start_time: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_type?: string
          created_at?: string
          created_by?: string
          description?: string | null
          end_time?: string
          id?: string
          location?: string | null
          notes?: string | null
          reminder_sent?: boolean
          reminder_sent_at?: string | null
          resident_id?: string
          staff_id?: string | null
          start_time?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_appointments_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_appointments_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_audit_logs: {
        Row: {
          action: string
          actor_user_id: string
          created_at: string
          description: string | null
          details: Json | null
          event_type: string
          id: string
          ip_address: string | null
          target_id: string | null
          target_table: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_user_id: string
          created_at?: string
          description?: string | null
          details?: Json | null
          event_type: string
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_table?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_user_id?: string
          created_at?: string
          description?: string | null
          details?: Json | null
          event_type?: string
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_table?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      pz_billing_rules: {
        Row: {
          amount: number
          applicable_to: string | null
          auto_generate: boolean
          created_at: string
          created_by: string | null
          description: string | null
          frequency_days: number | null
          id: string
          is_active: boolean
          name: string
          room_types: string[] | null
          rule_type: string
          updated_at: string
        }
        Insert: {
          amount: number
          applicable_to?: string | null
          auto_generate?: boolean
          created_at?: string
          created_by?: string | null
          description?: string | null
          frequency_days?: number | null
          id?: string
          is_active?: boolean
          name: string
          room_types?: string[] | null
          rule_type: string
          updated_at?: string
        }
        Update: {
          amount?: number
          applicable_to?: string | null
          auto_generate?: boolean
          created_at?: string
          created_by?: string | null
          description?: string | null
          frequency_days?: number | null
          id?: string
          is_active?: boolean
          name?: string
          room_types?: string[] | null
          rule_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      pz_daily_care_logs: {
        Row: {
          care_date: string
          care_description: string
          care_time: string
          care_type: string
          created_at: string
          id: string
          notes: string | null
          org_id: string
          resident_id: string
          staff_id: string
          updated_at: string
          validated_at: string | null
          validated_by: string | null
          validation_notes: string | null
          validation_status: string | null
        }
        Insert: {
          care_date: string
          care_description: string
          care_time: string
          care_type: string
          created_at?: string
          id?: string
          notes?: string | null
          org_id: string
          resident_id: string
          staff_id: string
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
          validation_notes?: string | null
          validation_status?: string | null
        }
        Update: {
          care_date?: string
          care_description?: string
          care_time?: string
          care_type?: string
          created_at?: string
          id?: string
          notes?: string | null
          org_id?: string
          resident_id?: string
          staff_id?: string
          updated_at?: string
          validated_at?: string | null
          validated_by?: string | null
          validation_notes?: string | null
          validation_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pz_daily_care_logs_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "pz_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_daily_care_logs_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_daily_care_logs_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_daily_care_logs_validated_by_fkey"
            columns: ["validated_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_dietary_restrictions: {
        Row: {
          created_at: string
          end_date: string | null
          id: string
          medical_notes: string | null
          org_id: string
          prescribed_by: string | null
          resident_id: string
          restriction_type: string
          severity: string
          start_date: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: string
          medical_notes?: string | null
          org_id: string
          prescribed_by?: string | null
          resident_id: string
          restriction_type: string
          severity?: string
          start_date?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: string
          medical_notes?: string | null
          org_id?: string
          prescribed_by?: string | null
          resident_id?: string
          restriction_type?: string
          severity?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_dietary_restrictions_prescribed_by_fkey"
            columns: ["prescribed_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_dietary_restrictions_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_exports: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          export_type: string
          file_name: string
          file_path: string | null
          id: string
          parameters: Json | null
          status: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          export_type: string
          file_name: string
          file_path?: string | null
          id?: string
          parameters?: Json | null
          status?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          export_type?: string
          file_name?: string
          file_path?: string | null
          id?: string
          parameters?: Json | null
          status?: string
        }
        Relationships: []
      }
      pz_floors: {
        Row: {
          created_at: string
          description: string | null
          floor_number: number
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          floor_number: number
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          floor_number?: number
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      pz_inventory: {
        Row: {
          category: Database["public"]["Enums"]["stock_category"]
          created_at: string
          created_by: string | null
          current_stock: number
          description: string | null
          expiry_date: string | null
          id: string
          is_active: boolean
          lot_number: string | null
          maximum_stock: number | null
          minimum_stock: number
          name: string
          storage_location: string | null
          supplier_id: string | null
          unit: string
          unit_price: number | null
          updated_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["stock_category"]
          created_at?: string
          created_by?: string | null
          current_stock?: number
          description?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean
          lot_number?: string | null
          maximum_stock?: number | null
          minimum_stock?: number
          name: string
          storage_location?: string | null
          supplier_id?: string | null
          unit?: string
          unit_price?: number | null
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["stock_category"]
          created_at?: string
          created_by?: string | null
          current_stock?: number
          description?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean
          lot_number?: string | null
          maximum_stock?: number | null
          minimum_stock?: number
          name?: string
          storage_location?: string | null
          supplier_id?: string | null
          unit?: string
          unit_price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_inventory_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "pz_suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_invoices: {
        Row: {
          amount: number
          billing_rule_id: string | null
          created_at: string
          created_by: string | null
          currency: string
          description: string | null
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          line_items: Json | null
          notes: string | null
          paid_date: string | null
          payment_terms: string | null
          resident_id: string | null
          status: string
          tax_amount: number | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          amount: number
          billing_rule_id?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          due_date: string
          id?: string
          invoice_number: string
          issue_date: string
          line_items?: Json | null
          notes?: string | null
          paid_date?: string | null
          payment_terms?: string | null
          resident_id?: string | null
          status?: string
          tax_amount?: number | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          amount?: number
          billing_rule_id?: string | null
          created_at?: string
          created_by?: string | null
          currency?: string
          description?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          line_items?: Json | null
          notes?: string | null
          paid_date?: string | null
          payment_terms?: string | null
          resident_id?: string | null
          status?: string
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_invoices_billing_rule_id_fkey"
            columns: ["billing_rule_id"]
            isOneToOne: false
            referencedRelation: "pz_billing_rules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_invoices_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_leave_attachments: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          leave_id: string
          mime_type: string | null
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          leave_id: string
          mime_type?: string | null
          uploaded_by: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          leave_id?: string
          mime_type?: string | null
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_leave_attachments_leave_id_fkey"
            columns: ["leave_id"]
            isOneToOne: false
            referencedRelation: "pz_leaves"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_leave_balances: {
        Row: {
          allocated_days: number
          carried_over_days: number
          created_at: string
          id: string
          leave_type: string
          remaining_days: number | null
          staff_id: string
          updated_at: string
          used_days: number
          year: number
        }
        Insert: {
          allocated_days?: number
          carried_over_days?: number
          created_at?: string
          id?: string
          leave_type: string
          remaining_days?: number | null
          staff_id: string
          updated_at?: string
          used_days?: number
          year: number
        }
        Update: {
          allocated_days?: number
          carried_over_days?: number
          created_at?: string
          id?: string
          leave_type?: string
          remaining_days?: number | null
          staff_id?: string
          updated_at?: string
          used_days?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "pz_leave_balances_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_leave_comments: {
        Row: {
          author_user_id: string
          content: string
          created_at: string
          id: string
          leave_id: string
        }
        Insert: {
          author_user_id: string
          content: string
          created_at?: string
          id?: string
          leave_id: string
        }
        Update: {
          author_user_id?: string
          content?: string
          created_at?: string
          id?: string
          leave_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_leave_comments_leave_id_fkey"
            columns: ["leave_id"]
            isOneToOne: false
            referencedRelation: "pz_leaves"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_leave_status_logs: {
        Row: {
          changed_at: string
          changed_by: string | null
          id: string
          leave_id: string
          new_status: string | null
          note: string | null
          old_status: string | null
        }
        Insert: {
          changed_at?: string
          changed_by?: string | null
          id?: string
          leave_id: string
          new_status?: string | null
          note?: string | null
          old_status?: string | null
        }
        Update: {
          changed_at?: string
          changed_by?: string | null
          id?: string
          leave_id?: string
          new_status?: string | null
          note?: string | null
          old_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pz_leave_status_logs_leave_id_fkey"
            columns: ["leave_id"]
            isOneToOne: false
            referencedRelation: "pz_leaves"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_leaves: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          approver1_at: string | null
          approver1_comment: string | null
          approver1_decision_at: string | null
          approver1_user_id: string | null
          approver2_at: string | null
          approver2_comment: string | null
          approver2_decision_at: string | null
          approver2_user_id: string | null
          created_at: string
          days_count: number
          decision_comment: string | null
          end_date: string
          id: string
          leave_type: string
          notes: string | null
          reason: string | null
          replacement_staff_id: string | null
          staff_id: string
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          approver1_at?: string | null
          approver1_comment?: string | null
          approver1_decision_at?: string | null
          approver1_user_id?: string | null
          approver2_at?: string | null
          approver2_comment?: string | null
          approver2_decision_at?: string | null
          approver2_user_id?: string | null
          created_at?: string
          days_count: number
          decision_comment?: string | null
          end_date: string
          id?: string
          leave_type: string
          notes?: string | null
          reason?: string | null
          replacement_staff_id?: string | null
          staff_id: string
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          approver1_at?: string | null
          approver1_comment?: string | null
          approver1_decision_at?: string | null
          approver1_user_id?: string | null
          approver2_at?: string | null
          approver2_comment?: string | null
          approver2_decision_at?: string | null
          approver2_user_id?: string | null
          created_at?: string
          days_count?: number
          decision_comment?: string | null
          end_date?: string
          id?: string
          leave_type?: string
          notes?: string | null
          reason?: string | null
          replacement_staff_id?: string | null
          staff_id?: string
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_leaves_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_leaves_replacement_staff_id_fkey"
            columns: ["replacement_staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_leaves_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_meal_plans: {
        Row: {
          created_at: string
          id: string
          meal_date: string
          meal_type: string
          menu_id: string
          org_id: string
          quantity_served: number | null
          resident_id: string
          served_by: string | null
          service_notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          meal_date: string
          meal_type: string
          menu_id: string
          org_id: string
          quantity_served?: number | null
          resident_id: string
          served_by?: string | null
          service_notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          meal_date?: string
          meal_type?: string
          menu_id?: string
          org_id?: string
          quantity_served?: number | null
          resident_id?: string
          served_by?: string | null
          service_notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_meal_plans_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "pz_menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_meal_plans_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_meal_plans_served_by_fkey"
            columns: ["served_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_medical_records: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          doctor_name: string | null
          id: string
          is_active: boolean
          medical_data: Json | null
          next_review_date: string | null
          priority: string
          record_type: string
          resident_id: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          doctor_name?: string | null
          id?: string
          is_active?: boolean
          medical_data?: Json | null
          next_review_date?: string | null
          priority?: string
          record_type: string
          resident_id: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          doctor_name?: string | null
          id?: string
          is_active?: boolean
          medical_data?: Json | null
          next_review_date?: string | null
          priority?: string
          record_type?: string
          resident_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_medical_records_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_medical_records_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_menus: {
        Row: {
          allergens: string[] | null
          calories: number | null
          carbohydrates: number | null
          created_at: string
          created_by: string | null
          description: string | null
          fiber: number | null
          id: string
          ingredients: string[] | null
          is_active: boolean
          lipids: number | null
          meal_type: string
          name: string
          org_id: string
          proteins: number | null
          sodium: number | null
          unit_cost: number | null
          updated_at: string
        }
        Insert: {
          allergens?: string[] | null
          calories?: number | null
          carbohydrates?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          fiber?: number | null
          id?: string
          ingredients?: string[] | null
          is_active?: boolean
          lipids?: number | null
          meal_type: string
          name: string
          org_id: string
          proteins?: number | null
          sodium?: number | null
          unit_cost?: number | null
          updated_at?: string
        }
        Update: {
          allergens?: string[] | null
          calories?: number | null
          carbohydrates?: number | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          fiber?: number | null
          id?: string
          ingredients?: string[] | null
          is_active?: boolean
          lipids?: number | null
          meal_type?: string
          name?: string
          org_id?: string
          proteins?: number | null
          sodium?: number | null
          unit_cost?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      pz_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean
          org_id: string
          read_at: string | null
          recipient_id: string
          recipient_staff_id: string | null
          sender_id: string
          sender_staff_id: string | null
          subject: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean
          org_id: string
          read_at?: string | null
          recipient_id: string
          recipient_staff_id?: string | null
          sender_id: string
          sender_staff_id?: string | null
          subject: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean
          org_id?: string
          read_at?: string | null
          recipient_id?: string
          recipient_staff_id?: string | null
          sender_id?: string
          sender_staff_id?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_messages_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "pz_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_messages_recipient_staff_id_fkey"
            columns: ["recipient_staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_messages_sender_staff_id_fkey"
            columns: ["sender_staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_notification_preferences: {
        Row: {
          categories: Json
          created_at: string
          email_enabled: boolean
          in_app_enabled: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          categories?: Json
          created_at?: string
          email_enabled?: boolean
          in_app_enabled?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          categories?: Json
          created_at?: string
          email_enabled?: boolean
          in_app_enabled?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pz_notifications: {
        Row: {
          created_at: string
          data: Json | null
          expires_at: string | null
          id: string
          is_read: boolean
          message: string
          priority: string
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message: string
          priority?: string
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message?: string
          priority?: string
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      pz_org_members: {
        Row: {
          created_at: string
          org_id: string
          role: Database["public"]["Enums"]["pz_org_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          org_id: string
          role?: Database["public"]["Enums"]["pz_org_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          org_id?: string
          role?: Database["public"]["Enums"]["pz_org_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_org_members_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "pz_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_org_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "pz_user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_organizations: {
        Row: {
          address: Json
          contact_email: string | null
          created_at: string
          id: string
          legal_name: string | null
          logo_url: string | null
          name: string
          phone: string | null
          siret: string | null
          timezone: string
          updated_at: string
        }
        Insert: {
          address?: Json
          contact_email?: string | null
          created_at?: string
          id?: string
          legal_name?: string | null
          logo_url?: string | null
          name: string
          phone?: string | null
          siret?: string | null
          timezone?: string
          updated_at?: string
        }
        Update: {
          address?: Json
          contact_email?: string | null
          created_at?: string
          id?: string
          legal_name?: string | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          siret?: string | null
          timezone?: string
          updated_at?: string
        }
        Relationships: []
      }
      pz_payments: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          currency: string
          id: string
          invoice_id: string | null
          notes: string | null
          payment_date: string
          payment_method: string
          payment_reference: string | null
          processed_by: string | null
          status: string
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          created_by?: string | null
          currency?: string
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date: string
          payment_method: string
          payment_reference?: string | null
          processed_by?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          currency?: string
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date?: string
          payment_method?: string
          payment_reference?: string | null
          processed_by?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "pz_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_push_subscriptions: {
        Row: {
          created_at: string
          endpoint: string
          id: string
          subscription: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: string
          subscription: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: string
          subscription?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pz_resident_contacts: {
        Row: {
          address: string | null
          created_at: string
          created_by: string | null
          email: string | null
          emergency_contact: boolean | null
          first_name: string
          id: string
          is_primary: boolean | null
          last_name: string
          notes: string | null
          phone: string | null
          relationship: string
          resident_id: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          emergency_contact?: boolean | null
          first_name: string
          id?: string
          is_primary?: boolean | null
          last_name: string
          notes?: string | null
          phone?: string | null
          relationship: string
          resident_id?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          emergency_contact?: boolean | null
          first_name?: string
          id?: string
          is_primary?: boolean | null
          last_name?: string
          notes?: string | null
          phone?: string | null
          relationship?: string
          resident_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_resident_contacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_resident_contacts_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_resident_history: {
        Row: {
          change_date: string
          change_description: Json
          change_type: string
          changed_by: string
          created_at: string
          id: string
          new_values: Json | null
          old_values: Json | null
          resident_id: string
        }
        Insert: {
          change_date?: string
          change_description?: Json
          change_type: string
          changed_by: string
          created_at?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          resident_id: string
        }
        Update: {
          change_date?: string
          change_description?: Json
          change_type?: string
          changed_by?: string
          created_at?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          resident_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_resident_history_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_resident_history_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_resident_qr_codes: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_active: boolean
          last_scanned: string | null
          qr_code: string
          resident_id: string
          scan_count: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          last_scanned?: string | null
          qr_code: string
          resident_id: string
          scan_count?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_active?: boolean
          last_scanned?: string | null
          qr_code?: string
          resident_id?: string
          scan_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "pz_resident_qr_codes_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_residents: {
        Row: {
          admission_date: string
          archive_reason: string | null
          archived: boolean
          archived_at: string | null
          archived_by: string | null
          birth_date: string
          created_at: string
          created_by: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relation: string | null
          first_name: string
          gender: string
          id: string
          last_name: string
          medical_notes: string | null
          org_id: string
          pathologies: string[] | null
          room_number: string
          updated_at: string
        }
        Insert: {
          admission_date: string
          archive_reason?: string | null
          archived?: boolean
          archived_at?: string | null
          archived_by?: string | null
          birth_date: string
          created_at?: string
          created_by?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          first_name: string
          gender: string
          id?: string
          last_name: string
          medical_notes?: string | null
          org_id: string
          pathologies?: string[] | null
          room_number: string
          updated_at?: string
        }
        Update: {
          admission_date?: string
          archive_reason?: string | null
          archived?: boolean
          archived_at?: string | null
          archived_by?: string | null
          birth_date?: string
          created_at?: string
          created_by?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          first_name?: string
          gender?: string
          id?: string
          last_name?: string
          medical_notes?: string | null
          org_id?: string
          pathologies?: string[] | null
          room_number?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_residents_archived_by_fkey"
            columns: ["archived_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_residents_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "pz_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_room_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          created_at: string
          end_reason: string | null
          ended_at: string | null
          id: string
          notes: string | null
          resident_id: string
          room_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          end_reason?: string | null
          ended_at?: string | null
          id?: string
          notes?: string | null
          resident_id: string
          room_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          created_at?: string
          end_reason?: string | null
          ended_at?: string | null
          id?: string
          notes?: string | null
          resident_id?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_room_assignments_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_room_assignments_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_room_assignments_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "pz_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_room_features: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_premium: boolean
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_premium?: boolean
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_premium?: boolean
          name?: string
        }
        Relationships: []
      }
      pz_room_features_assignments: {
        Row: {
          created_at: string
          feature_id: string
          id: string
          room_id: string
        }
        Insert: {
          created_at?: string
          feature_id: string
          id?: string
          room_id: string
        }
        Update: {
          created_at?: string
          feature_id?: string
          id?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_room_features_assignments_feature_id_fkey"
            columns: ["feature_id"]
            isOneToOne: false
            referencedRelation: "pz_room_features"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_room_features_assignments_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "pz_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_room_rates: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          effective_from: string
          effective_until: string | null
          id: string
          rate_type: string
          room_type_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          effective_from?: string
          effective_until?: string | null
          id?: string
          rate_type: string
          room_type_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          effective_from?: string
          effective_until?: string | null
          id?: string
          rate_type?: string
          room_type_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_room_rates_room_type_id_fkey"
            columns: ["room_type_id"]
            isOneToOne: false
            referencedRelation: "pz_room_types"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_room_types: {
        Row: {
          base_rate: number | null
          created_at: string
          default_features: Json | null
          description: string | null
          id: string
          max_capacity: number
          name: string
          updated_at: string
        }
        Insert: {
          base_rate?: number | null
          created_at?: string
          default_features?: Json | null
          description?: string | null
          id?: string
          max_capacity?: number
          name: string
          updated_at?: string
        }
        Update: {
          base_rate?: number | null
          created_at?: string
          default_features?: Json | null
          description?: string | null
          id?: string
          max_capacity?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      pz_rooms: {
        Row: {
          capacity: number | null
          created_at: string | null
          features: Json | null
          floor: number | null
          floor_id: string | null
          id: string
          notes: string | null
          occupancy_count: number
          org_id: string
          resident_id: string | null
          room_number: string
          room_type_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          features?: Json | null
          floor?: number | null
          floor_id?: string | null
          id?: string
          notes?: string | null
          occupancy_count?: number
          org_id: string
          resident_id?: string | null
          room_number: string
          room_type_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          features?: Json | null
          floor?: number | null
          floor_id?: string | null
          id?: string
          notes?: string | null
          occupancy_count?: number
          org_id?: string
          resident_id?: string | null
          room_number?: string
          room_type_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pz_rooms_floor_id_fkey"
            columns: ["floor_id"]
            isOneToOne: false
            referencedRelation: "pz_floors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_rooms_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "pz_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_rooms_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_rooms_room_type_id_fkey"
            columns: ["room_type_id"]
            isOneToOne: false
            referencedRelation: "pz_room_types"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_rtp_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          hours_requested: number
          id: string
          justification: string | null
          reason: string
          request_date: string
          staff_id: string
          status: string
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          hours_requested: number
          id?: string
          justification?: string | null
          reason: string
          request_date: string
          staff_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          hours_requested?: number
          id?: string
          justification?: string | null
          reason?: string
          request_date?: string
          staff_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_rtp_requests_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_rtp_requests_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_staff: {
        Row: {
          contract_type: Database["public"]["Enums"]["contract_type"] | null
          created_at: string
          email: string | null
          end_date: string | null
          first_name: string
          hire_date: string
          id: string
          is_active: boolean
          last_name: string
          org_id: string
          phone: string | null
          position: string
          role: Database["public"]["Enums"]["staff_role"]
          specialty: string | null
          start_date: string | null
          updated_at: string
        }
        Insert: {
          contract_type?: Database["public"]["Enums"]["contract_type"] | null
          created_at?: string
          email?: string | null
          end_date?: string | null
          first_name: string
          hire_date: string
          id?: string
          is_active?: boolean
          last_name: string
          org_id: string
          phone?: string | null
          position: string
          role?: Database["public"]["Enums"]["staff_role"]
          specialty?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          contract_type?: Database["public"]["Enums"]["contract_type"] | null
          created_at?: string
          email?: string | null
          end_date?: string | null
          first_name?: string
          hire_date?: string
          id?: string
          is_active?: boolean
          last_name?: string
          org_id?: string
          phone?: string | null
          position?: string
          role?: Database["public"]["Enums"]["staff_role"]
          specialty?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_staff_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "pz_organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_staff_certifications: {
        Row: {
          certificate_file_path: string | null
          created_at: string
          created_by: string | null
          expiry_date: string | null
          id: string
          notes: string | null
          obtained_date: string
          score: number | null
          staff_id: string
          status: string
          training_program_id: string
          updated_at: string
        }
        Insert: {
          certificate_file_path?: string | null
          created_at?: string
          created_by?: string | null
          expiry_date?: string | null
          id?: string
          notes?: string | null
          obtained_date: string
          score?: number | null
          staff_id: string
          status?: string
          training_program_id: string
          updated_at?: string
        }
        Update: {
          certificate_file_path?: string | null
          created_at?: string
          created_by?: string | null
          expiry_date?: string | null
          id?: string
          notes?: string | null
          obtained_date?: string
          score?: number | null
          staff_id?: string
          status?: string
          training_program_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_staff_certifications_program"
            columns: ["training_program_id"]
            isOneToOne: false
            referencedRelation: "pz_training_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_staff_certifications_staff"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_staff_certifications_training_program_id_fkey"
            columns: ["training_program_id"]
            isOneToOne: false
            referencedRelation: "pz_training_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_staff_contracts: {
        Row: {
          contract_file_url: string | null
          contract_type: string
          created_at: string
          end_date: string | null
          hours_per_week: number | null
          id: string
          is_current: boolean
          notes: string | null
          salary: number | null
          staff_id: string
          start_date: string
          updated_at: string
        }
        Insert: {
          contract_file_url?: string | null
          contract_type: string
          created_at?: string
          end_date?: string | null
          hours_per_week?: number | null
          id?: string
          is_current?: boolean
          notes?: string | null
          salary?: number | null
          staff_id: string
          start_date: string
          updated_at?: string
        }
        Update: {
          contract_file_url?: string | null
          contract_type?: string
          created_at?: string
          end_date?: string | null
          hours_per_week?: number | null
          id?: string
          is_current?: boolean
          notes?: string | null
          salary?: number | null
          staff_id?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_staff_contracts_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_staff_plannings: {
        Row: {
          created_at: string
          created_by: string | null
          date: string
          id: string
          notes: string | null
          shift_type: string
          staff_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          date: string
          id?: string
          notes?: string | null
          shift_type: string
          staff_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          date?: string
          id?: string
          notes?: string | null
          shift_type?: string
          staff_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_staff_plannings_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_stock_movements: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          inventory_id: string
          movement_date: string
          movement_type: Database["public"]["Enums"]["movement_type"]
          notes: string | null
          quantity: number
          reason: string | null
          reference_number: string | null
          staff_id: string | null
          supplier_id: string | null
          unit_price: number | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          inventory_id: string
          movement_date?: string
          movement_type: Database["public"]["Enums"]["movement_type"]
          notes?: string | null
          quantity: number
          reason?: string | null
          reference_number?: string | null
          staff_id?: string | null
          supplier_id?: string | null
          unit_price?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          inventory_id?: string
          movement_date?: string
          movement_type?: Database["public"]["Enums"]["movement_type"]
          notes?: string | null
          quantity?: number
          reason?: string | null
          reference_number?: string | null
          staff_id?: string | null
          supplier_id?: string | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pz_stock_movements_inventory_id_fkey"
            columns: ["inventory_id"]
            isOneToOne: false
            referencedRelation: "pz_inventory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_stock_movements_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_stock_movements_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "pz_suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_suppliers: {
        Row: {
          address: string | null
          contact_person: string | null
          created_at: string
          created_by: string | null
          email: string | null
          id: string
          is_active: boolean
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          contact_person?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          id?: string
          is_active?: boolean
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      pz_telemedicine_consultations: {
        Row: {
          consultation_type: string
          created_at: string
          duration_minutes: number
          ended_at: string | null
          id: string
          join_token: string | null
          notes: string | null
          participants: Json | null
          recording_url: string | null
          resident_id: string
          room_id: string | null
          room_url: string | null
          scheduled_by: string
          scheduled_for: string
          started_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          consultation_type?: string
          created_at?: string
          duration_minutes?: number
          ended_at?: string | null
          id?: string
          join_token?: string | null
          notes?: string | null
          participants?: Json | null
          recording_url?: string | null
          resident_id: string
          room_id?: string | null
          room_url?: string | null
          scheduled_by: string
          scheduled_for: string
          started_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          consultation_type?: string
          created_at?: string
          duration_minutes?: number
          ended_at?: string | null
          id?: string
          join_token?: string | null
          notes?: string | null
          participants?: Json | null
          recording_url?: string | null
          resident_id?: string
          room_id?: string | null
          room_url?: string | null
          scheduled_by?: string
          scheduled_for?: string
          started_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_telemedicine_consultations_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_telemedicine_consultations_scheduled_by_fkey"
            columns: ["scheduled_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_telemedicine_recordings: {
        Row: {
          access_log: Json | null
          consultation_id: string
          created_at: string
          duration_seconds: number | null
          file_size: number | null
          id: string
          recording_ended: string | null
          recording_started: string
          recording_url: string
          retention_until: string | null
        }
        Insert: {
          access_log?: Json | null
          consultation_id: string
          created_at?: string
          duration_seconds?: number | null
          file_size?: number | null
          id?: string
          recording_ended?: string | null
          recording_started: string
          recording_url: string
          retention_until?: string | null
        }
        Update: {
          access_log?: Json | null
          consultation_id?: string
          created_at?: string
          duration_seconds?: number | null
          file_size?: number | null
          id?: string
          recording_ended?: string | null
          recording_started?: string
          recording_url?: string
          retention_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pz_telemedicine_recordings_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "pz_telemedicine_consultations"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_telemedicine_sessions: {
        Row: {
          consultation_id: string
          created_at: string
          id: string
          joined_at: string
          left_at: string | null
          participant_id: string
          participant_type: string
          session_data: Json | null
        }
        Insert: {
          consultation_id: string
          created_at?: string
          id?: string
          joined_at?: string
          left_at?: string | null
          participant_id: string
          participant_type: string
          session_data?: Json | null
        }
        Update: {
          consultation_id?: string
          created_at?: string
          id?: string
          joined_at?: string
          left_at?: string | null
          participant_id?: string
          participant_type?: string
          session_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "pz_telemedicine_sessions_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "pz_telemedicine_consultations"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_training_enrollments: {
        Row: {
          attendance_status: string | null
          completion_score: number | null
          created_at: string
          enrollment_date: string
          id: string
          notes: string | null
          session_id: string
          staff_id: string
          updated_at: string
        }
        Insert: {
          attendance_status?: string | null
          completion_score?: number | null
          created_at?: string
          enrollment_date?: string
          id?: string
          notes?: string | null
          session_id: string
          staff_id: string
          updated_at?: string
        }
        Update: {
          attendance_status?: string | null
          completion_score?: number | null
          created_at?: string
          enrollment_date?: string
          id?: string
          notes?: string | null
          session_id?: string
          staff_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_training_enrollments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "pz_training_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_training_programs: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          is_mandatory: boolean
          min_score: number | null
          name: string
          updated_at: string
          validity_period_months: number | null
        }
        Insert: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_mandatory?: boolean
          min_score?: number | null
          name: string
          updated_at?: string
          validity_period_months?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          is_mandatory?: boolean
          min_score?: number | null
          name?: string
          updated_at?: string
          validity_period_months?: number | null
        }
        Relationships: []
      }
      pz_training_sessions: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          end_datetime: string
          id: string
          instructor_name: string | null
          location: string | null
          max_participants: number | null
          start_datetime: string
          status: string
          title: string
          training_program_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_datetime: string
          id?: string
          instructor_name?: string | null
          location?: string | null
          max_participants?: number | null
          start_datetime: string
          status?: string
          title: string
          training_program_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_datetime?: string
          id?: string
          instructor_name?: string | null
          location?: string | null
          max_participants?: number | null
          start_datetime?: string
          status?: string
          title?: string
          training_program_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_training_sessions_training_program_id_fkey"
            columns: ["training_program_id"]
            isOneToOne: false
            referencedRelation: "pz_training_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_user_profiles: {
        Row: {
          created_at: string
          current_org_id: string | null
          first_name: string
          id: string
          last_name: string
          notification_settings: Json | null
          role: string
          staff_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_org_id?: string | null
          first_name: string
          id: string
          last_name: string
          notification_settings?: Json | null
          role?: string
          staff_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_org_id?: string | null
          first_name?: string
          id?: string
          last_name?: string
          notification_settings?: Json | null
          role?: string
          staff_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_user_profiles_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_visit_slot_exceptions: {
        Row: {
          alternative_end_time: string | null
          alternative_max_visitors: number | null
          alternative_start_time: string | null
          created_at: string
          created_by: string
          exception_date: string
          id: string
          is_closed: boolean
          reason: string
          visit_slot_id: string
        }
        Insert: {
          alternative_end_time?: string | null
          alternative_max_visitors?: number | null
          alternative_start_time?: string | null
          created_at?: string
          created_by: string
          exception_date: string
          id?: string
          is_closed?: boolean
          reason: string
          visit_slot_id: string
        }
        Update: {
          alternative_end_time?: string | null
          alternative_max_visitors?: number | null
          alternative_start_time?: string | null
          created_at?: string
          created_by?: string
          exception_date?: string
          id?: string
          is_closed?: boolean
          reason?: string
          visit_slot_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pz_visit_slot_exceptions_visit_slot_id_fkey"
            columns: ["visit_slot_id"]
            isOneToOne: false
            referencedRelation: "pz_visit_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      pz_visit_slots: {
        Row: {
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_active: boolean
          max_visitors: number
          start_time: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_active?: boolean
          max_visitors?: number
          start_time: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_active?: boolean
          max_visitors?: number
          start_time?: string
          updated_at?: string
        }
        Relationships: []
      }
      pz_visit_types: {
        Row: {
          color: string
          created_at: string
          duration_minutes: number
          icon: string
          id: string
          is_active: boolean
          name: string
          requires_staff: boolean
        }
        Insert: {
          color?: string
          created_at?: string
          duration_minutes?: number
          icon?: string
          id?: string
          is_active?: boolean
          name: string
          requires_staff?: boolean
        }
        Update: {
          color?: string
          created_at?: string
          duration_minutes?: number
          icon?: string
          id?: string
          is_active?: boolean
          name?: string
          requires_staff?: boolean
        }
        Relationships: []
      }
      pz_visits: {
        Row: {
          cancellation_reason: string | null
          cancelled_at: string | null
          confirmed_at: string | null
          confirmed_by: string | null
          contact_id: string
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          resident_id: string
          special_requests: string | null
          status: string
          updated_at: string
          visit_date: string
          visit_slot_id: string
          visit_type_id: string | null
          visitor_count: number
        }
        Insert: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          confirmed_at?: string | null
          confirmed_by?: string | null
          contact_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          resident_id: string
          special_requests?: string | null
          status?: string
          updated_at?: string
          visit_date: string
          visit_slot_id: string
          visit_type_id?: string | null
          visitor_count?: number
        }
        Update: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          confirmed_at?: string | null
          confirmed_by?: string | null
          contact_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          resident_id?: string
          special_requests?: string | null
          status?: string
          updated_at?: string
          visit_date?: string
          visit_slot_id?: string
          visit_type_id?: string | null
          visitor_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "pz_visits_confirmed_by_fkey"
            columns: ["confirmed_by"]
            isOneToOne: false
            referencedRelation: "pz_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_visits_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "pz_resident_contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_visits_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "pz_residents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_visits_visit_slot_id_fkey"
            columns: ["visit_slot_id"]
            isOneToOne: false
            referencedRelation: "pz_visit_slots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pz_visits_visit_type_id_fkey"
            columns: ["visit_type_id"]
            isOneToOne: false
            referencedRelation: "pz_visit_types"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings: {
        Row: {
          buyer_id: string | null
          comment: string | null
          created_at: string | null
          id: string
          product_id: string | null
          score: number
        }
        Insert: {
          buyer_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          score: number
        }
        Update: {
          buyer_id?: string | null
          comment?: string | null
          created_at?: string | null
          id?: string
          product_id?: string | null
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "ratings_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          farmer_id: string | null
          helpful_count: number | null
          id: string
          not_helpful_count: number | null
          product_id: string | null
          rating: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          farmer_id?: string | null
          helpful_count?: number | null
          id?: string
          not_helpful_count?: number | null
          product_id?: string | null
          rating: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          farmer_id?: string | null
          helpful_count?: number | null
          id?: string
          not_helpful_count?: number | null
          product_id?: string | null
          rating?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_farmer_id_fkey"
            columns: ["farmer_id"]
            isOneToOne: false
            referencedRelation: "farmers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_ai_coach_profiles: {
        Row: {
          analysis_preferences: Json | null
          coach_personality: string | null
          coaching_style: string | null
          created_at: string
          id: string
          is_active: boolean | null
          training_focus: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          analysis_preferences?: Json | null
          coach_personality?: string | null
          coaching_style?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          training_focus?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          analysis_preferences?: Json | null
          coach_personality?: string | null
          coaching_style?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          training_focus?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sc_ai_conversations: {
        Row: {
          context_data: Json | null
          conversation_type: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          language: string | null
          messages: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          context_data?: Json | null
          conversation_type?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          messages?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          context_data?: Json | null
          conversation_type?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          messages?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sc_ai_generated_puzzles: {
        Row: {
          created_at: string
          difficulty: string | null
          generation_parameters: Json | null
          id: string
          is_active: boolean | null
          puzzle_data: Json
          puzzle_type: string
          quality_score: number | null
          solution_data: Json
          target_skills: Json | null
          usage_count: number | null
          user_ratings: Json | null
        }
        Insert: {
          created_at?: string
          difficulty?: string | null
          generation_parameters?: Json | null
          id?: string
          is_active?: boolean | null
          puzzle_data: Json
          puzzle_type: string
          quality_score?: number | null
          solution_data: Json
          target_skills?: Json | null
          usage_count?: number | null
          user_ratings?: Json | null
        }
        Update: {
          created_at?: string
          difficulty?: string | null
          generation_parameters?: Json | null
          id?: string
          is_active?: boolean | null
          puzzle_data?: Json
          puzzle_type?: string
          quality_score?: number | null
          solution_data?: Json
          target_skills?: Json | null
          usage_count?: number | null
          user_ratings?: Json | null
        }
        Relationships: []
      }
      sc_ai_suggestions: {
        Row: {
          confidence_score: number | null
          context: string
          created_at: string
          id: string
          is_applied: boolean | null
          suggestion_data: Json
          suggestion_type: string
          user_feedback: string | null
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          context: string
          created_at?: string
          id?: string
          is_applied?: boolean | null
          suggestion_data: Json
          suggestion_type: string
          user_feedback?: string | null
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          context?: string
          created_at?: string
          id?: string
          is_applied?: boolean | null
          suggestion_data?: Json
          suggestion_type?: string
          user_feedback?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sc_avatars: {
        Row: {
          avatar_data: Json
          avatar_type: string | null
          created_at: string | null
          customization_options: Json | null
          id: string
          is_active: boolean | null
          unlock_requirements: Json | null
          user_id: string
        }
        Insert: {
          avatar_data: Json
          avatar_type?: string | null
          created_at?: string | null
          customization_options?: Json | null
          id?: string
          is_active?: boolean | null
          unlock_requirements?: Json | null
          user_id: string
        }
        Update: {
          avatar_data?: Json
          avatar_type?: string | null
          created_at?: string | null
          customization_options?: Json | null
          id?: string
          is_active?: boolean | null
          unlock_requirements?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      sc_blitz_games: {
        Row: {
          completed_at: string | null
          created_at: string | null
          final_score: number | null
          id: string
          mode_id: string | null
          score: number | null
          status: string | null
          time_remaining: number | null
          user_id: string
          words_played: Json | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          final_score?: number | null
          id?: string
          mode_id?: string | null
          score?: number | null
          status?: string | null
          time_remaining?: number | null
          user_id: string
          words_played?: Json | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          final_score?: number | null
          id?: string
          mode_id?: string | null
          score?: number | null
          status?: string | null
          time_remaining?: number | null
          user_id?: string
          words_played?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "sc_blitz_games_mode_id_fkey"
            columns: ["mode_id"]
            isOneToOne: false
            referencedRelation: "sc_game_modes"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_club_forum_replies: {
        Row: {
          author_id: string
          content: string
          created_at: string
          forum_post_id: string
          id: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          forum_post_id: string
          id?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          forum_post_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sc_club_forum_replies_forum_post_id_fkey"
            columns: ["forum_post_id"]
            isOneToOne: false
            referencedRelation: "sc_club_forums"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_club_forums: {
        Row: {
          author_id: string
          club_id: string
          content: string
          created_at: string
          id: string
          is_pinned: boolean | null
          last_reply_at: string | null
          reply_count: number | null
          title: string
        }
        Insert: {
          author_id: string
          club_id: string
          content: string
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          last_reply_at?: string | null
          reply_count?: number | null
          title: string
        }
        Update: {
          author_id?: string
          club_id?: string
          content?: string
          created_at?: string
          id?: string
          is_pinned?: boolean | null
          last_reply_at?: string | null
          reply_count?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "sc_club_forums_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "sc_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_club_members: {
        Row: {
          club_id: string
          contribution_score: number | null
          id: string
          joined_at: string
          role: string
          user_id: string
        }
        Insert: {
          club_id: string
          contribution_score?: number | null
          id?: string
          joined_at?: string
          role?: string
          user_id: string
        }
        Update: {
          club_id?: string
          contribution_score?: number | null
          id?: string
          joined_at?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sc_club_members_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "sc_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_club_tournaments: {
        Row: {
          club_id: string
          created_at: string
          created_by: string
          description: string | null
          end_date: string | null
          entry_fee: number | null
          id: string
          max_participants: number | null
          name: string
          prize_description: string | null
          start_date: string
          status: string | null
          tournament_type: string | null
        }
        Insert: {
          club_id: string
          created_at?: string
          created_by: string
          description?: string | null
          end_date?: string | null
          entry_fee?: number | null
          id?: string
          max_participants?: number | null
          name: string
          prize_description?: string | null
          start_date: string
          status?: string | null
          tournament_type?: string | null
        }
        Update: {
          club_id?: string
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string | null
          entry_fee?: number | null
          id?: string
          max_participants?: number | null
          name?: string
          prize_description?: string | null
          start_date?: string
          status?: string | null
          tournament_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sc_club_tournaments_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "sc_clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_clubs: {
        Row: {
          club_image: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          is_public: boolean | null
          max_members: number | null
          name: string
          theme: string | null
          updated_at: string | null
        }
        Insert: {
          club_image?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          max_members?: number | null
          name: string
          theme?: string | null
          updated_at?: string | null
        }
        Update: {
          club_image?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          is_public?: boolean | null
          max_members?: number | null
          name?: string
          theme?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sc_comparison_metrics: {
        Row: {
          comparison_period: string | null
          comparison_type: string
          created_at: string | null
          id: string
          metrics_data: Json
          peer_group_data: Json | null
          percentile: number | null
          ranking_position: number | null
          user_id: string
        }
        Insert: {
          comparison_period?: string | null
          comparison_type: string
          created_at?: string | null
          id?: string
          metrics_data: Json
          peer_group_data?: Json | null
          percentile?: number | null
          ranking_position?: number | null
          user_id: string
        }
        Update: {
          comparison_period?: string | null
          comparison_type?: string
          created_at?: string | null
          id?: string
          metrics_data?: Json
          peer_group_data?: Json | null
          percentile?: number | null
          ranking_position?: number | null
          user_id?: string
        }
        Relationships: []
      }
      sc_cooperative_games: {
        Row: {
          ai_difficulty: string | null
          ai_score: number | null
          created_at: string | null
          game_data: Json | null
          id: string
          player1_id: string
          player2_id: string
          status: string | null
          team_score: number | null
          updated_at: string | null
          winner: string | null
        }
        Insert: {
          ai_difficulty?: string | null
          ai_score?: number | null
          created_at?: string | null
          game_data?: Json | null
          id?: string
          player1_id: string
          player2_id: string
          status?: string | null
          team_score?: number | null
          updated_at?: string | null
          winner?: string | null
        }
        Update: {
          ai_difficulty?: string | null
          ai_score?: number | null
          created_at?: string | null
          game_data?: Json | null
          id?: string
          player1_id?: string
          player2_id?: string
          status?: string | null
          team_score?: number | null
          updated_at?: string | null
          winner?: string | null
        }
        Relationships: []
      }
      sc_creative_mode_sessions: {
        Row: {
          completed_at: string | null
          constraints: Json
          created_at: string | null
          creativity_score: number | null
          duration: number | null
          id: string
          session_data: Json | null
          session_name: string | null
          user_id: string
          words_created: Json | null
        }
        Insert: {
          completed_at?: string | null
          constraints: Json
          created_at?: string | null
          creativity_score?: number | null
          duration?: number | null
          id?: string
          session_data?: Json | null
          session_name?: string | null
          user_id: string
          words_created?: Json | null
        }
        Update: {
          completed_at?: string | null
          constraints?: Json
          created_at?: string | null
          creativity_score?: number | null
          duration?: number | null
          id?: string
          session_data?: Json | null
          session_name?: string | null
          user_id?: string
          words_created?: Json | null
        }
        Relationships: []
      }
      sc_custom_themes: {
        Row: {
          animation_settings: Json | null
          background_settings: Json | null
          board_colors: Json
          created_at: string | null
          downloads_count: number | null
          font_settings: Json | null
          id: string
          is_public: boolean | null
          rating: number | null
          sound_settings: Json | null
          theme_name: string
          tile_colors: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          animation_settings?: Json | null
          background_settings?: Json | null
          board_colors: Json
          created_at?: string | null
          downloads_count?: number | null
          font_settings?: Json | null
          id?: string
          is_public?: boolean | null
          rating?: number | null
          sound_settings?: Json | null
          theme_name: string
          tile_colors: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          animation_settings?: Json | null
          background_settings?: Json | null
          board_colors?: Json
          created_at?: string | null
          downloads_count?: number | null
          font_settings?: Json | null
          id?: string
          is_public?: boolean | null
          rating?: number | null
          sound_settings?: Json | null
          theme_name?: string
          tile_colors?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sc_educational_content: {
        Row: {
          age_group: string | null
          content_data: Json
          content_type: string
          created_at: string | null
          created_by: string | null
          difficulty_level: string | null
          estimated_duration: number | null
          id: string
          is_approved: boolean | null
          learning_objectives: Json | null
          prerequisite_skills: Json | null
          target_language: string
        }
        Insert: {
          age_group?: string | null
          content_data: Json
          content_type: string
          created_at?: string | null
          created_by?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          id?: string
          is_approved?: boolean | null
          learning_objectives?: Json | null
          prerequisite_skills?: Json | null
          target_language: string
        }
        Update: {
          age_group?: string | null
          content_data?: Json
          content_type?: string
          created_at?: string | null
          created_by?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          id?: string
          is_approved?: boolean | null
          learning_objectives?: Json | null
          prerequisite_skills?: Json | null
          target_language?: string
        }
        Relationships: []
      }
      sc_error_analysis: {
        Row: {
          created_at: string
          error_category: string | null
          error_context: Json
          error_type: string
          frequency_score: number | null
          game_id: string | null
          id: string
          suggested_improvement: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          error_category?: string | null
          error_context: Json
          error_type: string
          frequency_score?: number | null
          game_id?: string | null
          id?: string
          suggested_improvement?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          error_category?: string | null
          error_context?: Json
          error_type?: string
          frequency_score?: number | null
          game_id?: string | null
          id?: string
          suggested_improvement?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sc_event_participations: {
        Row: {
          event_id: string
          final_score: number | null
          id: string
          joined_at: string
          progress_data: Json | null
          rank_position: number | null
          rewards_claimed: Json | null
          user_id: string
        }
        Insert: {
          event_id: string
          final_score?: number | null
          id?: string
          joined_at?: string
          progress_data?: Json | null
          rank_position?: number | null
          rewards_claimed?: Json | null
          user_id: string
        }
        Update: {
          event_id?: string
          final_score?: number | null
          id?: string
          joined_at?: string
          progress_data?: Json | null
          rank_position?: number | null
          rewards_claimed?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sc_event_participations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "sc_seasonal_events"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_friend_requests: {
        Row: {
          created_at: string
          id: string
          message: string | null
          receiver_id: string
          responded_at: string | null
          sender_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          receiver_id: string
          responded_at?: string | null
          sender_id: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          receiver_id?: string
          responded_at?: string | null
          sender_id?: string
          status?: string
        }
        Relationships: []
      }
      sc_friendships: {
        Row: {
          created_at: string
          games_played: number | null
          id: string
          last_interaction: string | null
          user1_id: string
          user2_id: string
        }
        Insert: {
          created_at?: string
          games_played?: number | null
          id?: string
          last_interaction?: string | null
          user1_id: string
          user2_id: string
        }
        Update: {
          created_at?: string
          games_played?: number | null
          id?: string
          last_interaction?: string | null
          user1_id?: string
          user2_id?: string
        }
        Relationships: []
      }
      sc_game_modes: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          max_players: number | null
          mode_type: string
          name: string
          special_rules: Json | null
          time_limit: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_players?: number | null
          mode_type: string
          name: string
          special_rules?: Json | null
          time_limit?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_players?: number | null
          mode_type?: string
          name?: string
          special_rules?: Json | null
          time_limit?: number | null
        }
        Relationships: []
      }
      sc_game_predictions: {
        Row: {
          accuracy_score: number | null
          actual_outcome: Json | null
          confidence_level: number
          created_at: string
          game_id: string
          id: string
          prediction_data: Json
          prediction_type: string
          user_id: string
        }
        Insert: {
          accuracy_score?: number | null
          actual_outcome?: Json | null
          confidence_level: number
          created_at?: string
          game_id: string
          id?: string
          prediction_data: Json
          prediction_type: string
          user_id: string
        }
        Update: {
          accuracy_score?: number | null
          actual_outcome?: Json | null
          confidence_level?: number
          created_at?: string
          game_id?: string
          id?: string
          prediction_data?: Json
          prediction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      sc_global_rankings: {
        Row: {
          average_score: number | null
          games_played: number | null
          id: string
          last_updated: string | null
          points: number
          previous_position: number | null
          rank_period: string | null
          rank_position: number
          ranking_type: string
          user_id: string
          win_rate: number | null
        }
        Insert: {
          average_score?: number | null
          games_played?: number | null
          id?: string
          last_updated?: string | null
          points: number
          previous_position?: number | null
          rank_period?: string | null
          rank_position: number
          ranking_type: string
          user_id: string
          win_rate?: number | null
        }
        Update: {
          average_score?: number | null
          games_played?: number | null
          id?: string
          last_updated?: string | null
          points?: number
          previous_position?: number | null
          rank_period?: string | null
          rank_position?: number
          ranking_type?: string
          user_id?: string
          win_rate?: number | null
        }
        Relationships: []
      }
      sc_language_learning_progress: {
        Row: {
          created_at: string | null
          current_level: string | null
          grammar_points_learned: Json | null
          id: string
          last_activity: string | null
          learning_streak: number | null
          progress_data: Json | null
          target_language: string
          total_study_time: number | null
          user_id: string
          vocabulary_mastered: Json | null
        }
        Insert: {
          created_at?: string | null
          current_level?: string | null
          grammar_points_learned?: Json | null
          id?: string
          last_activity?: string | null
          learning_streak?: number | null
          progress_data?: Json | null
          target_language: string
          total_study_time?: number | null
          user_id: string
          vocabulary_mastered?: Json | null
        }
        Update: {
          created_at?: string | null
          current_level?: string | null
          grammar_points_learned?: Json | null
          id?: string
          last_activity?: string | null
          learning_streak?: number | null
          progress_data?: Json | null
          target_language?: string
          total_study_time?: number | null
          user_id?: string
          vocabulary_mastered?: Json | null
        }
        Relationships: []
      }
      sc_league_memberships: {
        Row: {
          current_position: number | null
          games_played: number | null
          id: string
          joined_at: string | null
          league_id: string | null
          losses: number | null
          points: number | null
          season: number
          status: string | null
          user_id: string
          wins: number | null
        }
        Insert: {
          current_position?: number | null
          games_played?: number | null
          id?: string
          joined_at?: string | null
          league_id?: string | null
          losses?: number | null
          points?: number | null
          season: number
          status?: string | null
          user_id: string
          wins?: number | null
        }
        Update: {
          current_position?: number | null
          games_played?: number | null
          id?: string
          joined_at?: string | null
          league_id?: string | null
          losses?: number | null
          points?: number | null
          season?: number
          status?: string | null
          user_id?: string
          wins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sc_league_memberships_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "sc_leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_leagues: {
        Row: {
          created_at: string | null
          current_season: number | null
          division_level: number
          id: string
          league_name: string
          league_settings: Json | null
          max_elo: number
          min_elo: number
          promotion_spots: number | null
          relegation_spots: number | null
          season_end: string
          season_start: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          current_season?: number | null
          division_level: number
          id?: string
          league_name: string
          league_settings?: Json | null
          max_elo: number
          min_elo: number
          promotion_spots?: number | null
          relegation_spots?: number | null
          season_end: string
          season_start: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          current_season?: number | null
          division_level?: number
          id?: string
          league_name?: string
          league_settings?: Json | null
          max_elo?: number
          min_elo?: number
          promotion_spots?: number | null
          relegation_spots?: number | null
          season_end?: string
          season_start?: string
          status?: string | null
        }
        Relationships: []
      }
      sc_mastery_categories: {
        Row: {
          color: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          color?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          color?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      sc_mentor_profiles: {
        Row: {
          availability_schedule: Json | null
          bio: string | null
          created_at: string
          current_mentees: number | null
          experience_level: string | null
          id: string
          is_mentor: boolean | null
          is_seeking_mentor: boolean | null
          languages: string[] | null
          max_mentees: number | null
          rating: number | null
          specialties: string[] | null
          total_sessions: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          availability_schedule?: Json | null
          bio?: string | null
          created_at?: string
          current_mentees?: number | null
          experience_level?: string | null
          id?: string
          is_mentor?: boolean | null
          is_seeking_mentor?: boolean | null
          languages?: string[] | null
          max_mentees?: number | null
          rating?: number | null
          specialties?: string[] | null
          total_sessions?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          availability_schedule?: Json | null
          bio?: string | null
          created_at?: string
          current_mentees?: number | null
          experience_level?: string | null
          id?: string
          is_mentor?: boolean | null
          is_seeking_mentor?: boolean | null
          languages?: string[] | null
          max_mentees?: number | null
          rating?: number | null
          specialties?: string[] | null
          total_sessions?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sc_mentoring_relationships: {
        Row: {
          ended_at: string | null
          focus_areas: string[] | null
          goals: string | null
          id: string
          mentee_id: string
          mentor_id: string
          progress_notes: string | null
          sessions_completed: number | null
          started_at: string | null
          status: string | null
        }
        Insert: {
          ended_at?: string | null
          focus_areas?: string[] | null
          goals?: string | null
          id?: string
          mentee_id: string
          mentor_id: string
          progress_notes?: string | null
          sessions_completed?: number | null
          started_at?: string | null
          status?: string | null
        }
        Update: {
          ended_at?: string | null
          focus_areas?: string[] | null
          goals?: string | null
          id?: string
          mentee_id?: string
          mentor_id?: string
          progress_notes?: string | null
          sessions_completed?: number | null
          started_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      sc_mentoring_sessions: {
        Row: {
          created_at: string
          description: string | null
          duration_minutes: number | null
          feedback_mentee: string | null
          feedback_mentor: string | null
          id: string
          rating: number | null
          relationship_id: string
          scheduled_at: string
          session_type: string | null
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          feedback_mentee?: string | null
          feedback_mentor?: string | null
          id?: string
          rating?: number | null
          relationship_id: string
          scheduled_at: string
          session_type?: string | null
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_minutes?: number | null
          feedback_mentee?: string | null
          feedback_mentor?: string | null
          id?: string
          rating?: number | null
          relationship_id?: string
          scheduled_at?: string
          session_type?: string | null
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "sc_mentoring_sessions_relationship_id_fkey"
            columns: ["relationship_id"]
            isOneToOne: false
            referencedRelation: "sc_mentoring_relationships"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_performance_reports: {
        Row: {
          achievements_unlocked: Json | null
          games_analysis: Json
          generated_at: string | null
          id: string
          improvement_areas: Json | null
          performance_trends: Json | null
          period_end: string
          period_start: string
          recommendations: Json | null
          report_data: Json | null
          report_period: string
          user_id: string
        }
        Insert: {
          achievements_unlocked?: Json | null
          games_analysis: Json
          generated_at?: string | null
          id?: string
          improvement_areas?: Json | null
          performance_trends?: Json | null
          period_end: string
          period_start: string
          recommendations?: Json | null
          report_data?: Json | null
          report_period: string
          user_id: string
        }
        Update: {
          achievements_unlocked?: Json | null
          games_analysis?: Json
          generated_at?: string | null
          id?: string
          improvement_areas?: Json | null
          performance_trends?: Json | null
          period_end?: string
          period_start?: string
          recommendations?: Json | null
          report_data?: Json | null
          report_period?: string
          user_id?: string
        }
        Relationships: []
      }
      sc_player_heatmaps: {
        Row: {
          board_positions: Json
          created_at: string | null
          date: string | null
          id: string
          letter_usage: Json | null
          time_patterns: Json | null
          user_id: string
          word_categories: Json | null
        }
        Insert: {
          board_positions: Json
          created_at?: string | null
          date?: string | null
          id?: string
          letter_usage?: Json | null
          time_patterns?: Json | null
          user_id: string
          word_categories?: Json | null
        }
        Update: {
          board_positions?: Json
          created_at?: string | null
          date?: string | null
          id?: string
          letter_usage?: Json | null
          time_patterns?: Json | null
          user_id?: string
          word_categories?: Json | null
        }
        Relationships: []
      }
      sc_player_patterns: {
        Row: {
          confidence_score: number | null
          id: string
          is_active: boolean | null
          last_updated: string | null
          pattern_data: Json
          pattern_type: string
          sample_size: number | null
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          pattern_data: Json
          pattern_type: string
          sample_size?: number | null
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          pattern_data?: Json
          pattern_type?: string
          sample_size?: number | null
          user_id?: string
        }
        Relationships: []
      }
      sc_private_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          message_type: string | null
          read_at: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          message_type?: string | null
          read_at?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          message_type?: string | null
          read_at?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      sc_puzzle_challenges: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          difficulty: string | null
          id: string
          initial_board_state: Json
          is_daily: boolean | null
          max_moves: number | null
          points_reward: number | null
          target_solution: Json
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          initial_board_state: Json
          is_daily?: boolean | null
          max_moves?: number | null
          points_reward?: number | null
          target_solution: Json
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: string
          initial_board_state?: Json
          is_daily?: boolean | null
          max_moves?: number | null
          points_reward?: number | null
          target_solution?: Json
          title?: string
        }
        Relationships: []
      }
      sc_quests: {
        Row: {
          category: string
          created_at: string
          description: string
          difficulty: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          max_completions: number | null
          name: string
          quest_type: string
          requirements: Json
          rewards: Json
          start_date: string | null
          updated_at: string | null
          xp_reward: number | null
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          difficulty?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_completions?: number | null
          name: string
          quest_type: string
          requirements?: Json
          rewards?: Json
          start_date?: string | null
          updated_at?: string | null
          xp_reward?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          difficulty?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          max_completions?: number | null
          name?: string
          quest_type?: string
          requirements?: Json
          rewards?: Json
          start_date?: string | null
          updated_at?: string | null
          xp_reward?: number | null
        }
        Relationships: []
      }
      sc_seasonal_events: {
        Row: {
          created_at: string
          description: string
          end_date: string
          event_type: string
          id: string
          is_active: boolean | null
          name: string
          participation_requirements: Json | null
          rewards: Json | null
          special_rules: Json | null
          start_date: string
          theme: string | null
        }
        Insert: {
          created_at?: string
          description: string
          end_date: string
          event_type: string
          id?: string
          is_active?: boolean | null
          name: string
          participation_requirements?: Json | null
          rewards?: Json | null
          special_rules?: Json | null
          start_date: string
          theme?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string
          event_type?: string
          id?: string
          is_active?: boolean | null
          name?: string
          participation_requirements?: Json | null
          rewards?: Json | null
          special_rules?: Json | null
          start_date?: string
          theme?: string | null
        }
        Relationships: []
      }
      sc_skill_trees: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          tree_data: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          tree_data: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          tree_data?: Json
        }
        Relationships: []
      }
      sc_specialized_badges: {
        Row: {
          badge_type: string
          created_at: string
          description: string
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          rarity: string | null
          unlock_criteria: Json
        }
        Insert: {
          badge_type: string
          created_at?: string
          description: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          rarity?: string | null
          unlock_criteria: Json
        }
        Update: {
          badge_type?: string
          created_at?: string
          description?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          rarity?: string | null
          unlock_criteria?: Json
        }
        Relationships: []
      }
      sc_spectator_sessions: {
        Row: {
          game_id: string | null
          id: string
          interaction_data: Json | null
          joined_at: string | null
          left_at: string | null
          session_duration: number | null
          spectator_id: string
        }
        Insert: {
          game_id?: string | null
          id?: string
          interaction_data?: Json | null
          joined_at?: string | null
          left_at?: string | null
          session_duration?: number | null
          spectator_id: string
        }
        Update: {
          game_id?: string | null
          id?: string
          interaction_data?: Json | null
          joined_at?: string | null
          left_at?: string | null
          session_duration?: number | null
          spectator_id?: string
        }
        Relationships: []
      }
      sc_teacher_dashboard: {
        Row: {
          assignments: Json | null
          class_id: string | null
          created_at: string | null
          curriculum_settings: Json | null
          id: string
          performance_analytics: Json | null
          progress_tracking: Json | null
          students: Json | null
          teacher_id: string
          updated_at: string | null
        }
        Insert: {
          assignments?: Json | null
          class_id?: string | null
          created_at?: string | null
          curriculum_settings?: Json | null
          id?: string
          performance_analytics?: Json | null
          progress_tracking?: Json | null
          students?: Json | null
          teacher_id: string
          updated_at?: string | null
        }
        Update: {
          assignments?: Json | null
          class_id?: string | null
          created_at?: string | null
          curriculum_settings?: Json | null
          id?: string
          performance_analytics?: Json | null
          progress_tracking?: Json | null
          students?: Json | null
          teacher_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sc_tournament_brackets: {
        Row: {
          bracket_data: Json | null
          bracket_type: string | null
          created_at: string | null
          current_round: number | null
          id: string
          matches: Json | null
          max_rounds: number | null
          participants: Json | null
          status: string | null
          tournament_id: string | null
          updated_at: string | null
          winner_id: string | null
        }
        Insert: {
          bracket_data?: Json | null
          bracket_type?: string | null
          created_at?: string | null
          current_round?: number | null
          id?: string
          matches?: Json | null
          max_rounds?: number | null
          participants?: Json | null
          status?: string | null
          tournament_id?: string | null
          updated_at?: string | null
          winner_id?: string | null
        }
        Update: {
          bracket_data?: Json | null
          bracket_type?: string | null
          created_at?: string | null
          current_round?: number | null
          id?: string
          matches?: Json | null
          max_rounds?: number | null
          participants?: Json | null
          status?: string | null
          tournament_id?: string | null
          updated_at?: string | null
          winner_id?: string | null
        }
        Relationships: []
      }
      sc_tournament_systems: {
        Row: {
          bracket_id: string | null
          created_at: string | null
          created_by: string | null
          current_participants: number | null
          end_date: string | null
          entry_requirements: Json | null
          id: string
          max_participants: number | null
          prize_pool: Json | null
          start_date: string
          status: string | null
          tournament_name: string
          tournament_settings: Json | null
          tournament_type: string
        }
        Insert: {
          bracket_id?: string | null
          created_at?: string | null
          created_by?: string | null
          current_participants?: number | null
          end_date?: string | null
          entry_requirements?: Json | null
          id?: string
          max_participants?: number | null
          prize_pool?: Json | null
          start_date: string
          status?: string | null
          tournament_name: string
          tournament_settings?: Json | null
          tournament_type: string
        }
        Update: {
          bracket_id?: string | null
          created_at?: string | null
          created_by?: string | null
          current_participants?: number | null
          end_date?: string | null
          entry_requirements?: Json | null
          id?: string
          max_participants?: number | null
          prize_pool?: Json | null
          start_date?: string
          status?: string | null
          tournament_name?: string
          tournament_settings?: Json | null
          tournament_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "sc_tournament_systems_bracket_id_fkey"
            columns: ["bracket_id"]
            isOneToOne: false
            referencedRelation: "sc_tournament_brackets"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_training_plans: {
        Row: {
          adaptive_parameters: Json | null
          created_at: string
          created_by: string | null
          description: string | null
          difficulty_level: string | null
          estimated_duration: number | null
          exercises: Json
          focus_areas: Json
          id: string
          is_active: boolean | null
          plan_name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          adaptive_parameters?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          exercises: Json
          focus_areas: Json
          id?: string
          is_active?: boolean | null
          plan_name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          adaptive_parameters?: Json | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          estimated_duration?: number | null
          exercises?: Json
          focus_areas?: Json
          id?: string
          is_active?: boolean | null
          plan_name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sc_training_scenarios: {
        Row: {
          board_setup: Json
          created_at: string
          created_by: string | null
          description: string | null
          difficulty: string | null
          hint_system: Json | null
          id: string
          objectives: Json
          optimal_solutions: Json | null
          scenario_name: string
          scenario_type: string | null
          tiles_available: Json
          usage_statistics: Json | null
        }
        Insert: {
          board_setup: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          hint_system?: Json | null
          id?: string
          objectives: Json
          optimal_solutions?: Json | null
          scenario_name: string
          scenario_type?: string | null
          tiles_available: Json
          usage_statistics?: Json | null
        }
        Update: {
          board_setup?: Json
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          hint_system?: Json | null
          id?: string
          objectives?: Json
          optimal_solutions?: Json | null
          scenario_name?: string
          scenario_type?: string | null
          tiles_available?: Json
          usage_statistics?: Json | null
        }
        Relationships: []
      }
      sc_user_badges: {
        Row: {
          badge_id: string
          earned_at: string
          id: string
          progress_data: Json | null
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string
          id?: string
          progress_data?: Json | null
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string
          id?: string
          progress_data?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sc_user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "sc_specialized_badges"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_user_mastery: {
        Row: {
          category_id: string
          created_at: string
          experience_points: number | null
          id: string
          level: number | null
          mastery_percentage: number | null
          total_words_in_category: number | null
          updated_at: string | null
          user_id: string
          words_mastered: number | null
        }
        Insert: {
          category_id: string
          created_at?: string
          experience_points?: number | null
          id?: string
          level?: number | null
          mastery_percentage?: number | null
          total_words_in_category?: number | null
          updated_at?: string | null
          user_id: string
          words_mastered?: number | null
        }
        Update: {
          category_id?: string
          created_at?: string
          experience_points?: number | null
          id?: string
          level?: number | null
          mastery_percentage?: number | null
          total_words_in_category?: number | null
          updated_at?: string | null
          user_id?: string
          words_mastered?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sc_user_mastery_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "sc_mastery_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_user_preferences: {
        Row: {
          accessibility_settings: Json | null
          active_theme_id: string | null
          created_at: string | null
          gameplay_preferences: Json | null
          id: string
          language_preference: string | null
          notification_preferences: Json | null
          ui_preferences: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accessibility_settings?: Json | null
          active_theme_id?: string | null
          created_at?: string | null
          gameplay_preferences?: Json | null
          id?: string
          language_preference?: string | null
          notification_preferences?: Json | null
          ui_preferences?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accessibility_settings?: Json | null
          active_theme_id?: string | null
          created_at?: string | null
          gameplay_preferences?: Json | null
          id?: string
          language_preference?: string | null
          notification_preferences?: Json | null
          ui_preferences?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sc_user_preferences_active_theme_id_fkey"
            columns: ["active_theme_id"]
            isOneToOne: false
            referencedRelation: "sc_custom_themes"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_user_quests: {
        Row: {
          completed_at: string | null
          completion_count: number | null
          id: string
          progress: Json | null
          quest_id: string
          started_at: string
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completion_count?: number | null
          id?: string
          progress?: Json | null
          quest_id: string
          started_at?: string
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completion_count?: number | null
          id?: string
          progress?: Json | null
          quest_id?: string
          started_at?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sc_user_quests_quest_id_fkey"
            columns: ["quest_id"]
            isOneToOne: false
            referencedRelation: "sc_quests"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_user_skill_progress: {
        Row: {
          created_at: string
          id: string
          skill_points: number | null
          skill_tree_id: string
          unlocked_skills: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          skill_points?: number | null
          skill_tree_id: string
          unlocked_skills?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          skill_points?: number | null
          skill_tree_id?: string
          unlocked_skills?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sc_user_skill_progress_skill_tree_id_fkey"
            columns: ["skill_tree_id"]
            isOneToOne: false
            referencedRelation: "sc_skill_trees"
            referencedColumns: ["id"]
          },
        ]
      }
      sc_visual_effects: {
        Row: {
          created_at: string | null
          effect_data: Json
          effect_name: string
          effect_type: string
          id: string
          is_premium: boolean | null
          trigger_condition: Json
          unlock_level: number | null
        }
        Insert: {
          created_at?: string | null
          effect_data: Json
          effect_name: string
          effect_type: string
          id?: string
          is_premium?: boolean | null
          trigger_condition: Json
          unlock_level?: number | null
        }
        Update: {
          created_at?: string | null
          effect_data?: Json
          effect_name?: string
          effect_type?: string
          id?: string
          is_premium?: boolean | null
          trigger_condition?: Json
          unlock_level?: number | null
        }
        Relationships: []
      }
      sc_voice_analysis: {
        Row: {
          analysis_result: Json | null
          audio_data: string | null
          confidence_score: number | null
          id: string
          processed_at: string | null
          proposed_words: Json | null
          transcribed_text: string | null
          user_id: string
        }
        Insert: {
          analysis_result?: Json | null
          audio_data?: string | null
          confidence_score?: number | null
          id?: string
          processed_at?: string | null
          proposed_words?: Json | null
          transcribed_text?: string | null
          user_id: string
        }
        Update: {
          analysis_result?: Json | null
          audio_data?: string | null
          confidence_score?: number | null
          id?: string
          processed_at?: string | null
          proposed_words?: Json | null
          transcribed_text?: string | null
          user_id?: string
        }
        Relationships: []
      }
      security_audit_log: {
        Row: {
          event_type: string
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          timestamp: string | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          event_type: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          event_type?: string
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          timestamp?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      stripe_webhook_events: {
        Row: {
          event_id: string
          last_error: string | null
          processed_at: string | null
          received_at: string
          status: string
          type: string
        }
        Insert: {
          event_id: string
          last_error?: string | null
          processed_at?: string | null
          received_at?: string
          status?: string
          type: string
        }
        Update: {
          event_id?: string
          last_error?: string | null
          processed_at?: string | null
          received_at?: string
          status?: string
          type?: string
        }
        Relationships: []
      }
      strk_absences: {
        Row: {
          course_id: string | null
          created_at: string | null
          created_by: string | null
          date: string
          duration: number
          id: string
          institution_id: string
          justification: string | null
          justification_file: string | null
          justified: boolean | null
          reason: string | null
          student_id: string
          type: Database["public"]["Enums"]["strk_absence_type"]
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date: string
          duration: number
          id?: string
          institution_id: string
          justification?: string | null
          justification_file?: string | null
          justified?: boolean | null
          reason?: string | null
          student_id: string
          type: Database["public"]["Enums"]["strk_absence_type"]
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          duration?: number
          id?: string
          institution_id?: string
          justification?: string | null
          justification_file?: string | null
          justified?: boolean | null
          reason?: string | null
          student_id?: string
          type?: Database["public"]["Enums"]["strk_absence_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_absences_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "strk_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_absences_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_absences_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_absences_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "strk_students"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_activities: {
        Row: {
          created_at: string | null
          description: string
          id: string
          institution_id: string | null
          metadata: Json | null
          target_id: string | null
          target_type: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          institution_id?: string | null
          metadata?: Json | null
          target_id?: string | null
          target_type?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          institution_id?: string | null
          metadata?: Json | null
          target_id?: string | null
          target_type?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_activities_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_analytics: {
        Row: {
          date_key: string | null
          id: string
          institution_id: string | null
          metadata: Json | null
          metric_name: string
          metric_type: string
          recorded_at: string | null
          user_id: string | null
          value: number
        }
        Insert: {
          date_key?: string | null
          id?: string
          institution_id?: string | null
          metadata?: Json | null
          metric_name: string
          metric_type: string
          recorded_at?: string | null
          user_id?: string | null
          value: number
        }
        Update: {
          date_key?: string | null
          id?: string
          institution_id?: string | null
          metadata?: Json | null
          metric_name?: string
          metric_type?: string
          recorded_at?: string | null
          user_id?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "strk_analytics_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_assignments: {
        Row: {
          assignment_type: string
          attachments: Json | null
          course_id: string
          created_at: string
          description: string | null
          due_date: string
          id: string
          instructions: string | null
          max_grade: number | null
          status: string
          teacher_id: string
          title: string
          updated_at: string
        }
        Insert: {
          assignment_type?: string
          attachments?: Json | null
          course_id: string
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          instructions?: string | null
          max_grade?: number | null
          status?: string
          teacher_id: string
          title: string
          updated_at?: string
        }
        Update: {
          assignment_type?: string
          attachments?: Json | null
          course_id?: string
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          instructions?: string | null
          max_grade?: number | null
          status?: string
          teacher_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      strk_attendances: {
        Row: {
          arrival_time: string | null
          course_id: string
          created_at: string
          date: string
          departure_time: string | null
          id: string
          notes: string | null
          recorded_by: string | null
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          arrival_time?: string | null
          course_id: string
          created_at?: string
          date?: string
          departure_time?: string | null
          id?: string
          notes?: string | null
          recorded_by?: string | null
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          arrival_time?: string | null
          course_id?: string
          created_at?: string
          date?: string
          departure_time?: string | null
          id?: string
          notes?: string | null
          recorded_by?: string | null
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      strk_audit_logs: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          after_data: Json | null
          before_data: Json | null
          created_at: string
          details: Json
          entity: string
          entity_id: string | null
          id: string
          institution_id: string | null
          ip: unknown | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          details?: Json
          entity: string
          entity_id?: string | null
          id?: string
          institution_id?: string | null
          ip?: unknown | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          created_at?: string
          details?: Json
          entity?: string
          entity_id?: string | null
          id?: string
          institution_id?: string | null
          ip?: unknown | null
          user_agent?: string | null
        }
        Relationships: []
      }
      strk_class_subjects: {
        Row: {
          class_id: string
          created_at: string
          id: string
          subject_id: string
          teacher_id: string | null
        }
        Insert: {
          class_id: string
          created_at?: string
          id?: string
          subject_id: string
          teacher_id?: string | null
        }
        Update: {
          class_id?: string
          created_at?: string
          id?: string
          subject_id?: string
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_class_subjects_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "strk_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_class_subjects_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "strk_subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_class_subjects_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_classes: {
        Row: {
          academic_year: string | null
          created_at: string | null
          description: string | null
          id: string
          institution_id: string
          is_active: boolean | null
          max_students: number | null
          name: string
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          academic_year?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          institution_id: string
          is_active?: boolean | null
          max_students?: number | null
          name: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          academic_year?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          institution_id?: string
          is_active?: boolean | null
          max_students?: number | null
          name?: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_classes_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_course_materials: {
        Row: {
          content: string | null
          course_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          title: string
          type: string | null
        }
        Insert: {
          content?: string | null
          course_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          title: string
          type?: string | null
        }
        Update: {
          content?: string | null
          course_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_course_materials_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "strk_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_course_materials_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_course_students: {
        Row: {
          attendance_rate: number | null
          course_id: string
          enrollment_date: string | null
          grade: number | null
          id: string
          last_attendance: string | null
          progress: number | null
          student_id: string
        }
        Insert: {
          attendance_rate?: number | null
          course_id: string
          enrollment_date?: string | null
          grade?: number | null
          id?: string
          last_attendance?: string | null
          progress?: number | null
          student_id: string
        }
        Update: {
          attendance_rate?: number | null
          course_id?: string
          enrollment_date?: string | null
          grade?: number | null
          id?: string
          last_attendance?: string | null
          progress?: number | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "strk_course_students_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "strk_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_course_students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "strk_students"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_courses: {
        Row: {
          class_id: string | null
          created_at: string | null
          description: string | null
          duration: number | null
          id: string
          institution_id: string
          name: string
          room: string | null
          schedule_day: string | null
          schedule_time: string | null
          status: string | null
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          institution_id: string
          name: string
          room?: string | null
          schedule_day?: string | null
          schedule_time?: string | null
          status?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          institution_id?: string
          name?: string
          room?: string | null
          schedule_day?: string | null
          schedule_time?: string | null
          status?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_courses_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "strk_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_courses_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_courses_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "strk_teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_dashboard_stats: {
        Row: {
          calculated_at: string | null
          data: Json
          id: string
          institution_id: string | null
          period: string
          stat_type: string
          valid_until: string | null
        }
        Insert: {
          calculated_at?: string | null
          data: Json
          id?: string
          institution_id?: string | null
          period: string
          stat_type: string
          valid_until?: string | null
        }
        Update: {
          calculated_at?: string | null
          data?: Json
          id?: string
          institution_id?: string | null
          period?: string
          stat_type?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_dashboard_stats_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_exercise_assignments: {
        Row: {
          assigned_at: string
          assigned_by: string
          assigned_to_id: string | null
          assigned_to_type: string
          auto_grade: boolean | null
          created_at: string
          due_date: string | null
          exercise_id: string
          id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by: string
          assigned_to_id?: string | null
          assigned_to_type?: string
          auto_grade?: boolean | null
          created_at?: string
          due_date?: string | null
          exercise_id: string
          id?: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string
          assigned_to_id?: string | null
          assigned_to_type?: string
          auto_grade?: boolean | null
          created_at?: string
          due_date?: string | null
          exercise_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "strk_exercise_assignments_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "strk_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_exercise_attempts: {
        Row: {
          answers: Json | null
          attempt_number: number | null
          created_at: string
          exercise_id: string
          feedback: string | null
          id: string
          max_score: number | null
          score: number | null
          started_at: string
          status: string | null
          student_id: string
          submitted_at: string | null
          time_spent: number | null
          updated_at: string
        }
        Insert: {
          answers?: Json | null
          attempt_number?: number | null
          created_at?: string
          exercise_id: string
          feedback?: string | null
          id?: string
          max_score?: number | null
          score?: number | null
          started_at?: string
          status?: string | null
          student_id: string
          submitted_at?: string | null
          time_spent?: number | null
          updated_at?: string
        }
        Update: {
          answers?: Json | null
          attempt_number?: number | null
          created_at?: string
          exercise_id?: string
          feedback?: string | null
          id?: string
          max_score?: number | null
          score?: number | null
          started_at?: string
          status?: string | null
          student_id?: string
          submitted_at?: string | null
          time_spent?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "strk_exercise_attempts_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "strk_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_exercise_progress: {
        Row: {
          badges_earned: Json | null
          created_at: string
          current_question_id: string | null
          exercise_id: string
          id: string
          last_activity: string | null
          progress_percentage: number | null
          questions_answered: number | null
          streak_count: number | null
          student_id: string
          total_questions: number | null
          updated_at: string
        }
        Insert: {
          badges_earned?: Json | null
          created_at?: string
          current_question_id?: string | null
          exercise_id: string
          id?: string
          last_activity?: string | null
          progress_percentage?: number | null
          questions_answered?: number | null
          streak_count?: number | null
          student_id: string
          total_questions?: number | null
          updated_at?: string
        }
        Update: {
          badges_earned?: Json | null
          created_at?: string
          current_question_id?: string | null
          exercise_id?: string
          id?: string
          last_activity?: string | null
          progress_percentage?: number | null
          questions_answered?: number | null
          streak_count?: number | null
          student_id?: string
          total_questions?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "strk_exercise_progress_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "strk_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_exercise_questions: {
        Row: {
          correct_answer: Json | null
          created_at: string
          exercise_id: string
          explanation: string | null
          id: string
          options: Json | null
          points: number | null
          question_order: number | null
          question_text: string
          question_type: string
        }
        Insert: {
          correct_answer?: Json | null
          created_at?: string
          exercise_id: string
          explanation?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_order?: number | null
          question_text: string
          question_type?: string
        }
        Update: {
          correct_answer?: Json | null
          created_at?: string
          exercise_id?: string
          explanation?: string | null
          id?: string
          options?: Json | null
          points?: number | null
          question_order?: number | null
          question_text?: string
          question_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "strk_exercise_questions_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "strk_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_exercises: {
        Row: {
          class_id: string | null
          created_at: string
          description: string | null
          difficulty_level: number | null
          due_date: string | null
          exercise_type: string
          id: string
          institution_id: string
          is_published: boolean | null
          max_attempts: number | null
          points: number | null
          subject: string | null
          teacher_id: string
          time_limit: number | null
          title: string
          updated_at: string
        }
        Insert: {
          class_id?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: number | null
          due_date?: string | null
          exercise_type?: string
          id?: string
          institution_id: string
          is_published?: boolean | null
          max_attempts?: number | null
          points?: number | null
          subject?: string | null
          teacher_id: string
          time_limit?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          class_id?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: number | null
          due_date?: string | null
          exercise_type?: string
          id?: string
          institution_id?: string
          is_published?: boolean | null
          max_attempts?: number | null
          points?: number | null
          subject?: string | null
          teacher_id?: string
          time_limit?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      strk_grades: {
        Row: {
          course_id: string
          created_at: string
          date: string
          description: string | null
          grade_type: string
          grade_value: number
          id: string
          max_grade: number
          student_id: string
          teacher_id: string
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          date?: string
          description?: string | null
          grade_type?: string
          grade_value: number
          id?: string
          max_grade?: number
          student_id: string
          teacher_id: string
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          date?: string
          description?: string | null
          grade_type?: string
          grade_value?: number
          id?: string
          max_grade?: number
          student_id?: string
          teacher_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      strk_institutions: {
        Row: {
          address: string | null
          admin_id: string | null
          created_at: string | null
          email: string | null
          id: string
          logo: string | null
          name: string
          phone: string | null
          type: Database["public"]["Enums"]["strk_institution_type"]
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          admin_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          name: string
          phone?: string | null
          type: Database["public"]["Enums"]["strk_institution_type"]
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          admin_id?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          logo?: string | null
          name?: string
          phone?: string | null
          type?: Database["public"]["Enums"]["strk_institution_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_institutions_admin"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_messages: {
        Row: {
          attachments: Json | null
          content: string
          created_at: string
          id: string
          message_type: string
          parent_message_id: string | null
          priority: string
          read_at: string | null
          recipient_id: string | null
          replied_at: string | null
          sender_id: string
          subject: string
          updated_at: string
        }
        Insert: {
          attachments?: Json | null
          content: string
          created_at?: string
          id?: string
          message_type?: string
          parent_message_id?: string | null
          priority?: string
          read_at?: string | null
          recipient_id?: string | null
          replied_at?: string | null
          sender_id: string
          subject: string
          updated_at?: string
        }
        Update: {
          attachments?: Json | null
          content?: string
          created_at?: string
          id?: string
          message_type?: string
          parent_message_id?: string | null
          priority?: string
          read_at?: string | null
          recipient_id?: string | null
          replied_at?: string | null
          sender_id?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      strk_notification_settings: {
        Row: {
          attendance_alerts: boolean
          daily_digest: boolean
          email_notifications: boolean
          push_notifications: boolean
          signature_requests: boolean
          sms_notifications: boolean
          system_updates: boolean
          user_id: string
        }
        Insert: {
          attendance_alerts?: boolean
          daily_digest?: boolean
          email_notifications?: boolean
          push_notifications?: boolean
          signature_requests?: boolean
          sms_notifications?: boolean
          system_updates?: boolean
          user_id: string
        }
        Update: {
          attendance_alerts?: boolean
          daily_digest?: boolean
          email_notifications?: boolean
          push_notifications?: boolean
          signature_requests?: boolean
          sms_notifications?: boolean
          system_updates?: boolean
          user_id?: string
        }
        Relationships: []
      }
      strk_notifications: {
        Row: {
          action_url: string | null
          created_at: string
          expires_at: string | null
          id: string
          is_read: boolean
          message: string
          metadata: Json | null
          priority: string
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message: string
          metadata?: Json | null
          priority?: string
          title: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          is_read?: boolean
          message?: string
          metadata?: Json | null
          priority?: string
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      strk_profiles: {
        Row: {
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          institution_id: string | null
          last_name: string | null
          phone_number: string | null
          profile_image: string | null
          role: Database["public"]["Enums"]["strk_user_role"]
          status: Database["public"]["Enums"]["strk_profile_status"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          institution_id?: string | null
          last_name?: string | null
          phone_number?: string | null
          profile_image?: string | null
          role?: Database["public"]["Enums"]["strk_user_role"]
          status?: Database["public"]["Enums"]["strk_profile_status"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          institution_id?: string | null
          last_name?: string | null
          phone_number?: string | null
          profile_image?: string | null
          role?: Database["public"]["Enums"]["strk_user_role"]
          status?: Database["public"]["Enums"]["strk_profile_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_profiles_institution"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_reports: {
        Row: {
          created_at: string | null
          created_by: string
          data: Json | null
          file_url: string | null
          id: string
          institution_id: string | null
          parameters: Json | null
          report_type: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          data?: Json | null
          file_url?: string | null
          id?: string
          institution_id?: string | null
          parameters?: Json | null
          report_type: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          data?: Json | null
          file_url?: string | null
          id?: string
          institution_id?: string | null
          parameters?: Json | null
          report_type?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_reports_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_schedules: {
        Row: {
          class_id: string | null
          course_id: string
          created_at: string | null
          day_of_week: number
          end_date: string | null
          end_time: string
          id: string
          institution_id: string
          is_active: boolean | null
          recurring_weeks: number | null
          room: string | null
          start_date: string | null
          start_time: string
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          class_id?: string | null
          course_id: string
          created_at?: string | null
          day_of_week: number
          end_date?: string | null
          end_time: string
          id?: string
          institution_id: string
          is_active?: boolean | null
          recurring_weeks?: number | null
          room?: string | null
          start_date?: string | null
          start_time: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          class_id?: string | null
          course_id?: string
          created_at?: string | null
          day_of_week?: number
          end_date?: string | null
          end_time?: string
          id?: string
          institution_id?: string
          is_active?: boolean | null
          recurring_weeks?: number | null
          room?: string | null
          start_date?: string | null
          start_time?: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_schedules_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "strk_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_schedules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "strk_courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_schedules_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_schedules_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_settings: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          key: string
          updated_at: string | null
          value: Json
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key: string
          updated_at?: string | null
          value: Json
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          key?: string
          updated_at?: string | null
          value?: Json
        }
        Relationships: []
      }
      strk_signature_evidence: {
        Row: {
          created_at: string
          document_hash: string
          id: string
          metadata: Json
          raw_signature_data: string | null
          signature_id: string
          signer_email: string | null
          signer_ip: unknown | null
          signer_user_agent: string | null
          signer_user_id: string | null
        }
        Insert: {
          created_at?: string
          document_hash: string
          id?: string
          metadata?: Json
          raw_signature_data?: string | null
          signature_id: string
          signer_email?: string | null
          signer_ip?: unknown | null
          signer_user_agent?: string | null
          signer_user_id?: string | null
        }
        Update: {
          created_at?: string
          document_hash?: string
          id?: string
          metadata?: Json
          raw_signature_data?: string | null
          signature_id?: string
          signer_email?: string | null
          signer_ip?: unknown | null
          signer_user_agent?: string | null
          signer_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_signature_evidence_signature_id_fkey"
            columns: ["signature_id"]
            isOneToOne: false
            referencedRelation: "strk_signatures"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_signature_links: {
        Row: {
          attempt_count: number
          created_at: string
          created_by: string
          expires_at: string
          id: string
          last_ip: unknown | null
          last_user_agent: string | null
          max_attempts: number
          signature_id: string
          status: Database["public"]["Enums"]["signature_link_status"]
          token: string | null
          token_hash: string | null
          used_at: string | null
        }
        Insert: {
          attempt_count?: number
          created_at?: string
          created_by: string
          expires_at: string
          id?: string
          last_ip?: unknown | null
          last_user_agent?: string | null
          max_attempts?: number
          signature_id: string
          status?: Database["public"]["Enums"]["signature_link_status"]
          token?: string | null
          token_hash?: string | null
          used_at?: string | null
        }
        Update: {
          attempt_count?: number
          created_at?: string
          created_by?: string
          expires_at?: string
          id?: string
          last_ip?: unknown | null
          last_user_agent?: string | null
          max_attempts?: number
          signature_id?: string
          status?: Database["public"]["Enums"]["signature_link_status"]
          token?: string | null
          token_hash?: string | null
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_signature_links_signature_id_fkey"
            columns: ["signature_id"]
            isOneToOne: false
            referencedRelation: "strk_signatures"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_signatures: {
        Row: {
          completed_at: string | null
          created_at: string | null
          date: string
          document_hash: string | null
          expires_at: string | null
          id: string
          institution_id: string
          recipient_id: string | null
          sender_id: string | null
          signature_data: string | null
          status: Database["public"]["Enums"]["strk_signature_status"]
          student_id: string
          timestamp: string | null
          title: string
          type: Database["public"]["Enums"]["strk_signature_type"]
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          date: string
          document_hash?: string | null
          expires_at?: string | null
          id?: string
          institution_id: string
          recipient_id?: string | null
          sender_id?: string | null
          signature_data?: string | null
          status?: Database["public"]["Enums"]["strk_signature_status"]
          student_id: string
          timestamp?: string | null
          title: string
          type: Database["public"]["Enums"]["strk_signature_type"]
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          date?: string
          document_hash?: string | null
          expires_at?: string | null
          id?: string
          institution_id?: string
          recipient_id?: string | null
          sender_id?: string | null
          signature_data?: string | null
          status?: Database["public"]["Enums"]["strk_signature_status"]
          student_id?: string
          timestamp?: string | null
          title?: string
          type?: Database["public"]["Enums"]["strk_signature_type"]
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_signatures_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_signatures_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_signatures_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_signatures_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "strk_students"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_student_classes: {
        Row: {
          class_id: string
          created_at: string
          enrolled_at: string
          enrollment_date: string
          id: string
          is_active: boolean
          student_id: string
          updated_at: string
        }
        Insert: {
          class_id: string
          created_at?: string
          enrolled_at?: string
          enrollment_date?: string
          id?: string
          is_active?: boolean
          student_id: string
          updated_at?: string
        }
        Update: {
          class_id?: string
          created_at?: string
          enrolled_at?: string
          enrollment_date?: string
          id?: string
          is_active?: boolean
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "strk_student_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "strk_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_student_classes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_students: {
        Row: {
          attendance_rate: number | null
          class_id: string | null
          created_at: string | null
          enrollment_date: string | null
          id: string
          institution_id: string
          student_number: string | null
          updated_at: string | null
        }
        Insert: {
          attendance_rate?: number | null
          class_id?: string | null
          created_at?: string | null
          enrollment_date?: string | null
          id: string
          institution_id: string
          student_number?: string | null
          updated_at?: string | null
        }
        Update: {
          attendance_rate?: number | null
          class_id?: string | null
          created_at?: string | null
          enrollment_date?: string | null
          id?: string
          institution_id?: string
          student_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_students_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "strk_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_students_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_students_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_subjects: {
        Row: {
          code: string | null
          created_at: string
          description: string | null
          id: string
          institution_id: string | null
          name: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          institution_id?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          institution_id?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "strk_subjects_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      strk_submissions: {
        Row: {
          assignment_id: string
          attachments: Json | null
          content: string | null
          created_at: string
          feedback: string | null
          grade: number | null
          id: string
          status: string
          student_id: string
          submitted_at: string | null
          updated_at: string
        }
        Insert: {
          assignment_id: string
          attachments?: Json | null
          content?: string | null
          created_at?: string
          feedback?: string | null
          grade?: number | null
          id?: string
          status?: string
          student_id: string
          submitted_at?: string | null
          updated_at?: string
        }
        Update: {
          assignment_id?: string
          attachments?: Json | null
          content?: string | null
          created_at?: string
          feedback?: string | null
          grade?: number | null
          id?: string
          status?: string
          student_id?: string
          submitted_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      strk_teachers: {
        Row: {
          created_at: string | null
          employee_number: string | null
          hire_date: string | null
          id: string
          institution_id: string
          subjects: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          employee_number?: string | null
          hire_date?: string | null
          id: string
          institution_id: string
          subjects?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          employee_number?: string | null
          hire_date?: string | null
          id?: string
          institution_id?: string
          subjects?: string[] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_teachers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_teachers_institution_id_fkey"
            columns: ["institution_id"]
            isOneToOne: false
            referencedRelation: "strk_institutions"
            referencedColumns: ["id"]
          },
        ]
      }
      students_classes: {
        Row: {
          class_id: string | null
          created_at: string | null
          id: string
          student_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          id?: string
          student_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_notifications: {
        Row: {
          created_at: string | null
          days_before_expiration: number | null
          email_sent: boolean | null
          id: string
          in_app_read: boolean | null
          notification_type: string
          sent_at: string | null
          subscription_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          days_before_expiration?: number | null
          email_sent?: boolean | null
          id?: string
          in_app_read?: boolean | null
          notification_type: string
          sent_at?: string | null
          subscription_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          days_before_expiration?: number | null
          email_sent?: boolean | null
          id?: string
          in_app_read?: boolean | null
          notification_type?: string
          sent_at?: string | null
          subscription_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_notifications_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "premium_subscriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          billing_cycle: string | null
          created_at: string | null
          features: Json
          id: string
          is_active: boolean | null
          is_trial: boolean | null
          max_institutions: number | null
          max_monthly_reports: number | null
          max_students: number | null
          name: string
          price_monthly: number
          price_yearly: number | null
          sort_order: number | null
          storage_limit_gb: number | null
          stripe_price_id: string | null
          stripe_yearly_price_id: string | null
          updated_at: string | null
        }
        Insert: {
          billing_cycle?: string | null
          created_at?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          is_trial?: boolean | null
          max_institutions?: number | null
          max_monthly_reports?: number | null
          max_students?: number | null
          name: string
          price_monthly: number
          price_yearly?: number | null
          sort_order?: number | null
          storage_limit_gb?: number | null
          stripe_price_id?: string | null
          stripe_yearly_price_id?: string | null
          updated_at?: string | null
        }
        Update: {
          billing_cycle?: string | null
          created_at?: string | null
          features?: Json
          id?: string
          is_active?: boolean | null
          is_trial?: boolean | null
          max_institutions?: number | null
          max_monthly_reports?: number | null
          max_students?: number | null
          name?: string
          price_monthly?: number
          price_yearly?: number | null
          sort_order?: number | null
          storage_limit_gb?: number | null
          stripe_price_id?: string | null
          stripe_yearly_price_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          end_date: string
          id: string
          plan: string
          start_date: string
          user_id: string | null
        }
        Insert: {
          end_date: string
          id?: string
          plan: string
          start_date: string
          user_id?: string | null
        }
        Update: {
          end_date?: string
          id?: string
          plan?: string
          start_date?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          avatar: string | null
          content: string
          id: string
          name: string
          position: number
          role: string
        }
        Insert: {
          avatar?: string | null
          content: string
          id?: string
          name: string
          position?: number
          role: string
        }
        Update: {
          avatar?: string | null
          content?: string
          id?: string
          name?: string
          position?: number
          role?: string
        }
        Relationships: []
      }
      tournament_participants: {
        Row: {
          eliminated_at: string | null
          final_position: number | null
          id: string
          registration_date: string
          tournament_id: string
          user_id: string
        }
        Insert: {
          eliminated_at?: string | null
          final_position?: number | null
          id?: string
          registration_date?: string
          tournament_id: string
          user_id: string
        }
        Update: {
          eliminated_at?: string | null
          final_position?: number | null
          id?: string
          registration_date?: string
          tournament_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_participants_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          end_date: string | null
          entry_fee: number | null
          id: string
          max_participants: number
          name: string
          prize_pool: number | null
          start_date: string
          status: string
          tournament_type: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          end_date?: string | null
          entry_fee?: number | null
          id?: string
          max_participants?: number
          name: string
          prize_pool?: number | null
          start_date: string
          status?: string
          tournament_type?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string | null
          entry_fee?: number | null
          id?: string
          max_participants?: number
          name?: string
          prize_pool?: number | null
          start_date?: string
          status?: string
          tournament_type?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          id: string
          method: string
          order_id: string | null
          paid_at: string | null
          status: string
        }
        Insert: {
          amount: number
          id?: string
          method: string
          order_id?: string | null
          paid_at?: string | null
          status: string
        }
        Update: {
          amount?: number
          id?: string
          method?: string
          order_id?: string | null
          paid_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorite_words: {
        Row: {
          added_at: string
          definition: string | null
          id: string
          user_id: string
          word: string
        }
        Insert: {
          added_at?: string
          definition?: string | null
          id?: string
          user_id: string
          word: string
        }
        Update: {
          added_at?: string
          definition?: string | null
          id?: string
          user_id?: string
          word?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          animations_enabled: boolean
          auto_sort_tiles: boolean
          board_size: string
          confirm_moves: boolean
          created_at: string
          font_size: string
          id: string
          language: string
          sound_enabled: boolean
          theme: string
          tile_size: string
          updated_at: string
          user_id: string
        }
        Insert: {
          animations_enabled?: boolean
          auto_sort_tiles?: boolean
          board_size?: string
          confirm_moves?: boolean
          created_at?: string
          font_size?: string
          id?: string
          language?: string
          sound_enabled?: boolean
          theme?: string
          tile_size?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          animations_enabled?: boolean
          auto_sort_tiles?: boolean
          board_size?: string
          confirm_moves?: boolean
          created_at?: string
          font_size?: string
          id?: string
          language?: string
          sound_enabled?: boolean
          theme?: string
          tile_size?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_presence: {
        Row: {
          last_seen: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          last_seen?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          last_seen?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          board_theme: string | null
          created_at: string | null
          display_name: string | null
          experience_points: number | null
          game_preferences: Json | null
          id: string
          level: number | null
          notification_preferences: Json | null
          preferred_language: string | null
          privacy_settings: Json | null
          theme_preference: string | null
          total_points: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          board_theme?: string | null
          created_at?: string | null
          display_name?: string | null
          experience_points?: number | null
          game_preferences?: Json | null
          id?: string
          level?: number | null
          notification_preferences?: Json | null
          preferred_language?: string | null
          privacy_settings?: Json | null
          theme_preference?: string | null
          total_points?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          board_theme?: string | null
          created_at?: string | null
          display_name?: string | null
          experience_points?: number | null
          game_preferences?: Json | null
          id?: string
          level?: number | null
          notification_preferences?: Json | null
          preferred_language?: string | null
          privacy_settings?: Json | null
          theme_preference?: string | null
          total_points?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          created_at: string
          device: string | null
          id: string
          ip: unknown | null
          is_current: boolean | null
          last_seen_at: string
          revoked_at: string | null
          revoked_reason: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          device?: string | null
          id?: string
          ip?: unknown | null
          is_current?: boolean | null
          last_seen_at?: string
          revoked_at?: string | null
          revoked_reason?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          device?: string | null
          id?: string
          ip?: unknown | null
          is_current?: boolean | null
          last_seen_at?: string
          revoked_at?: string | null
          revoked_reason?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          created_at: string
          id: string
          settings: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          settings?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          settings?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          plan: string
          starts_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          plan?: string
          starts_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          plan?: string
          starts_at?: string
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password: string
          phone_number: string | null
          roles: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password: string
          phone_number?: string | null
          roles: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password?: string
          phone_number?: string | null
          roles?: string
        }
        Relationships: []
      }
      word_plays: {
        Row: {
          game_id: string
          id: string
          played_at: string
          player_id: string
          position: Json
          score: number
          tiles_used: Json
          word: string
        }
        Insert: {
          game_id: string
          id?: string
          played_at?: string
          player_id: string
          position: Json
          score: number
          tiles_used: Json
          word: string
        }
        Update: {
          game_id?: string
          id?: string
          played_at?: string
          player_id?: string
          position?: Json
          score?: number
          tiles_used?: Json
          word?: string
        }
        Relationships: [
          {
            foreignKeyName: "word_plays_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      strk_class_students: {
        Row: {
          class_id: string | null
          created_at: string | null
          enrollment_date: string | null
          id: string | null
          is_active: boolean | null
          student_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          enrollment_date?: string | null
          id?: string | null
          is_active?: boolean | null
          student_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          enrollment_date?: string | null
          id?: string | null
          is_active?: boolean | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strk_student_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "strk_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "strk_student_classes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "strk_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      _period_bounds: {
        Args: { p_kind: string }
        Returns: {
          end_at: string
          start_at: string
        }[]
      }
      _strk_get_class_institution: {
        Args: { p_class: string }
        Returns: string
      }
      adjust_leave_balance_for_leave: {
        Args: { p_leave_id: string; p_sign: number; p_use_new: boolean }
        Returns: undefined
      }
      adjust_leave_balance_for_period: {
        Args: {
          p_end: string
          p_sign: number
          p_staff: string
          p_start: string
          p_type: string
        }
        Returns: undefined
      }
      calculate_average_score: {
        Args: { p_user_id: string }
        Returns: number
      }
      check_expiring_items: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      check_visit_slot_availability: {
        Args: {
          p_exclude_visit_id?: string
          p_visit_date: string
          p_visit_slot_id: string
          p_visitor_count: number
        }
        Returns: boolean
      }
      cleanup_expired_notifications: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_ai_game: {
        Args: { p_difficulty: string; p_user_id: string }
        Returns: string
      }
      create_dietary_restriction: {
        Args: {
          p_end_date: string
          p_medical_notes: string
          p_prescribed_by: string
          p_resident_id: string
          p_restriction_type: string
          p_severity: string
          p_start_date: string
        }
        Returns: string
      }
      create_game_notification: {
        Args: {
          p_game_id?: string
          p_message: string
          p_title: string
          p_type: string
          p_user_id: string
        }
        Returns: string
      }
      create_notification: {
        Args: {
          p_data?: Json
          p_message: string
          p_priority?: string
          p_title: string
          p_type?: string
          p_user_id: string
        }
        Returns: string
      }
      current_org_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      current_staff_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      debug_auth_state: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      generate_invoice_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_active_message_recipients: {
        Args: Record<PropertyKey, never> | { include_self?: boolean }
        Returns: {
          email: string
          first_name: string
          id: string
          last_name: string
        }[]
      }
      get_active_plan_id: {
        Args: { p_user_id: string }
        Returns: string
      }
      get_current_strk_institution_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_strk_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role_pz: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_expiring_certifications: {
        Args: { days_ahead?: number }
        Returns: {
          days_until_expiry: number
          expiry_date: string
          program_name: string
          staff_name: string
        }[]
      }
      get_my_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["staff_role"]
      }
      get_profile_by_id: {
        Args: { user_id: string }
        Returns: {
          first_name: string | null
          id: string
          institution_id: string | null
          last_name: string | null
          phone_number: string | null
          role: string
        }
      }
      get_unread_message_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_user_by_email: {
        Args: { user_email: string }
        Returns: {
          email: string
          id: string
        }[]
      }
      increment_plan_usage: {
        Args: { p_amount?: number; p_feature: string; p_user_id: string }
        Returns: boolean
      }
      is_user_premium: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      log_audit_event: {
        Args: {
          p_action: string
          p_description?: string
          p_details?: Json
          p_event_type: string
          p_target_id: string
          p_target_table: string
        }
        Returns: string
      }
      log_security_event: {
        Args: {
          p_event_type: string
          p_new_values?: Json
          p_old_values?: Json
          p_record_id?: string
          p_table_name?: string
        }
        Returns: undefined
      }
      mark_all_notifications_read: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      reassign_residents_and_apply_room_action: {
        Args: {
          p_assignments: Json
          p_final_action?: string
          p_source_room: string
        }
        Returns: Json
      }
      record_rate_limit_hit: {
        Args: {
          p_key: string
          p_max: number
          p_route: string
          p_window_sec: number
        }
        Returns: boolean
      }
      self_upgrade_to_teacher: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      strk_can_manage_students: {
        Args: { target_institution: string }
        Returns: boolean
      }
      strk_log_audit: {
        Args: {
          p_action: string
          p_details?: Json
          p_entity: string
          p_entity_id: string
          p_institution: string
        }
        Returns: undefined
      }
      update_elo_ratings: {
        Args: { is_draw?: boolean; loser_id: string; winner_id: string }
        Returns: undefined
      }
      update_order_status: {
        Args: { new_status: string; notes?: string; order_id: string }
        Returns: boolean
      }
      update_room_occupancy: {
        Args: { p_room_number: string }
        Returns: undefined
      }
      update_user_profile: {
        Args: { profile_data: Json; user_id: string }
        Returns: undefined
      }
      update_user_role: {
        Args: { p_new_role: string; p_target_user_id: string }
        Returns: boolean
      }
      upsert_leave_balance: {
        Args: { p_staff: string; p_type: string; p_year: number }
        Returns: undefined
      }
      user_can_access_leave: {
        Args: { p_leave_id: string }
        Returns: boolean
      }
      user_has_permission: {
        Args: { permission_name: string }
        Returns: boolean
      }
      user_is_member_of_club: {
        Args: { p_club_id: string }
        Returns: boolean
      }
      validate_role_change: {
        Args: { new_role: string; target_user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      contact_status: "new" | "processing" | "handled" | "spam"
      contract_type: "CDI" | "CDD" | "Interim" | "Stagiaire" | "Vacations"
      deletion_status:
        | "pending"
        | "approved"
        | "rejected"
        | "processed"
        | "canceled"
      movement_type: "entree" | "sortie" | "ajustement" | "peremption"
      pz_org_role: "admin" | "rh" | "soignant" | "viewer"
      signature_link_status: "active" | "used" | "expired" | "revoked"
      staff_role: "admin" | "infirmier" | "aide-soignant"
      stock_category: "medicament" | "equipement" | "consommable" | "autre"
      strk_absence_type: "absence" | "lateness"
      strk_institution_type:
        | "school"
        | "high_school"
        | "middle_school"
        | "university"
        | "training_center"
        | "elementary_school"
        | "private_school"
      strk_profile_status: "active" | "inactive" | "suspended"
      strk_signature_status: "pending" | "completed" | "expired"
      strk_signature_type: "entry" | "exit" | "document"
      strk_user_role: "admin" | "school_admin" | "teacher" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      contact_status: ["new", "processing", "handled", "spam"],
      contract_type: ["CDI", "CDD", "Interim", "Stagiaire", "Vacations"],
      deletion_status: [
        "pending",
        "approved",
        "rejected",
        "processed",
        "canceled",
      ],
      movement_type: ["entree", "sortie", "ajustement", "peremption"],
      pz_org_role: ["admin", "rh", "soignant", "viewer"],
      signature_link_status: ["active", "used", "expired", "revoked"],
      staff_role: ["admin", "infirmier", "aide-soignant"],
      stock_category: ["medicament", "equipement", "consommable", "autre"],
      strk_absence_type: ["absence", "lateness"],
      strk_institution_type: [
        "school",
        "high_school",
        "middle_school",
        "university",
        "training_center",
        "elementary_school",
        "private_school",
      ],
      strk_profile_status: ["active", "inactive", "suspended"],
      strk_signature_status: ["pending", "completed", "expired"],
      strk_signature_type: ["entry", "exit", "document"],
      strk_user_role: ["admin", "school_admin", "teacher", "student"],
    },
  },
} as const
