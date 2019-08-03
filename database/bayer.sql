create database BAYER_CHALLENGE;
GO;

USE BAYER_CHALLENGE;
GO;

create table CANDIDATO(
cod_candidato int primary key identity(1,1),
nome varchar(30),
sobrenome varchar(30),
data_nascimento date,
cpf varchar(11),
email varchar(30),
telefone varchar(20),
celular varchar(20),
endereco_numero int,
cod_localidade int,
);
GO;

create table LOCALIDADE(
cod_localidade int primary key identity(1,1),
cep varchar(8),
bairro varchar(50),
localidade varchar(50),
logradouro varchar(50),
uf varchar(2)
);

create table PI_BIGFIVE(
cod_personality int primary key identity(1,1),
abertura decimal,
escrupulosidade decimal,
extroversao decimal,
amabilidade decimal,
faixa_emocional decimal,
cod_candidato int
);
GO;

create table PI_NEEDS(
cod_needs int primary key identity(1,1),
desafio decimal,
retraimento decimal,
curiosidade decimal,
empolgacao decimal,
harmonia decimal, 
ideal decimal, 
liberdade decimal,
amor decimal,
natureza_pratica decimal,
expressao_personalidade decimal,
estabilidade decimal,
estrutura decimal,
cod_candidato int
);
GO;

create table PI_VALUES(
cod_values int primary key identity(1,1),
conservacao decimal,
abertura_mudanca decimal,
hedonismo decimal,
autocrescimento decimal,
autotranscendencia decimal,
cod_candidato int
);
GO;

ALTER TABLE PI_BIGFIVE ADD FOREIGN KEY(cod_candidato) REFERENCES CANDIDATO (cod_candidato);
GO;
ALTER TABLE PI_VALUES ADD FOREIGN KEY(cod_candidato) REFERENCES CANDIDATO (cod_candidato);
GO;
ALTER TABLE PI_NEEDS ADD FOREIGN KEY(cod_candidato) REFERENCES CANDIDATO (cod_candidato);
GO;
ALTER TABLE CANDIDATO ADD FOREIGN KEY(cod_localidade) REFERENCES LOCALIDADE (cod_localidade);



