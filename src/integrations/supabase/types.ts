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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      categorias: {
        Row: {
          ativa: boolean | null
          cor: string
          created_at: string
          descricao: string | null
          icone: string
          id: string
          nome: string
          tipo: string
          updated_at: string
          user_id: string
        }
        Insert: {
          ativa?: boolean | null
          cor?: string
          created_at?: string
          descricao?: string | null
          icone?: string
          id?: string
          nome: string
          tipo: string
          updated_at?: string
          user_id: string
        }
        Update: {
          ativa?: boolean | null
          cor?: string
          created_at?: string
          descricao?: string | null
          icone?: string
          id?: string
          nome?: string
          tipo?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      categorias_mercado: {
        Row: {
          cor: string
          created_at: string
          descricao: string | null
          icone: string
          id: string
          nome: string
          user_id: string
        }
        Insert: {
          cor?: string
          created_at?: string
          descricao?: string | null
          icone?: string
          id?: string
          nome: string
          user_id: string
        }
        Update: {
          cor?: string
          created_at?: string
          descricao?: string | null
          icone?: string
          id?: string
          nome?: string
          user_id?: string
        }
        Relationships: []
      }
      categorias_metas: {
        Row: {
          cor: string
          created_at: string
          descricao: string | null
          icone: string
          id: string
          nome: string
          user_id: string
        }
        Insert: {
          cor?: string
          created_at?: string
          descricao?: string | null
          icone?: string
          id?: string
          nome: string
          user_id: string
        }
        Update: {
          cor?: string
          created_at?: string
          descricao?: string | null
          icone?: string
          id?: string
          nome?: string
          user_id?: string
        }
        Relationships: []
      }
      despesas: {
        Row: {
          anexo_url: string | null
          categoria_id: string | null
          created_at: string
          data_pagamento: string
          descricao: string
          frequencia_recorrencia: string | null
          id: string
          metodo_pagamento: string | null
          observacoes: string | null
          recorrente: boolean | null
          updated_at: string
          user_id: string
          valor: number
        }
        Insert: {
          anexo_url?: string | null
          categoria_id?: string | null
          created_at?: string
          data_pagamento: string
          descricao: string
          frequencia_recorrencia?: string | null
          id?: string
          metodo_pagamento?: string | null
          observacoes?: string | null
          recorrente?: boolean | null
          updated_at?: string
          user_id: string
          valor: number
        }
        Update: {
          anexo_url?: string | null
          categoria_id?: string | null
          created_at?: string
          data_pagamento?: string
          descricao?: string
          frequencia_recorrencia?: string | null
          id?: string
          metodo_pagamento?: string | null
          observacoes?: string | null
          recorrente?: boolean | null
          updated_at?: string
          user_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "despesas_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      dividas: {
        Row: {
          categoria_id: string | null
          created_at: string
          credor: string
          data_vencimento: string
          descricao: string
          id: string
          observacoes: string | null
          parcelas: number | null
          parcelas_pagas: number | null
          status: Database["public"]["Enums"]["status_divida"] | null
          taxa_juros: number | null
          updated_at: string
          user_id: string
          valor_pago: number | null
          valor_restante: number | null
          valor_total: number
        }
        Insert: {
          categoria_id?: string | null
          created_at?: string
          credor: string
          data_vencimento: string
          descricao: string
          id?: string
          observacoes?: string | null
          parcelas?: number | null
          parcelas_pagas?: number | null
          status?: Database["public"]["Enums"]["status_divida"] | null
          taxa_juros?: number | null
          updated_at?: string
          user_id: string
          valor_pago?: number | null
          valor_restante?: number | null
          valor_total: number
        }
        Update: {
          categoria_id?: string | null
          created_at?: string
          credor?: string
          data_vencimento?: string
          descricao?: string
          id?: string
          observacoes?: string | null
          parcelas?: number | null
          parcelas_pagas?: number | null
          status?: Database["public"]["Enums"]["status_divida"] | null
          taxa_juros?: number | null
          updated_at?: string
          user_id?: string
          valor_pago?: number | null
          valor_restante?: number | null
          valor_total?: number
        }
        Relationships: [
          {
            foreignKeyName: "dividas_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      ia_analises: {
        Row: {
          data_analise: string
          descricao: string
          id: string
          insights: Json | null
          periodo_fim: string | null
          periodo_inicio: string | null
          pontuacao_financeira: number | null
          sugestoes: Json | null
          tipo_analise: string
          titulo: string
          user_id: string
        }
        Insert: {
          data_analise?: string
          descricao: string
          id?: string
          insights?: Json | null
          periodo_fim?: string | null
          periodo_inicio?: string | null
          pontuacao_financeira?: number | null
          sugestoes?: Json | null
          tipo_analise: string
          titulo: string
          user_id: string
        }
        Update: {
          data_analise?: string
          descricao?: string
          id?: string
          insights?: Json | null
          periodo_fim?: string | null
          periodo_inicio?: string | null
          pontuacao_financeira?: number | null
          sugestoes?: Json | null
          tipo_analise?: string
          titulo?: string
          user_id?: string
        }
        Relationships: []
      }
      ia_configuracoes: {
        Row: {
          analise_automatica: boolean | null
          api_key_externa: string | null
          categorias_priorizadas: string[] | null
          configuracoes_personalizadas: Json | null
          created_at: string
          frequencia_analise: string | null
          id: string
          limite_alerta_gastos: number | null
          notificacoes_metas: boolean | null
          sugestoes_economia: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          analise_automatica?: boolean | null
          api_key_externa?: string | null
          categorias_priorizadas?: string[] | null
          configuracoes_personalizadas?: Json | null
          created_at?: string
          frequencia_analise?: string | null
          id?: string
          limite_alerta_gastos?: number | null
          notificacoes_metas?: boolean | null
          sugestoes_economia?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          analise_automatica?: boolean | null
          api_key_externa?: string | null
          categorias_priorizadas?: string[] | null
          configuracoes_personalizadas?: Json | null
          created_at?: string
          frequencia_analise?: string | null
          id?: string
          limite_alerta_gastos?: number | null
          notificacoes_metas?: boolean | null
          sugestoes_economia?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      itens_mercado: {
        Row: {
          categoria_id: string | null
          comprado: boolean | null
          created_at: string
          id: string
          nome: string
          observacoes: string | null
          orcamento_id: string | null
          preco_total: number | null
          preco_unitario: number | null
          quantidade: number | null
          unidade: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          categoria_id?: string | null
          comprado?: boolean | null
          created_at?: string
          id?: string
          nome: string
          observacoes?: string | null
          orcamento_id?: string | null
          preco_total?: number | null
          preco_unitario?: number | null
          quantidade?: number | null
          unidade?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          categoria_id?: string | null
          comprado?: boolean | null
          created_at?: string
          id?: string
          nome?: string
          observacoes?: string | null
          orcamento_id?: string | null
          preco_total?: number | null
          preco_unitario?: number | null
          quantidade?: number | null
          unidade?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "itens_mercado_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_mercado"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itens_mercado_orcamento_id_fkey"
            columns: ["orcamento_id"]
            isOneToOne: false
            referencedRelation: "orcamentos_mercado"
            referencedColumns: ["id"]
          },
        ]
      }
      manutencoes_pendentes: {
        Row: {
          created_at: string
          custo_estimado: number | null
          data_prevista: string | null
          descricao: string
          id: string
          observacoes: string | null
          quilometragem_prevista: number | null
          status: Database["public"]["Enums"]["status_manutencao"] | null
          tipo_manutencao_id: string
          updated_at: string
          user_id: string
          veiculo_id: string
        }
        Insert: {
          created_at?: string
          custo_estimado?: number | null
          data_prevista?: string | null
          descricao: string
          id?: string
          observacoes?: string | null
          quilometragem_prevista?: number | null
          status?: Database["public"]["Enums"]["status_manutencao"] | null
          tipo_manutencao_id: string
          updated_at?: string
          user_id: string
          veiculo_id: string
        }
        Update: {
          created_at?: string
          custo_estimado?: number | null
          data_prevista?: string | null
          descricao?: string
          id?: string
          observacoes?: string | null
          quilometragem_prevista?: number | null
          status?: Database["public"]["Enums"]["status_manutencao"] | null
          tipo_manutencao_id?: string
          updated_at?: string
          user_id?: string
          veiculo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "manutencoes_pendentes_tipo_manutencao_id_fkey"
            columns: ["tipo_manutencao_id"]
            isOneToOne: false
            referencedRelation: "tipos_manutencao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manutencoes_pendentes_veiculo_id_fkey"
            columns: ["veiculo_id"]
            isOneToOne: false
            referencedRelation: "veiculos"
            referencedColumns: ["id"]
          },
        ]
      }
      metas: {
        Row: {
          categoria_id: string | null
          created_at: string
          data_fim: string
          data_inicio: string
          descricao: string | null
          id: string
          observacoes: string | null
          prioridade: number | null
          status: Database["public"]["Enums"]["status_meta"] | null
          titulo: string
          updated_at: string
          user_id: string
          valor_atual: number | null
          valor_objetivo: number
        }
        Insert: {
          categoria_id?: string | null
          created_at?: string
          data_fim: string
          data_inicio?: string
          descricao?: string | null
          id?: string
          observacoes?: string | null
          prioridade?: number | null
          status?: Database["public"]["Enums"]["status_meta"] | null
          titulo: string
          updated_at?: string
          user_id: string
          valor_atual?: number | null
          valor_objetivo: number
        }
        Update: {
          categoria_id?: string | null
          created_at?: string
          data_fim?: string
          data_inicio?: string
          descricao?: string | null
          id?: string
          observacoes?: string | null
          prioridade?: number | null
          status?: Database["public"]["Enums"]["status_meta"] | null
          titulo?: string
          updated_at?: string
          user_id?: string
          valor_atual?: number | null
          valor_objetivo?: number
        }
        Relationships: [
          {
            foreignKeyName: "metas_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_metas"
            referencedColumns: ["id"]
          },
        ]
      }
      orcamentos_mercado: {
        Row: {
          created_at: string
          data_compra: string | null
          data_criacao: string
          finalizado: boolean | null
          id: string
          nome: string
          observacoes: string | null
          orcamento_total: number
          updated_at: string
          user_id: string
          valor_gasto: number | null
        }
        Insert: {
          created_at?: string
          data_compra?: string | null
          data_criacao?: string
          finalizado?: boolean | null
          id?: string
          nome: string
          observacoes?: string | null
          orcamento_total: number
          updated_at?: string
          user_id: string
          valor_gasto?: number | null
        }
        Update: {
          created_at?: string
          data_compra?: string | null
          data_criacao?: string
          finalizado?: boolean | null
          id?: string
          nome?: string
          observacoes?: string | null
          orcamento_total?: number
          updated_at?: string
          user_id?: string
          valor_gasto?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          data_nascimento: string | null
          email: string | null
          id: string
          meta_economia_mensal: number | null
          moeda_padrao: string | null
          nome: string | null
          notificacoes_ativas: boolean | null
          profissao: string | null
          renda_mensal: number | null
          telefone: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          data_nascimento?: string | null
          email?: string | null
          id: string
          meta_economia_mensal?: number | null
          moeda_padrao?: string | null
          nome?: string | null
          notificacoes_ativas?: boolean | null
          profissao?: string | null
          renda_mensal?: number | null
          telefone?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          data_nascimento?: string | null
          email?: string | null
          id?: string
          meta_economia_mensal?: number | null
          moeda_padrao?: string | null
          nome?: string | null
          notificacoes_ativas?: boolean | null
          profissao?: string | null
          renda_mensal?: number | null
          telefone?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      receitas: {
        Row: {
          anexo_url: string | null
          categoria_id: string | null
          created_at: string
          data_recebimento: string
          descricao: string
          frequencia_recorrencia: string | null
          id: string
          observacoes: string | null
          recorrente: boolean | null
          updated_at: string
          user_id: string
          valor: number
        }
        Insert: {
          anexo_url?: string | null
          categoria_id?: string | null
          created_at?: string
          data_recebimento: string
          descricao: string
          frequencia_recorrencia?: string | null
          id?: string
          observacoes?: string | null
          recorrente?: boolean | null
          updated_at?: string
          user_id: string
          valor: number
        }
        Update: {
          anexo_url?: string | null
          categoria_id?: string | null
          created_at?: string
          data_recebimento?: string
          descricao?: string
          frequencia_recorrencia?: string | null
          id?: string
          observacoes?: string | null
          recorrente?: boolean | null
          updated_at?: string
          user_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "receitas_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      teste: {
        Row: {
          created_at: string
          id: number
          teste: boolean | null
        }
        Insert: {
          created_at?: string
          id?: number
          teste?: boolean | null
        }
        Update: {
          created_at?: string
          id?: number
          teste?: boolean | null
        }
        Relationships: []
      }
      tipos_manutencao: {
        Row: {
          created_at: string
          custo_estimado: number | null
          descricao: string | null
          id: string
          nome: string
          quilometragem_intervalo: number | null
          tempo_intervalo_meses: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          custo_estimado?: number | null
          descricao?: string | null
          id?: string
          nome: string
          quilometragem_intervalo?: number | null
          tempo_intervalo_meses?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          custo_estimado?: number | null
          descricao?: string | null
          id?: string
          nome?: string
          quilometragem_intervalo?: number | null
          tempo_intervalo_meses?: number | null
          user_id?: string
        }
        Relationships: []
      }
      transacoes: {
        Row: {
          anexo_url: string | null
          categoria_id: string | null
          conta_destino: string | null
          conta_origem: string | null
          created_at: string
          data_transacao: string
          descricao: string
          id: string
          metodo_pagamento: string | null
          observacoes: string | null
          tipo: Database["public"]["Enums"]["tipo_transacao"]
          updated_at: string
          user_id: string
          valor: number
        }
        Insert: {
          anexo_url?: string | null
          categoria_id?: string | null
          conta_destino?: string | null
          conta_origem?: string | null
          created_at?: string
          data_transacao: string
          descricao: string
          id?: string
          metodo_pagamento?: string | null
          observacoes?: string | null
          tipo: Database["public"]["Enums"]["tipo_transacao"]
          updated_at?: string
          user_id: string
          valor: number
        }
        Update: {
          anexo_url?: string | null
          categoria_id?: string | null
          conta_destino?: string | null
          conta_origem?: string | null
          created_at?: string
          data_transacao?: string
          descricao?: string
          id?: string
          metodo_pagamento?: string | null
          observacoes?: string | null
          tipo?: Database["public"]["Enums"]["tipo_transacao"]
          updated_at?: string
          user_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "transacoes_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      veiculos: {
        Row: {
          ano: number
          ativo: boolean | null
          combustivel: string | null
          cor: string | null
          created_at: string
          data_compra: string | null
          id: string
          marca: string
          modelo: string
          numero_chassi: string | null
          observacoes: string | null
          placa: string | null
          quilometragem_atual: number | null
          renavam: string | null
          updated_at: string
          user_id: string
          valor_compra: number | null
        }
        Insert: {
          ano: number
          ativo?: boolean | null
          combustivel?: string | null
          cor?: string | null
          created_at?: string
          data_compra?: string | null
          id?: string
          marca: string
          modelo: string
          numero_chassi?: string | null
          observacoes?: string | null
          placa?: string | null
          quilometragem_atual?: number | null
          renavam?: string | null
          updated_at?: string
          user_id: string
          valor_compra?: number | null
        }
        Update: {
          ano?: number
          ativo?: boolean | null
          combustivel?: string | null
          cor?: string | null
          created_at?: string
          data_compra?: string | null
          id?: string
          marca?: string
          modelo?: string
          numero_chassi?: string | null
          observacoes?: string | null
          placa?: string | null
          quilometragem_atual?: number | null
          renavam?: string | null
          updated_at?: string
          user_id?: string
          valor_compra?: number | null
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
      status_divida: "pendente" | "vencida" | "quitada"
      status_manutencao: "pendente" | "concluida" | "atrasada"
      status_meta: "ativa" | "pausada" | "concluida" | "cancelada"
      tipo_transacao: "receita" | "despesa"
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
      status_divida: ["pendente", "vencida", "quitada"],
      status_manutencao: ["pendente", "concluida", "atrasada"],
      status_meta: ["ativa", "pausada", "concluida", "cancelada"],
      tipo_transacao: ["receita", "despesa"],
    },
  },
} as const
