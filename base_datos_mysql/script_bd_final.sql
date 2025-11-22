CREATE DATABASE proyecto_pw;
USE proyecto_pw;

-- Crear tablas
-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profilePicture VARCHAR(255),         -- URL o ruta de la imagen
  role ENUM('user', 'streamer') DEFAULT 'user',
  isStreamer BOOLEAN DEFAULT FALSE,
  gems INT DEFAULT 1000,
  level INT DEFAULT 1,
  points INT DEFAULT 0,
  pointsToNextLevel INT DEFAULT 100,
  HorasTotales INT DEFAULT 0
);

-- Tabla de productos
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  price INT NOT NULL,
  image VARCHAR(255),
  type VARCHAR(50) NOT NULL
);

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Tabla de donaciones
CREATE TABLE IF NOT EXISTS donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  donorId INT NOT NULL,
  streamerId INT NOT NULL,
  streamerName VARCHAR(100),
  amount INT NOT NULL,
  message VARCHAR(255),
  isAnonymous BOOLEAN DEFAULT FALSE,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  createdAt DATETIME,
  updatedAt DATETIME
);

-- Tabla de streams
CREATE TABLE IF NOT EXISTS streams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  config JSON,
  startTime DATETIME,
  endTime DATETIME,
  status VARCHAR(20) DEFAULT 'activo',
  streamerId INT NOT NULL
);

-- Tabla de compras
CREATE TABLE IF NOT EXISTS purchases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  productId INT NOT NULL,
  purchaseTime DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de mensajes de chat
CREATE TABLE IF NOT EXISTS chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  streamId INT NOT NULL,
  userId INT NOT NULL,
  message TEXT NOT NULL,
  sentAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de niveles
CREATE TABLE IF NOT EXISTS levels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  level INT NOT NULL,
  achievedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gem_topups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  amount INT NOT NULL,
  method VARCHAR(50) NOT NULL, -- 'yape', 'tarjeta', etc.
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id)
);


INSERT INTO users (name, email, password, profilePicture, role, isStreamer, gems, level, points, pointsToNextLevel)
VALUES
('peoplelite', 'peoplelite@email.com', '123456', 'https://img.freepik.com/premium-vector/young-gamer-girl-avatar-streaming-with-colored-hair-gaming-headset_704771-3536.jpg', 'streamer', TRUE, 1000, 1, 0, 100),
('eldonstark82', 'eldonstark82@email.com', '123456', 'https://images.insmind.com/market-operations/market/side/689bba0a91114c2a8504aaa0d24315cd/1739863420380.jpg?x-oss-process=image/format,webp', 'streamer', TRUE, 1000, 1, 0, 100),
('bububuenas', 'bububuenas@email.com', '123456', 'https://cdna.artstation.com/p/assets/images/images/036/064/094/large/noa-garzon-pp-twitch-con-fondo.jpg?1616623918', 'streamer', TRUE, 1000, 1, 0, 100),
('microbusero', 'microbusero@email.com', '123456', 'https://cdna.artstation.com/p/assets/images/images/038/833/284/large/heleca-twitch-avatar-sasori-3.jpg?1624208447', 'streamer', TRUE, 1000, 1, 0, 100),
('nezumivy', 'nezumivy@email.com', '123456', 'https://img.freepik.com/premium-vector/young-gamer-girl-avatar-streaming-with-colored-hair-gaming-headset_704771-3536.jpg', 'streamer', TRUE, 1000, 1, 0, 100),
('gamer_pro', 'gamer_pro@email.com', '123456', 'https://n9.cl/onkymf', 'streamer', TRUE, 1000, 1, 0, 100);

INSERT INTO products (name, description, price, image, type)
VALUES
('Mouse Gamer', 'Mouse RGB para gaming', 250, '/images/mouse.png', 'hardware'),
('Teclado Mecánico', 'Teclado con switches azules', 400, '/images/teclado.png', 'hardware'),
('Silla Ergonómica', 'Silla para streamers', 1200, '/images/silla.png', 'mobiliario'),
('Webcam HD', 'Cámara para streaming', 600, '/images/webcam.png', 'hardware'),
('Micrófono Pro', 'Micrófono condensador', 800, '/images/microfono.png', 'hardware'),
('Tarjeta Steam', 'Gift card Steam $20', 20, '/images/steam.png', 'giftcard'),
('Tarjeta Xbox', 'Gift card Xbox $25', 25, '/images/xbox.png', 'giftcard'),
('Tarjeta PlayStation', 'Gift card PSN $10', 10, '/images/psn.png', 'giftcard'),
('Auriculares', 'Auriculares inalámbricos', 350, '/images/auriculares.png', 'hardware'),
('Luz LED', 'Luz para setup', 150, '/images/luz.png', 'accesorio');

INSERT INTO categories (name, description)
VALUES
('VALORANT', 'Shooter táctico multijugador'),
('Charlando', 'Streams de conversación y comunidad'),
('League of Legends', 'MOBA competitivo de estrategia'),
('Counter-Strike', 'Shooter clásico por equipos'),
('Grand Theft Auto V', 'Sandbox de mundo abierto y acción'),
('Fortnite', 'Battle Royale con construcción'),
('Minecraft', 'Sandbox de construcción y aventuras'),
('Apex Legends', 'Battle Royale de héroes y escuadrones'),
('Call of Duty: Black Ops 7', 'Shooter de acción y campaña'),
('EA Sports FC 26', 'Simulador de fútbol'),
('IRL', 'Transmisiones de la vida real'),
('Overwatch 2', 'Shooter de héroes en equipos'),
('Marvel Rivals', 'Juego de acción con personajes Marvel'),
('Dead by Daylight', 'Survival horror multijugador'),
('Clash Royale', 'Juego de estrategia en tiempo real'),
('Megabonk', 'Juego de acción y plataformas'),
('SILENT HILL f', 'Survival horror psicológico'),
('ROBLOX', 'Plataforma de juegos y creación'),
('Rocket League', 'Fútbol con autos'),
('Rust', 'Supervivencia en mundo abierto'),
('Genshin Impact', 'RPG de mundo abierto y aventuras'),
('Tom Clancy''s Rainbow', 'Shooter táctico en equipos'),
('Call of Duty: Warzone', 'Battle Royale de acción'),
('PUGB: BATTLEGROUNDS', 'Battle Royale realista'),
('Red Dead Redemption II', 'Aventura y acción en el viejo oeste'),
('Dota 2', 'MOBA competitivo de estrategia'),
('PEAK', 'Juego de acción y reflejos');

INSERT INTO donations (donorId, streamerId, streamerName, amount, message, isAnonymous, date)
VALUES
(1, 2, 'andrew', 100, '¡Sigue así!', FALSE, '2025-11-19 10:00:00'),
(3, 4, 'jose', 200, 'Gran stream!', TRUE, '2025-11-19 11:00:00'),
(5, 6, 'pedro', 150, 'Me encanta tu contenido', FALSE, '2025-11-19 12:00:00'),
(7, 8, 'carlos', 300, 'Eres el mejor', TRUE, '2025-11-19 13:00:00'),
(9, 10, 'diego', 50, 'Saludos desde Perú', FALSE, '2025-11-19 14:00:00'),
(2, 4, 'jose', 120, 'Buen juego', FALSE, '2025-11-19 15:00:00'),
(6, 8, 'carlos', 180, 'Gracias por el consejo', TRUE, '2025-11-19 16:00:00'),
(10, 2, 'andrew', 90, 'Suerte en el torneo', FALSE, '2025-11-19 17:00:00'),
(4, 6, 'pedro', 210, '¡Qué setup!', TRUE, '2025-11-19 18:00:00'),
(8, 10, 'diego', 60, 'Recomiéndame un mouse', FALSE, '2025-11-19 19:00:00');

INSERT INTO streams (title, description, config, startTime, endTime, status, streamerId)
VALUES
('Stream de prueba', 'Jugando Minecraft', '{"quality":"1080p"}', '2025-11-19 10:00:00', '2025-11-19 12:00:00', 'activo', 2),
('Charla tech', 'Hablando de hardware', '{"quality":"720p"}', '2025-11-19 13:00:00', '2025-11-19 14:30:00', 'finalizado', 4),
('Setup tour', 'Mostrando mi setup', '{"quality":"1080p"}', '2025-11-19 15:00:00', '2025-11-19 16:00:00', 'activo', 6),
('Unboxing', 'Abriendo regalos', '{"quality":"720p"}', '2025-11-19 17:00:00', '2025-11-19 18:00:00', 'finalizado', 8),
('Speedrun', 'Speedrun de Mario', '{"quality":"1080p"}', '2025-11-19 19:00:00', '2025-11-19 20:00:00', 'activo', 10),
('Preguntas y respuestas', 'Respondiendo dudas', '{"quality":"720p"}', '2025-11-19 21:00:00', '2025-11-19 22:00:00', 'finalizado', 2),
('Review hardware', 'Probando mouse gamer', '{"quality":"1080p"}', '2025-11-19 23:00:00', '2025-11-20 00:00:00', 'activo', 4),
('Tutorial OBS', 'Configurando OBS', '{"quality":"720p"}', '2025-11-20 01:00:00', '2025-11-20 02:00:00', 'finalizado', 6),
('Gaming night', 'Jugando con subs', '{"quality":"1080p"}', '2025-11-20 03:00:00', '2025-11-20 04:00:00', 'activo', 8),
('Setup económico', 'Setup barato', '{"quality":"720p"}', '2025-11-20 05:00:00', '2025-11-20 06:00:00', 'finalizado', 10);

INSERT INTO purchases (userId, productId, purchaseTime)
VALUES
(1, 1, '2025-11-19 10:05:00'),
(2, 2, '2025-11-19 11:10:00'),
(3, 3, '2025-11-19 12:15:00'),
(4, 4, '2025-11-19 13:20:00'),
(5, 5, '2025-11-19 14:25:00'),
(6, 6, '2025-11-19 15:30:00'),
(7, 7, '2025-11-19 16:35:00'),
(8, 8, '2025-11-19 17:40:00'),
(9, 9, '2025-11-19 18:45:00'),
(10, 10, '2025-11-19 19:50:00');

INSERT INTO chat_messages (streamId, userId, message, sentAt)
VALUES
(1, 1, '¡Hola a todos!', '2025-11-19 10:10:00'),
(2, 2, '¿Qué hardware recomiendas?', '2025-11-19 11:15:00'),
(3, 3, 'Buen setup!', '2025-11-19 12:20:00'),
(4, 4, '¿Dónde compraste la silla?', '2025-11-19 13:25:00'),
(5, 5, 'Me gusta tu stream', '2025-11-19 14:30:00'),
(6, 6, '¿Usas OBS?', '2025-11-19 15:35:00'),
(7, 7, '¿Qué mouse usas?', '2025-11-19 16:40:00'),
(8, 8, 'Saludos desde México', '2025-11-19 17:45:00'),
(9, 9, '¿Harás sorteo?', '2025-11-19 18:50:00'),
(10, 10, '¡Gran contenido!', '2025-11-19 19:55:00');


INSERT INTO levels (userId, level, achievedAt)
VALUES
(1, 1, '2025-11-19 10:15:00'),
(2, 2, '2025-11-19 11:20:00'),
(3, 1, '2025-11-19 12:25:00'),
(4, 3, '2025-11-19 13:30:00'),
(5, 1, '2025-11-19 14:35:00'),
(6, 2, '2025-11-19 15:40:00'),
(7, 1, '2025-11-19 16:45:00'),
(8, 2, '2025-11-19 17:50:00'),
(9, 1, '2025-11-19 18:55:00'),
(10, 2, '2025-11-19 20:00:00');
SHOW DATABASES;
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM donations;
SELECT * FROM categories;
SELECT * FROM streams;
SELECT * FROM purchases;
SELECT * FROM chat_messages;
SELECT * FROM levels;
SELECT * FROM gem_topups;


DROP DATABASE proyecto_pw;
ALTER TABLE Donations ADD COLUMN createdAt DATETIME;
ALTER TABLE Donations ADD COLUMN updatedAt DATETIME;
ALTER TABLE Donations ADD COLUMN streamerName VARCHAR(100);