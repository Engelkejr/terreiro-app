
CREATE TABLE IF NOT EXISTS membros (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome             TEXT NOT NULL,
  data_nascimento  DATE,
  telefone         TEXT,
  email            TEXT,
  funcao           TEXT NOT NULL DEFAULT 'Visitante'
                   CHECK (funcao IN ('Filho de Santo','Ogã','Ekede','Visitante','Zelador(a) de Orixá')),
  orixo_cabeca     TEXT,
  data_ingresso    DATE NOT NULL DEFAULT CURRENT_DATE,
  ativo            BOOLEAN NOT NULL DEFAULT TRUE,
  observacoes      TEXT,
  criado_em        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS estoque (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome               TEXT NOT NULL,
  categoria          TEXT NOT NULL DEFAULT 'Outros'
                     CHECK (categoria IN ('Vela','Incenso','Erva','Alimento','Roupa Ritual','Material de Limpeza','Outros')),
  quantidade         INTEGER NOT NULL DEFAULT 0 CHECK (quantidade >= 0),
  unidade            TEXT NOT NULL DEFAULT 'unidade(s)',
  quantidade_minima  INTEGER NOT NULL DEFAULT 5 CHECK (quantidade_minima >= 0),
  descricao          TEXT,
  criado_em          TIMESTAMPTZ DEFAULT NOW(),
  atualizado_em      TIMESTAMPTZ DEFAULT NOW() 
);

ALTER TABLE membros ENABLE ROW LEVEL SECURITY;
ALTER TABLE estoque  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "leitura_publica_membros" ON membros FOR SELECT USING (TRUE);
CREATE POLICY "leitura_publica_estoque" ON estoque  FOR SELECT USING (TRUE);

CREATE POLICY "escrita_publica_membros" ON membros FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "escrita_publica_estoque" ON estoque  FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "atualizacao_publica_estoque" ON estoque FOR UPDATE USING (TRUE);

INSERT INTO membros (nome, funcao, orixo_cabeca, telefone, ativo, data_ingresso) VALUES
  ('Maria de Iemanjá',    'Zelador(a) de Orixá', 'Iemanjá', '(21) 98888-0001', TRUE, '2015-03-15'),
  ('João da Oxum',        'Filho de Santo',       'Oxum',    '(21) 97777-0002', TRUE, '2018-06-01'),
  ('Carla Ogã Xangô',     'Ogã',                  'Xangô',   '(21) 96666-0003', TRUE, '2020-01-10'),
  ('Roberto Ekede',       'Ekede',                'Iansã',   '(21) 95555-0004', TRUE, '2021-07-22'),
  ('Ana Visitante',       'Visitante',             NULL,     '(21) 94444-0005', FALSE,'2023-11-05');

INSERT INTO estoque (nome, categoria, quantidade, unidade, quantidade_minima, descricao) VALUES
  ('Vela branca 7 dias',   'Vela',     45, 'unidade(s)', 10, 'Velas para rituais de limpeza'),
  ('Vela preta',           'Vela',      3, 'unidade(s)', 10, 'Estoque crítico — repor urgente'),
  ('Incenso de alfazema',  'Incenso',  20, 'pacote(s)',   5, 'Para defumação'),
  ('Arruda',               'Erva',      8, 'maço(s)',     5, 'Erva de proteção'),
  ('Arroz parboilizado',   'Alimento', 12, 'kg',          5, 'Para oferendas'),
  ('Dendê',                'Alimento',  2, 'litro(s)',    3, 'Azeite de dendê para ebós'),
  ('Roupa branca P',       'Roupa Ritual', 6, 'unidade(s)', 2, 'Roupas para iniciantes'),
  ('Álcool 70%',           'Material de Limpeza', 4, 'litro(s)', 2, 'Limpeza do espaço sagrado');
