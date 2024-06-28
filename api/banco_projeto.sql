-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28/06/2024 às 13:37
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `banco_projeto`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `colaboradores`
--

CREATE TABLE `colaboradores` (
  `id_colaborador` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(16) NOT NULL,
  `contato_1` varchar(14) DEFAULT NULL,
  `contato_2` varchar(15) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `sexo` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `colaboradores`
--

INSERT INTO `colaboradores` (`id_colaborador`, `nome`, `cpf`, `contato_1`, `contato_2`, `email`, `sexo`) VALUES
(1, 'ADMIN', '00000000000', '00000000000', '0000000000', 'admin@admin.com', 'M'),
(2, '', '', NULL, NULL, '', ''),
(3, '', '', NULL, NULL, '', ''),
(4, '', '', NULL, NULL, '', ''),
(5, '', '', NULL, NULL, '', ''),
(6, '', '', NULL, NULL, '', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `rl_users_colaboradores`
--

CREATE TABLE `rl_users_colaboradores` (
  `id_user` int(11) NOT NULL,
  `id_colaborador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `rl_users_colaboradores`
--

INSERT INTO `rl_users_colaboradores` (`id_user`, `id_colaborador`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6);

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(70) NOT NULL,
  `nivel` int(11) NOT NULL DEFAULT 1,
  `status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id_user`, `name`, `password`, `nivel`, `status`) VALUES
(1, 'admin', 'MzYzNTIyNDc=', 2, 1),
(2, 'glaucos', 'UmxOcE5FeFg=', 1, 0),
(3, 'luis', 'V0hJM1oydHk=', 1, 1),
(4, 'marcos vinicius', 'aEZIc0JJ', 1, 0),
(5, 'luiz', 'VzRKM05C', 1, 1),
(6, 'glauco', 'VW14T2NFNUZlRmc9', 1, 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `colaboradores`
--
ALTER TABLE `colaboradores`
  ADD PRIMARY KEY (`id_colaborador`);

--
-- Índices de tabela `rl_users_colaboradores`
--
ALTER TABLE `rl_users_colaboradores`
  ADD PRIMARY KEY (`id_user`,`id_colaborador`),
  ADD UNIQUE KEY `id_user` (`id_user`),
  ADD UNIQUE KEY `id_colaborador` (`id_colaborador`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `colaboradores`
--
ALTER TABLE `colaboradores`
  MODIFY `id_colaborador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `rl_users_colaboradores`
--
ALTER TABLE `rl_users_colaboradores`
  ADD CONSTRAINT `rl_users_colaboradores_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `rl_users_colaboradores_ibfk_2` FOREIGN KEY (`id_colaborador`) REFERENCES `colaboradores` (`id_colaborador`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
