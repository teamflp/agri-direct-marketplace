export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
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
          payment_method: string | null
          payment_status: string | null
          status: string
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
          payment_method?: string | null
          payment_status?: string | null
          status: string
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
          payment_method?: string | null
          payment_status?: string | null
          status?: string
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
          is_organic: boolean | null
          is_seasonal: boolean | null
          name: string
          price: number
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
          is_organic?: boolean | null
          is_seasonal?: boolean | null
          name: string
          price: number
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
          is_organic?: boolean | null
          is_seasonal?: boolean | null
          name?: string
          price?: number
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
      strk_class_students: {
        Row: {
          class_id: string
          created_at: string
          enrollment_date: string
          id: string
          is_active: boolean
          student_id: string
        }
        Insert: {
          class_id: string
          created_at?: string
          enrollment_date?: string
          id?: string
          is_active?: boolean
          student_id: string
        }
        Update: {
          class_id?: string
          created_at?: string
          enrollment_date?: string
          id?: string
          is_active?: boolean
          student_id?: string
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
      strk_signatures: {
        Row: {
          completed_at: string | null
          created_at: string | null
          date: string
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
          enrolled_at: string
          id: string
          student_id: string
        }
        Insert: {
          class_id: string
          enrolled_at?: string
          id?: string
          student_id: string
        }
        Update: {
          class_id?: string
          enrolled_at?: string
          id?: string
          student_id?: string
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
      [_ in never]: never
    }
    Functions: {
      calculate_average_score: {
        Args: { p_user_id: string }
        Returns: number
      }
      cleanup_expired_notifications: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_ai_game: {
        Args: { p_user_id: string; p_difficulty: string }
        Returns: string
      }
      create_game_notification: {
        Args: {
          p_user_id: string
          p_type: string
          p_title: string
          p_message: string
          p_game_id?: string
        }
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["strk_user_role"]
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
      get_user_by_email: {
        Args: { user_email: string }
        Returns: {
          id: string
          email: string
        }[]
      }
      is_user_premium: {
        Args: { user_uuid: string }
        Returns: boolean
      }
      update_elo_ratings: {
        Args: { winner_id: string; loser_id: string; is_draw?: boolean }
        Returns: undefined
      }
      update_user_profile: {
        Args: { user_id: string; profile_data: Json }
        Returns: undefined
      }
    }
    Enums: {
      strk_absence_type: "absence" | "lateness"
      strk_institution_type:
        | "school"
        | "high_school"
        | "middle_school"
        | "university"
        | "training_center"
        | "elementary_school"
        | "private_school"
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
      strk_signature_status: ["pending", "completed", "expired"],
      strk_signature_type: ["entry", "exit", "document"],
      strk_user_role: ["admin", "school_admin", "teacher", "student"],
    },
  },
} as const
