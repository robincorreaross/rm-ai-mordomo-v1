-- ==============================================
-- SISTEMA FINANCEIRO MORDOMO - SCHEMA COMPLETO
-- ==============================================

-- Criação de enums
CREATE TYPE public.status_divida AS ENUM ('pendente', 'vencida', 'quitada');
CREATE TYPE public.status_meta AS ENUM ('ativa', 'pausada', 'concluida', 'cancelada');
CREATE TYPE public.tipo_transacao AS ENUM ('receita', 'despesa');
CREATE TYPE public.status_manutencao AS ENUM ('pendente', 'concluida', 'atrasada');

-- ==============================================
-- TABELA DE PERFIS DE USUÁRIO
-- ==============================================
CREATE TABLE public.profiles (
    id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT,
    email TEXT,
    telefone TEXT,
    avatar_url TEXT,
    data_nascimento DATE,
    profissao TEXT,
    renda_mensal DECIMAL(12,2) DEFAULT 0,
    meta_economia_mensal DECIMAL(12,2) DEFAULT 0,
    moeda_padrao TEXT DEFAULT 'BRL',
    timezone TEXT DEFAULT 'America/Sao_Paulo',
    notificacoes_ativas BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- ==============================================
-- TABELAS DE CATEGORIAS
-- ==============================================
CREATE TABLE public.categorias (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('receita', 'despesa')),
    cor TEXT NOT NULL DEFAULT '#6366f1',
    icone TEXT NOT NULL DEFAULT 'DollarSign',
    descricao TEXT,
    ativa BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE public.categorias_metas (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    cor TEXT NOT NULL DEFAULT '#10b981',
    icone TEXT NOT NULL DEFAULT 'Target',
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE public.categorias_mercado (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    cor TEXT NOT NULL DEFAULT '#f59e0b',
    icone TEXT NOT NULL DEFAULT 'ShoppingCart',
    descricao TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- ==============================================
-- TABELAS FINANCEIRAS PRINCIPAIS
-- ==============================================
CREATE TABLE public.receitas (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    categoria_id UUID REFERENCES public.categorias(id) ON DELETE SET NULL,
    descricao TEXT NOT NULL,
    valor DECIMAL(12,2) NOT NULL CHECK (valor > 0),
    data_recebimento DATE NOT NULL,
    recorrente BOOLEAN DEFAULT false,
    frequencia_recorrencia TEXT, -- 'mensal', 'semanal', 'anual'
    observacoes TEXT,
    anexo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE public.despesas (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    categoria_id UUID REFERENCES public.categorias(id) ON DELETE SET NULL,
    descricao TEXT NOT NULL,
    valor DECIMAL(12,2) NOT NULL CHECK (valor > 0),
    data_pagamento DATE NOT NULL,
    recorrente BOOLEAN DEFAULT false,
    frequencia_recorrencia TEXT,
    metodo_pagamento TEXT, -- 'dinheiro', 'cartao_credito', 'cartao_debito', 'pix', 'transferencia'
    observacoes TEXT,
    anexo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE public.transacoes (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    categoria_id UUID REFERENCES public.categorias(id) ON DELETE SET NULL,
    tipo public.tipo_transacao NOT NULL,
    descricao TEXT NOT NULL,
    valor DECIMAL(12,2) NOT NULL CHECK (valor > 0),
    data_transacao DATE NOT NULL,
    conta_origem TEXT,
    conta_destino TEXT,
    metodo_pagamento TEXT,
    observacoes TEXT,
    anexo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- ==============================================
-- TABELA DE DÍVIDAS
-- ==============================================
CREATE TABLE public.dividas (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    categoria_id UUID REFERENCES public.categorias(id) ON DELETE SET NULL,
    descricao TEXT NOT NULL,
    valor_total DECIMAL(12,2) NOT NULL CHECK (valor_total > 0),
    valor_pago DECIMAL(12,2) DEFAULT 0 CHECK (valor_pago >= 0),
    valor_restante DECIMAL(12,2) GENERATED ALWAYS AS (valor_total - valor_pago) STORED,
    data_vencimento DATE NOT NULL,
    parcelas INTEGER DEFAULT 1 CHECK (parcelas > 0),
    parcelas_pagas INTEGER DEFAULT 0 CHECK (parcelas_pagas >= 0),
    status public.status_divida DEFAULT 'pendente',
    credor TEXT NOT NULL,
    taxa_juros DECIMAL(5,2) DEFAULT 0,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- ==============================================
-- TABELA DE METAS FINANCEIRAS
-- ==============================================
CREATE TABLE public.metas (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    categoria_id UUID REFERENCES public.categorias_metas(id) ON DELETE SET NULL,
    titulo TEXT NOT NULL,
    descricao TEXT,
    valor_objetivo DECIMAL(12,2) NOT NULL CHECK (valor_objetivo > 0),
    valor_atual DECIMAL(12,2) DEFAULT 0 CHECK (valor_atual >= 0),
    data_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    data_fim DATE NOT NULL,
    status public.status_meta DEFAULT 'ativa',
    prioridade INTEGER DEFAULT 1 CHECK (prioridade BETWEEN 1 AND 5),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    CONSTRAINT check_data_fim CHECK (data_fim > data_inicio)
);

-- ==============================================
-- SISTEMA DE VEÍCULOS E MANUTENÇÕES
-- ==============================================
CREATE TABLE public.veiculos (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    marca TEXT NOT NULL,
    modelo TEXT NOT NULL,
    ano INTEGER NOT NULL CHECK (ano > 1900),
    placa TEXT,
    cor TEXT,
    combustivel TEXT, -- 'gasolina', 'etanol', 'diesel', 'flex', 'eletrico', 'hibrido'
    quilometragem_atual INTEGER DEFAULT 0 CHECK (quilometragem_atual >= 0),
    valor_compra DECIMAL(12,2),
    data_compra DATE,
    numero_chassi TEXT,
    renavam TEXT,
    observacoes TEXT,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE public.tipos_manutencao (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    descricao TEXT,
    quilometragem_intervalo INTEGER, -- intervalo em km
    tempo_intervalo_meses INTEGER, -- intervalo em meses
    custo_estimado DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE public.manutencoes_pendentes (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    veiculo_id UUID NOT NULL REFERENCES public.veiculos(id) ON DELETE CASCADE,
    tipo_manutencao_id UUID NOT NULL REFERENCES public.tipos_manutencao(id) ON DELETE CASCADE,
    descricao TEXT NOT NULL,
    quilometragem_prevista INTEGER,
    data_prevista DATE,
    custo_estimado DECIMAL(12,2),
    status public.status_manutencao DEFAULT 'pendente',
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- ==============================================
-- SISTEMA DE MERCADO/LISTA DE COMPRAS
-- ==============================================
CREATE TABLE public.orcamentos_mercado (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    orcamento_total DECIMAL(12,2) NOT NULL CHECK (orcamento_total > 0),
    valor_gasto DECIMAL(12,2) DEFAULT 0 CHECK (valor_gasto >= 0),
    data_criacao DATE NOT NULL DEFAULT CURRENT_DATE,
    data_compra DATE,
    finalizado BOOLEAN DEFAULT false,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

CREATE TABLE public.itens_mercado (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    categoria_id UUID REFERENCES public.categorias_mercado(id) ON DELETE SET NULL,
    orcamento_id UUID REFERENCES public.orcamentos_mercado(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    quantidade INTEGER DEFAULT 1 CHECK (quantidade > 0),
    unidade TEXT DEFAULT 'un', -- 'un', 'kg', 'g', 'l', 'ml'
    preco_unitario DECIMAL(8,2),
    preco_total DECIMAL(10,2) GENERATED ALWAYS AS (quantidade * COALESCE(preco_unitario, 0)) STORED,
    comprado BOOLEAN DEFAULT false,
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- ==============================================
-- SISTEMA DE IA E CONFIGURAÇÕES
-- ==============================================
CREATE TABLE public.ia_configuracoes (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    analise_automatica BOOLEAN DEFAULT true,
    frequencia_analise TEXT DEFAULT 'semanal', -- 'diaria', 'semanal', 'mensal'
    categorias_priorizadas UUID[],
    limite_alerta_gastos DECIMAL(12,2),
    sugestoes_economia BOOLEAN DEFAULT true,
    notificacoes_metas BOOLEAN DEFAULT true,
    api_key_externa TEXT, -- para integrações com bancos
    configuracoes_personalizadas JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id),
    UNIQUE(user_id)
);

CREATE TABLE public.ia_analises (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tipo_analise TEXT NOT NULL, -- 'gastos', 'receitas', 'metas', 'dividas', 'geral'
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    insights JSONB,
    sugestoes JSONB,
    pontuacao_financeira INTEGER CHECK (pontuacao_financeira BETWEEN 0 AND 100),
    periodo_inicio DATE,
    periodo_fim DATE,
    data_analise TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (id)
);

-- ==============================================
-- HABILITAR RLS EM TODAS AS TABELAS
-- ==============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_metas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_mercado ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receitas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.despesas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dividas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.veiculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tipos_manutencao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manutencoes_pendentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orcamentos_mercado ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.itens_mercado ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ia_configuracoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ia_analises ENABLE ROW LEVEL SECURITY;

-- ==============================================
-- POLÍTICAS RLS PARA ACESSO POR USUÁRIO
-- ==============================================

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Categorias
CREATE POLICY "Users can manage own categorias" ON public.categorias FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own categorias_metas" ON public.categorias_metas FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own categorias_mercado" ON public.categorias_mercado FOR ALL USING (auth.uid() = user_id);

-- Transações financeiras
CREATE POLICY "Users can manage own receitas" ON public.receitas FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own despesas" ON public.despesas FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own transacoes" ON public.transacoes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own dividas" ON public.dividas FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own metas" ON public.metas FOR ALL USING (auth.uid() = user_id);

-- Veículos e manutenções
CREATE POLICY "Users can manage own veiculos" ON public.veiculos FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own tipos_manutencao" ON public.tipos_manutencao FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own manutencoes_pendentes" ON public.manutencoes_pendentes FOR ALL USING (auth.uid() = user_id);

-- Sistema de mercado
CREATE POLICY "Users can manage own orcamentos_mercado" ON public.orcamentos_mercado FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own itens_mercado" ON public.itens_mercado FOR ALL USING (auth.uid() = user_id);

-- Sistema de IA
CREATE POLICY "Users can manage own ia_configuracoes" ON public.ia_configuracoes FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own ia_analises" ON public.ia_analises FOR ALL USING (auth.uid() = user_id);

-- ==============================================
-- FUNÇÕES E TRIGGERS
-- ==============================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_categorias_updated_at BEFORE UPDATE ON public.categorias FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_receitas_updated_at BEFORE UPDATE ON public.receitas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_despesas_updated_at BEFORE UPDATE ON public.despesas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_transacoes_updated_at BEFORE UPDATE ON public.transacoes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_dividas_updated_at BEFORE UPDATE ON public.dividas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_metas_updated_at BEFORE UPDATE ON public.metas FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_veiculos_updated_at BEFORE UPDATE ON public.veiculos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_manutencoes_pendentes_updated_at BEFORE UPDATE ON public.manutencoes_pendentes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orcamentos_mercado_updated_at BEFORE UPDATE ON public.orcamentos_mercado FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_itens_mercado_updated_at BEFORE UPDATE ON public.itens_mercado FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_ia_configuracoes_updated_at BEFORE UPDATE ON public.ia_configuracoes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Função para criar perfil automaticamente
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, nome, email)
    VALUES (
        NEW.id, 
        COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.raw_user_meta_data ->> 'full_name'),
        NEW.email
    );
    
    -- Criar configurações padrão de IA
    INSERT INTO public.ia_configuracoes (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================
-- ÍNDICES PARA PERFORMANCE
-- ==============================================
CREATE INDEX idx_categorias_user_id ON public.categorias(user_id);
CREATE INDEX idx_receitas_user_id ON public.receitas(user_id);
CREATE INDEX idx_receitas_data ON public.receitas(data_recebimento);
CREATE INDEX idx_despesas_user_id ON public.despesas(user_id);
CREATE INDEX idx_despesas_data ON public.despesas(data_pagamento);
CREATE INDEX idx_transacoes_user_id ON public.transacoes(user_id);
CREATE INDEX idx_transacoes_data ON public.transacoes(data_transacao);
CREATE INDEX idx_dividas_user_id ON public.dividas(user_id);
CREATE INDEX idx_dividas_status ON public.dividas(status);
CREATE INDEX idx_metas_user_id ON public.metas(user_id);
CREATE INDEX idx_metas_status ON public.metas(status);
CREATE INDEX idx_veiculos_user_id ON public.veiculos(user_id);
CREATE INDEX idx_manutencoes_pendentes_user_id ON public.manutencoes_pendentes(user_id);
CREATE INDEX idx_itens_mercado_user_id ON public.itens_mercado(user_id);
CREATE INDEX idx_ia_analises_user_id ON public.ia_analises(user_id);
CREATE INDEX idx_ia_analises_tipo ON public.ia_analises(tipo_analise);