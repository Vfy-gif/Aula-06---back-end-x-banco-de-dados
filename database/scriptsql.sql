
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