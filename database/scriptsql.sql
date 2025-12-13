/*********************************************************************
 * CRIAÇÃO DO BANCO DE DADOS
 *********************************************************************/
DROP DATABASE IF EXISTS db_locadora_filme_ds2t_25_2;
CREATE DATABASE db_locadora_filme_ds2t_25_2;
USE db_locadora_filme_ds2t_25_2;

/*********************************************************************
 * CRIAÇÃO DAS TABELAS (DDL)
 *********************************************************************/

-- 1. Tabela Gênero
CREATE TABLE tbl_genero (
    id_genero INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome      VARCHAR(100) NOT NULL
);

-- 2. Tabela Diretor
CREATE TABLE tbl_diretor (
    id_diretor       INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome             VARCHAR(100) NOT NULL,
    data_nascimento  DATE NOT NULL,
    data_falecimento DATE NULL,
    biografia        TEXT NULL,
    foto             TEXT NOT NULL,
    is_ativo         BOOLEAN NOT NULL
);

-- 3. Tabela Produtora
CREATE TABLE tbl_produtora (
    id_produtora      INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome              VARCHAR(100) NOT NULL,
    data_criacao      DATE NOT NULL,
    descricao         TEXT NOT NULL,
    data_encerramento DATE NULL
);

-- 4. Tabela Ator
CREATE TABLE tbl_ator (
    id_ator          INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome             VARCHAR(100) NOT NULL,
    data_nascimento  DATE NOT NULL,
    data_falecimento DATE NULL,
    is_ativo         BOOLEAN NOT NULL,
    biografia        TEXT NULL,
    foto             TEXT NOT NULL
);

-- 5. Tabela Personagem
CREATE TABLE tbl_personagem (
    id_personagem INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome          VARCHAR(100) NOT NULL,
    is_vivo       BOOLEAN NOT NULL,
    data_criacao  DATE NOT NULL,
    biografia     TEXT NULL,
    foto          TEXT NOT NULL
);

-- 6. Tabela Classificação
CREATE TABLE tbl_classificacao (
    id_classificacao INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome             VARCHAR(120) NOT NULL,
    sigla            VARCHAR(2) NOT NULL
);

-- 7. Tabela Filme (RECRIADA - Estava faltando no código original)
-- Nota: Criei uma estrutura básica para não dar erro na Chave Estrangeira abaixo.
CREATE TABLE tbl_filme (
    id_filme INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    sinopse TEXT,
    data_lancamento DATE,
    duracao TIME,
    orcamento DECIMAL(15,2),
    trailer VARCHAR(255),
    capa VARCHAR(255),
    is_ativo BOOLEAN DEFAULT TRUE
);

-- 8. Tabela Associativa Filme_Genero
CREATE TABLE tbl_filme_genero (
    id_filme_genero INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_filme        INT NOT NULL,
    id_genero       INT NOT NULL,
    
    CONSTRAINT FK_FILME_FILME_GENERO
    FOREIGN KEY (id_filme)
    REFERENCES tbl_filme(id_filme),
    
    CONSTRAINT FK_GENERO_FILME_GENERO
    FOREIGN KEY (id_genero)
    REFERENCES tbl_genero(id_genero)
);

-- 8. Tabela Associativa Filme_Classificação
CREATE TABLE tbl_filme_classificacao (
    id_filme_classificacao 	INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_filme        		INT NOT NULL,
    id_classificacao       	INT NOT NULL,
    
    CONSTRAINT FK_FILME_FILME_CLASSIFICACAO
    FOREIGN KEY (id_filme)
    REFERENCES tbl_filme(id_filme),
    
    CONSTRAINT FK_CLASSIFICACAO_FILME_CLASSIFICACAO
    FOREIGN KEY (id_classificacao)
    REFERENCES tbl_classificacao(id_classificacao)
);

-- 8. Tabela Associativa Filme_Diretor
CREATE TABLE tbl_filme_diretor (
    id_filme_diretor 	INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_filme        		INT NOT NULL,
    id_diretor       	INT NOT NULL,
    
    CONSTRAINT FK_FILME_FILME_DIRETOR
    FOREIGN KEY (id_filme)
    REFERENCES tbl_filme(id_filme),
    
    CONSTRAINT FK_DIRETOR_FILME_DIRETOR
    FOREIGN KEY (id_diretor)
    REFERENCES tbl_diretor(id_diretor)
);

/*********************************************************************
 * INSERÇÃO DE DADOS (DML)
 *********************************************************************/

-- Inserts Gênero
INSERT INTO tbl_genero (nome) VALUES 
('TERROR'), ('COMÉDIA'), ('AÇÃO'), ('AVENTURA'), ('FANTASIA'), 
('MISTÉRIO'), ('SUSPENSE'), ('ANIMAÇÃO'), ('ROMANCE'), ('DRAMA');

-- Inserts Diretor
INSERT INTO tbl_diretor (nome, data_nascimento, data_falecimento, biografia, foto, is_ativo) VALUES
('John Lasseter', '1957-01-12', NULL, 'John Alan Lasseter é um diretor e produtor americano. Ex-diretor criativo da Pixar.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/John_Lasseter_2011_San_Diego_Comic-Con_International.jpg/800px-John_Lasseter_2011_San_Diego_Comic-Con_International.jpg', false),
('Steven Spielberg', '1946-12-18', NULL, 'Steven Allan Spielberg é um diretor, produtor e roteirista americano.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Steven_Spielberg_by_Gage_Skidmore.jpg/800px-Steven_Spielberg_by_Gage_Skidmore.jpg', true),
('Martin Scorsese', '1942-11-17', NULL, 'Martin Charles Scorsese é um diretor, produtor e roteirista ítalo-americano.', 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSCjE7uAnKvS7nym5MEKsSRBiitxjV3YShwZZzf11tntA8Y1kqnW3P_VU3Q0wZzGAN2xoR9-4QGQUetg1c', true),
('Quentin Tarantino', '1963-03-27', NULL, 'Quentin Jerome Tarantino é um diretor, roteirista e produtor americano.', 'https://www.infoescola.com/wp-content/uploads/2010/03/tarantino.jpg', true),
('Christopher Nolan', '1970-07-30', NULL, 'Christopher Edward Nolan é um diretor, roteirista e produtor britânico-americano.', 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/02/Christopher-Nolan.jpg', true),
('Alfred Hitchcock', '1899-08-13', '1980-04-29', 'Sir Alfred Joseph Hitchcock foi um diretor e produtor britânico. Mestre do Suspense.', 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTCS7MN0Vneg-TC1WofXse4k5efNhimXOImeHt_pMwN8Fqm6Wq0SPD8zmMSb10A-xa4ENihVBB1Af0qk4xjW_5-Gg5DDg3q5Pk3-5pcatKmhX1N7Y8eq1rLQTyLnP2pJQj2BN5rjIaskht7', false),
('Stanley Kubrick', '1928-07-26', '1999-03-07', 'Stanley Kubrick foi um cineasta americano conhecido pelo perfeccionismo.', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQbbIvNYG9VXgtiGfbZbWnAT5GOLGC4eSVjlb-DNNLXyZQlxw3Ocq_1RbkmSr8qrH8T7mo97ZlMbg6Jp3kFipY9PsiiNtIFgH6UyfqJMSoh', false),
('Hayao Miyazaki', '1941-01-05', NULL, 'Cofundador do Studio Ghibli e mestre da animação.', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTXVcm-6tNmzWF_9vFqAK-rh3vaj2lTUV80FeEsYSFeNQPtw5OurizIqZT_2fAEVVwEhnmASUuKdXyqlSkZCYKScrQrJb4--dsPJCzsuetqxA', true),
('Greta Gerwig', '1983-08-04', NULL, 'Diretora, roteirista e atriz americana. Dirigiu Barbie.', 'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRih0WvLJ9F6ILQKbd9P_RzZRMP-Xf05BLO7LBsWFktfjptGd1JmMtDUT3lXRX6kGVC5jMKkifRa3GHcVXET-cySIFAFf4xhopfqUnH-11ItWBKacGTfYkBkL_Ul580Z-w4FwBAisoTvQ43', true),
('James Cameron', '1954-08-16', NULL, 'Cineasta canadense, famoso por Titanic e Avatar.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFySynTvWDlL3o4r23lb5Xx2KL4_de67nAOJbXwOGlFwmfmikvvYpg1YEKCYJ5bo4GBeTTjYit3ZpOJbY6jPew1Zi6z87hzrd9n7RY86zF', true);

-- Inserts Produtora
INSERT INTO tbl_produtora (nome, data_criacao, data_encerramento, descricao) VALUES
('The Walt Disney Studios', '1923-10-16', NULL, 'Supervisiona a produção cinematográfica e teatral da Disney.'),
('Warner Bros. Pictures', '1923-04-04', NULL, 'Um dos Big Five estúdios americanos. Harry Potter, DC Comics.'),
('Universal Pictures', '1912-04-30', NULL, 'Um dos estúdios mais antigos. Jurassic Park, Monstros Clássicos.'),
('Paramount Pictures', '1912-05-08', NULL, 'Estúdio mais antigo em operação contínua em Hollywood.'),
('Sony Pictures', '1918-06-19', NULL, 'Proprietária da Columbia Pictures. Homem-Aranha, Jumanji.'),
('A24', '2012-08-20', NULL, 'Produtora independente conhecida por filmes de autor e terror.'),
('Lionsgate', '1997-04-28', NULL, 'Jogos Vorazes, John Wick e Crepúsculo.'),
('Pixar Animation Studios', '1986-02-03', NULL, 'Pioneira em CGI, subsidiária da Disney. Toy Story.'),
('Studio Ghibli', '1985-06-15', NULL, 'Estúdio japonês reverenciado. A Viagem de Chihiro.'),
('Netflix', '1997-08-29', NULL, 'Gigante do streaming e produção de conteúdo original.');

-- Inserts Ator
INSERT INTO tbl_ator (nome, data_nascimento, data_falecimento, is_ativo, biografia, foto) VALUES
('Jack Black', '1969-08-28', NULL, true, 'Ator, comediante e músico americano. Escola de Rock, Kung Fu Panda.', 'https://static.independent.co.uk/jack_black.jpg'),
('Tom Hanks', '1956-07-09', NULL, true, 'Conhecido por Forrest Gump e Filadélfia.', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:tom_hanks.jpg'),
('Meryl Streep', '1949-06-22', NULL, true, 'Recordista de indicações ao Oscar.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:meryl_streep.jpg'),
('Leonardo DiCaprio', '1974-11-11', NULL, true, 'Titanic, O Regresso, O Lobo de Wall Street.', 'https://s2-oglobo.glbimg.com/dicaprio.jpg'),
('Scarlett Johansson', '1984-11-22', NULL, true, 'Viúva Negra no MCU.', 'https://m.media-amazon.com/images/scarlett.jpg'),
('Denzel Washington', '1954-12-28', NULL, true, 'Dia de Treinamento, O Protetor.', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:denzel.jpg'),
('Audrey Hepburn', '1929-05-04', '1993-01-20', false, 'Bonequinha de Luxo. Ícone de elegância.', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:audrey.jpg'),
('Robert De Niro', '1943-08-17', NULL, true, 'O Poderoso Chefão II, Taxi Driver.', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:deniro.jpg'),
('Margot Robbie', '1990-07-02', NULL, true, 'Arlequina, Barbie.', 'https://upload.wikimedia.org/wikipedia/margot.jpg'),
('Keanu Reeves', '1964-09-02', NULL, true, 'Matrix, John Wick.', 'https://encrypted-tbn0.gstatic.com/keanu.jpg');

-- Inserts Personagem
INSERT INTO tbl_personagem (nome, is_vivo, data_criacao, biografia, foto) VALUES 
('Mickey Mouse', true, '1928-11-18', 'Mascote da Disney.', 'https://mickey_url.jpg'),
('Homer Simpson', true, '1987-04-19', 'Patriarca da família Simpson.', 'https://homer_url.jpg'),
('Batman', true, '1939-05-30', 'O Cavaleiro das Trevas.', 'https://batman_url.jpg'),
('Harry Potter', true, '1997-06-26', 'O menino que sobreviveu.', 'https://harry_url.jpg'),
('Pikachu', true, '1996-02-27', 'Pokémon elétrico do Ash.', 'https://pikachu_url.jpg'),
('Sherlock Holmes', true, '1887-01-01', 'Detetive consultor.', 'https://sherlock_url.jpg'),
('Darth Vader', false, '1977-05-25', 'Lorde Sith.', 'https://vader_url.jpg'),
('Wonder Woman', true, '1941-12-25', 'Diana Prince.', 'https://ww_url.jpg'),
('Iron Man', true, '1963-03-01', 'Tony Stark.', 'https://ironman_url.jpg'),
('Daenerys Targaryen', false, '1996-08-01', 'Mãe dos Dragões.', 'https://dany_url.jpg');

-- Inserts Classificação
INSERT INTO tbl_classificacao(nome, sigla) VALUES
('Livre para todas as idades', 'L'),
('Não recomendado para menores de 10 anos', '10'),
('Não recomendado para menores de 12 anos', '12'),
('Não recomendado para menores de 14 anos', '14'),
('Não recomendado para menores de 16 anos', '16'),
('Não recomendado para menores de 18 anos', '18');

/*********************************************************************
 * TRIGGERS E OUTROS
 *********************************************************************/

-- Trigger para deletar relacionamentos antes de deletar um filme
DELIMITER $$
CREATE TRIGGER trg_deletar_filme_delete
BEFORE DELETE ON tbl_filme 
FOR EACH ROW
BEGIN
    DELETE FROM tbl_filme_genero WHERE id_filme = OLD.id_filme;
    DELETE FROM tbl_filme_classificacao WHERE id_filme = OLD.id_filme;
    DELETE FROM tbl_filme_diretor WHERE id_filme = OLD.id_filme;
END $$
DELIMITER ;

/*********************************************************************
 * CONSULTAS DE VERIFICAÇÃO (OPCIONAIS)
 *********************************************************************/
-- SHOW TABLES;
-- SELECT * FROM tbl_genero;
-- SELECT * FROM tbl_diretor;
-- SELECT * FROM tbl_produtora;
-- SELECT * FROM tbl_ator;
-- SELECT * FROM tbl_personagem;
-- SELECT * FROM tbl_classificacao;
-- DESC tbl_filme_genero;