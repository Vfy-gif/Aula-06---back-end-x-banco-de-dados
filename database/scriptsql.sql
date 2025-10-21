
CREATE DATABASE db_locadora_filme_ds2t_25_2;

USE db_locadora_filme_ds2t_25_2;

CREATE TABLE tbl_filme (
	id_filme 		INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome			VARCHAR(100) NOT NULL,
	sinopse	 		TEXT NULL,
	data_lancamento	DATE NULL,
	duracao			TIME NOT NULL,
	orcamento		DECIMAL(12,2) NOT NULL,
	trailer 		VARCHAR(200) NULL,
	capa 			VARCHAR(200) NOT NULL
);

INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa) VALUES('Carros 3', 'Veterano das pistas, o campeoníssimo Relâmpago McQueen se vê em apuros
										após o surgimento de um novato bastante veloz, Jackson Storm, que utiliza de alta tecnologia nos treinamentos. 
										Obrigado a chegar ao limite para batê-lo, McQueen acaba sofrendo um sério acidente durante uma corrida, que o obriga
										a abandonar o campeonato daquele ano. Prestes a iniciar a próxima temporada, ele se vê em dúvidas sobre se consegue
										ser rápido o suficiente para bater Storm e, por causa disto, busca ajuda com seu novo patrocinador.', '2017-07-13', '01:42:00', '175000000', 
										'youtube.com/watch?v=BuvJZGLclAU&themeRefresh=1', 
										'https://static.wikia.nocookie.net/dublagem/images/9/9f/Carros_3_%282017%29_P%C3%B4ster.jpg/revision/latest/scale-to-width-down/1000?cb=20230925191039&path-prefix=pt-br');
										
INSERT INTO tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa) VALUES('Vingadores: Ultimato', 'Após os eventos devastadores de "Vingadores: Guerra Infinita",
										o universo está em ruínas. Com a ajuda dos aliados restantes, os Vingadores se reúnem mais uma vez para reverter as ações de Thanos e restaurar
										o equilíbrio do universo.', '2019-04-25', '03:01:00', '356000000', 'https://www.youtube.com/watch?v=g6ng8iy-l0U',
										'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_FMjpg_UX1000_.jpg');
										
CREATE TABLE tbl_genero (
	id_genero 		INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome			VARCHAR(100) NOT NULL
);

INSERT INTO tbl_genero (nome) VALUES("TERROR");
INSERT INTO tbl_genero (nome) VALUES("COMÉDIA");
INSERT INTO tbl_genero (nome) VALUES("AÇÃO");
INSERT INTO tbl_genero (nome) VALUES("AVENTURA");
INSERT INTO tbl_genero (nome) VALUES("FANTASIA");
INSERT INTO tbl_genero (nome) VALUES("MISTÉRIO");
INSERT INTO tbl_genero (nome) VALUES("SUSPENSE");
INSERT INTO tbl_genero (nome) VALUES("ANIMAÇÃO");
INSERT INTO tbl_genero (nome) VALUES("ROMANCE");
INSERT INTO tbl_genero (nome) VALUES("DRAMA");


CREATE TABLE tbl_diretor (
	id_diretor 			INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome				VARCHAR(100) NOT NULL,
	data_nascimento 	DATE NOT NULL,
	data_falecimento 	DATE NULL,
	biografia 			TEXT NULL,
	foto				TEXT NOT NULL,
    is_ativo 			BOOLEAN NOT NULL
);

ALTER TABLE tbl_diretor MODIFY column foto TEXT NOT NULL;

INSERT INTO tbl_diretor (nome, data_nascimento, data_falecimento, biografia, foto, is_ativo) VALUES("John Lasseter", "1957-01-12", NULL, 
											"John Alan Lasseter é um diretor e produtor americano. Ele é mais conhecido por ter sido o diretor de criação da Pixar,
                                            Walt Disney Animation Studios e DisneyToon Studios. E é também o principal consultor criativo da Walt Disney Imagineering.", 
                                            "https://s2-g1.glbimg.com/VjAT1OYN5x2Ua20I880N-c2tebY=/0x0:3500x2335/1008x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd
                                            422c0c84a879bd37670ae4f538a/internal_photos/bs/2017/4/G/3XU23nSRAaFO9KLbtdUA/john-lasseter-disney-pixar.jpg", false);

INSERT INTO tbl_diretor (nome, data_nascimento, data_falecimento, biografia, foto, is_ativo) VALUES
("Steven Spielberg", "1946-12-18", NULL, 
"Steven Allan Spielberg é um diretor, produtor e roteirista americano. Considerado um dos pais da era 'New Hollywood', é um dos diretores mais influentes e comercialmente bem-sucedidos da história, conhecido por filmes como 'Tubarão', 'E.T. - O Extraterrestre' e 'A Lista de Schindler'.", 
"https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Steven_Spielberg_by_Gage_Skidmore.jpg/800px-Steven_Spielberg_by_Gage_Skidmore.jpg", true),

("Martin Scorsese", "1942-11-17", NULL, 
"Martin Charles Scorsese é um diretor, produtor e roteirista ítalo-americano. É amplamente considerado um dos cineastas mais significativos e influentes da história do cinema, conhecido por filmes como 'Taxi Driver', 'Os Bons Companheiros' e 'O Lobo de Wall Street'.", 
"https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcSCjE7uAnKvS7nym5MEKsSRBiitxjV3YShwZZzf11tntA8Y1kqnW3P_VU3Q0wZzGAN2xoR9-4QGQUetg1c", true),

("Quentin Tarantino", "1963-03-27", NULL, 
"Quentin Jerome Tarantino é um diretor, roteirista e produtor americano. Seus filmes são caracterizados por diálogos estilizados, narrativa não linear e violência gráfica. Obras notáveis incluem 'Pulp Fiction', 'Kill Bill' e 'Bastardos Inglórios'.", 
"https://www.infoescola.com/wp-content/uploads/2010/03/tarantino.jpg", true),

("Christopher Nolan", "1970-07-30", NULL, 
"Christopher Edward Nolan é um diretor, roteirista e produtor britânico-americano. Conhecido por seus filmes de grande escala e conceitos complexos, seus trabalhos incluem 'A Origem', a trilogia 'O Cavaleiro das Trevas' e 'Oppenheimer', pelo qual ganhou o Oscar de Melhor Diretor.", 
"https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/02/Christopher-Nolan.jpg?w=1200&h=900&crop=0", true),

("Alfred Hitchcock", "1899-08-13", "1980-04-29", 
"Sir Alfred Joseph Hitchcock foi um diretor e produtor de cinema britânico. Conhecido como o 'Mestre do Suspense', ele foi pioneiro em muitas técnicas de thriller psicológico. Seus filmes notáveis incluem 'Psicose', 'Um Corpo que Cai' e 'Janela Indiscreta'.", 
"https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcTCS7MN0Vneg-TC1WofXse4k5efNhimXOImeHt_pMwN8Fqm6Wq0SPD8zmMSb10A-xa4ENihVBB1Af0qk4xjW_5-Gg5DDg3q5Pk3-5pcatKmhX1N7Y8eq1rLQTyLnP2pJQj2BN5rjIaskht7", false),

("Stanley Kubrick", "1928-07-26", "1999-03-07", 
"Stanley Kubrick foi um diretor, roteirista e produtor americano. É frequentemente citado como um dos cineastas mais influentes da história, conhecido por seu perfeccionismo meticuloso e filmes icônicos como '2001: Uma Odisseia no Espaço', 'O Iluminado' e 'Laranja Mecânica'.", 
"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQbbIvNYG9VXgtiGfbZbWnAT5GOLGC4eSVjlb-DNNLXyZQlxw3Ocq_1RbkmSr8qrH8T7mo97ZlMbg6Jp3kFipY9PsiiNtIFgH6UyfqJMSoh", false),

("Hayao Miyazaki", "1941-01-05", NULL, 
"Hayao Miyazaki é um animador, diretor, produtor e roteirista japonês. Co-fundador do Studio Ghibli, é aclamado internacionalmente por suas obras-primas de animação, incluindo 'A Viagem de Chihiro' (vencedor do Oscar), 'Meu Amigo Totoro' e 'O Menino e a Garça'.", 
"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTXVcm-6tNmzWF_9vFqAK-rh3vaj2lTUV80FeEsYSFeNQPtw5OurizIqZT_2fAEVVwEhnmASUuKdXyqlSkZCYKScrQrJb4--dsPJCzsuetqxA", true),

("Greta Gerwig", "1983-08-04", NULL, 
"Greta Celeste Gerwig é uma diretora, roteirista e atriz americana. Ela ganhou aclamação da crítica por dirigir filmes como 'Lady Bird', 'Adoráveis Mulheres' e o fenômeno de bilheteria 'Barbie', tornando-se uma das vozes mais proeminentes do cinema moderno.", 
"https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRih0WvLJ9F6ILQKbd9P_RzZRMP-Xf05BLO7LBsWFktfjptGd1JmMtDUT3lXRX6kGVC5jMKkifRa3GHcVXET-cySIFAFf4xhopfqUnH-11ItWBKacGTfYkBkL_Ul580Z-w4FwBAisoTvQ43", true),

("James Cameron", "1954-08-16", NULL, 
"James Francis Cameron é um diretor, produtor e roteirista canadense. Conhecido por seus épicos de ficção científica e avanços tecnológicos, ele dirigiu três dos filmes de maior bilheteria de todos os tempos: 'Avatar', 'Avatar: O Caminho da Água' e 'Titanic'.", 
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFySynTvWDlL3o4r23lb5Xx2KL4_de67nAOJbXwOGlFwmfmikvvYpg1YEKCYJ5bo4GBeTTjYit3ZpOJbY6jPew1Zi6z87hzrd9n7RY86zF", true);

select * from tbl_diretor;

CREATE TABLE tbl_produtora (
	id_estudio 			INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome				VARCHAR(100) NOT NULL,
	data_criacao 		DATE NOT NULL,
    descricao 			TEXT NOT NULL,
    data_encerramento 	DATE NULL
);

INSERT INTO tbl_produtora (nome, data_criacao, data_encerramento, descricao) VALUES("The Walt Disney Studios", "1923-10-16", NULL, "The Walt Disney Studios é uma divisão que desenvolve roteiros e supervisiona a produção cinematográfica, teatral e musical da The Walt Disney Company.");
INSERT INTO tbl_produtora (nome, data_criacao, data_encerramento, descricao) VALUES
("Warner Bros. Pictures", "1923-04-04", NULL, "Parte da Warner Bros. Discovery, é um dos 'Big Five' estúdios americanos. Responsável por franquias icônicas como 'Harry Potter', 'O Senhor dos Anéis' e o universo da DC Comics."),

("Universal Pictures", "1912-04-30", NULL, "Fundado por Carl Laemmle, é um dos estúdios de cinema mais antigos do mundo. Conhecido pelos 'Monstros Clássicos', 'Jurassic Park' e as animações da Illumination e DreamWorks."),

("Paramount Pictures", "1912-05-08", NULL, "Fundado por Adolph Zukor, é o estúdio de cinema mais antigo em operação contínua em Hollywood. Produziu clássicos como 'O Poderoso Chefão' e franquias como 'Missão: Impossível'."),

("Sony Pictures", "1918-06-19", NULL, "Proprietária do histórico estúdio Columbia Pictures. É uma subsidiária da Sony Corporation e responsável por grandes franquias, incluindo 'Homem-Aranha' e 'Jumanji'."),

("A24", "2012-08-20", NULL, "Produtora e distribuidora independente americana conhecida por seus filmes de autor e aclamação crítica, como 'Moonlight', 'Hereditário' e 'Tudo em Todo Lugar ao Mesmo Tempo'."),

("Lionsgate", "1997-04-28", NULL, "Uma empresa de entretenimento canadense-americana. Conhecida por produzir e distribuir franquias de grande sucesso como 'Jogos Vorazes', 'John Wick' e 'Crepúsculo'."),

("Pixar Animation Studios", "1986-02-03", NULL, "Estúdio de animação CGI pioneiro, atualmente uma subsidiária da Disney. Famoso mundialmente por criar filmes aclamados como 'Toy Story', 'Up - Altas Aventuras' e 'Divertida Mente'."),

("Studio Ghibli", "1985-06-15", NULL, "Estúdio de animação japonês co-fundado por Hayao Miyazaki e Isao Takahata. Reverenciado por suas obras-primas artísticas, como 'A Viagem de Chihiro' e 'Meu Amigo Totoro'."),

("Netflix", "1997-08-29", NULL, "Originalmente um serviço de aluguel de DVDs, tornou-se uma gigante do streaming e uma das maiores produtoras de conteúdo original do mundo, criando séries e filmes premiados.");

SELECT * FROM tbl_produtora;

CREATE TABLE tbl_ator (
	id_ator 			INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome				VARCHAR(100) NOT NULL,
	data_nascimento 	DATE NOT NULL,
	data_falecimento 	DATE NULL,
	is_ativo 			BOOLEAN NOT NULL,
	biografia 			TEXT NULL,
	foto				TEXT NOT NULL
);

INSERT INTO tbl_ator (nome, data_nascimento, data_falecimento, is_ativo, biografia, foto) VALUES("Jack Black", "1969-08-28", NULL, true, "Thomas Jacob Black ou apenas Jack Black, é um ator, comediante, compositor 
e músico americano. Nascido em Santa Monica na Califórnia, Jack é filho de dois engenheiros de satélite que se separaram quando ele tinha 10 anos de idade. 
Após frequentar diferentes instituições de ensino fora do sistema tradicional, ele começou a ter aulas de teatro na escola Crossroads. Após isso, ele foi para
 a Universidade da Califórnia, em Los Angeles, que largou durante seu segundo ano para se dedicar ao mundo do entretenimento. No entanto, se juntou a um grupo 
 de teatro fundado por estudantes da faculdade, onde conheceu o ator e cineasta Tim Robbins, que o convidou para participar de seu filme Bob Roberts (1992), 
 estréia de Black nos cinemas.", "https://static.independent.co.uk/2024/09/06/11/MixCollage-06-Sep-2024-11-08-AM-5516.jpg?quality=75&width=1250&crop=3%3A2%2Csmart&auto=webp");

INSERT INTO tbl_ator (nome, data_nascimento, data_falecimento, is_ativo, biografia, foto) VALUES
("Tom Hanks", "1956-07-09", NULL, true, 
"Thomas Jeffrey Hanks é um ator e cineasta americano. Conhecido por seus papéis cômicos e dramáticos, é um dos atores mais populares e reconhecidos de todos os tempos. Vencedor de dois Oscars de Melhor Ator por 'Filadélfia' e 'Forrest Gump'.", 
"https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRmS5uBD5soTl5lorjNgIXc4qlNExKn3reFKOizkOVDTP7bcFDAhpzZGP9fNRIx-SmI2UAp5U_8es8ZKrTojUawyxjEWjQzQyGC5PDIIOI2Qg"),

("Meryl Streep", "1949-06-22", NULL, true, 
"Mary Louise 'Meryl' Streep é uma atriz americana. Frequentemente descrita como a 'melhor atriz de sua geração', Streep é conhecida por sua versatilidade e adaptação de sotaques. Ela detém o recorde de 21 indicações ao Oscar, tendo vencido três.", 
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCF3ZI4hLTp0uC6q1cxhhqcEg59a-XXtSb4PUoD99AedoZYfaTk-yMV0B-RNfM5iGUYT03ojYA73YYl5yR-IijIrkoLBkHmHaA9KQ58HrKtw"),

("Leonardo DiCaprio", "1974-11-11", NULL, true, 
"Leonardo Wilhelm DiCaprio é um ator e produtor americano. Conhecido por seus papéis em filmes aclamados e de grande orçamento, ganhou aclamação mundial por 'Titanic' e venceu o Oscar de Melhor Ator por 'O Regresso'.", 
"https://s2-oglobo.glbimg.com/KUDi0X1z2TLbomgdMle4NNU3g3E=/0x0:2862x1908/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2023/x/3/xjrEmIT1u7EkzHAv8z1w/95380403-files-in-this-file-photo-us-actor-leonardo-dicaprio-arrives-for-the-92nd-oscars-at-the.jpg"),

("Scarlett Johansson", "1984-11-22", NULL, true, 
"Scarlett Ingrid Johansson é uma atriz americana. Foi a atriz mais bem paga do mundo em 2018 e 2019. Ela é mundialmente famosa por interpretar a Viúva Negra no Universo Cinematográfico Marvel e por filmes como 'Encontros e Desencontros'.", 
"https://m.media-amazon.com/images/M/MV5BMTM3OTUwMDYwNl5BMl5BanBnXkFtZTcwNTUyNzc3Nw@@._V1_.jpg"),

("Denzel Washington", "1954-12-28", NULL, true, 
"Denzel Hayes Washington Jr. é um ator, diretor e produtor americano. Conhecido por suas atuações poderosas, ele recebeu dois Oscars: Melhor Ator Coadjuvante por 'Tempo de Glória' e Melhor Ator por 'Dia de Treinamento'.", 
"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRPdiEIesPAwYReQFVY1U59718Zq0Gpcr-JLDC1h9ymk0Ze9XKOPEq5zCNbbuWDgzFCNOnvkGqM-L-2EBkwH_erwIi_D0Zsg9XqyvYLMjRo4A"),

("Audrey Hepburn", "1929-05-04", "1993-01-20", false, 
"Audrey Hepburn foi uma atriz e humanitária britânica. Considerada um ícone de estilo e elegância, ela estrelou clássicos como 'A Princesa e o Plebeu' (pelo qual ganhou o Oscar) e 'Bonequinha de Luxo'. Foi embaixadora da UNICEF.", 
"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT4aExtVzE6m_uZ0cikwiyGlzn0OcjRzjJ2VsQsbv7fzCEyOPqtrVeoHW-8CvqqlC3iwk92mgvH0HyBWC-H3Q7fC0YyMlsFIKWGRYPigGAh"),

("Robert De Niro", "1943-08-17", NULL, true, 
"Robert Anthony De Niro Jr. é um ator, produtor e diretor americano. Conhecido por suas colaborações com Martin Scorsese, é um dos atores mais aclamados de sua geração, vencedor de dois Oscars por 'O Poderoso Chefão II' e 'Touro Indomável'.", 
"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQZt2NWRAdvs9D_EdCQOFKZFpIp1k0EJMI4M5ZaNDv3Ct-nEttWtF2c63dsv4c8nkJub2zhsaPHBYAB1KVnHj790mG0NoNr-ShkwD3w3I6FtQ"),

("Margot Robbie", "1990-07-02", NULL, true, 
"Margot Elise Robbie é uma atriz e produtora australiana. Ganhou destaque internacional em 'O Lobo de Wall Street'. É conhecida por papéis como Arlequina no universo DC e como a protagonista de 'Barbie', um fenômeno cultural e de bilheteria.", 
"https://upload.wikimedia.org/wikipedia/commons/5/57/SYDNEY%2C_AUSTRALIA_-_JANUARY_23_Margot_Robbie_arrives_at_the_Australian_Premiere_of_%27I%2C_Tonya%27_on_January_23%2C_2018_in_Sydney%2C_Australia_%2828074883999%29_%28cropped_2%29.jpg"),

("Keanu Reeves", "1964-09-02", NULL, true, 
"Keanu Charles Reeves é um ator e músico canadense. Nascido em Beirute, ele ganhou fama mundial por seus papéis nas franquias 'Matrix' (como Neo) e 'John Wick' (como o personagem-título), tornando-se um ícone do cinema de ação.", 
"https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTDTBkgraOW5zEY0B3yrUOXYY-7PfZb4-AxlCqqE_DudMtf1XdxwYxUGe1RRzMDG13kJvclYuQetBu1f_6x5Ja4aaS7fnZxPGYwqL764Hf31LAMlOfCoQZF4oyke7gvzaubviUPESWF5SM");

SELECT * FROM tbl_ator;
