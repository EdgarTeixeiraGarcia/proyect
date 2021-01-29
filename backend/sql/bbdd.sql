use proyecto;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    nif VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    birthdate DATE NOT NULL,
    phone VARCHAR(50),
    perfil_photo VARCHAR(200),
    rol ENUM('player','manager'),
    country INT UNSIGNED,
    FOREIGN KEY (country) REFERENCES countries(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clubs (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    club_name VARCHAR(300)
);

CREATE TABLE IF NOT EXISTS skills (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    skill VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS countries (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    country VARCHAR(100)
    
);

CREATE TABLE IF NOT EXISTS players (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    height VARCHAR(20),
    dominant_leg VARCHAR(20),
    main_position ENUM('Portero','Lateral derecho','Defensa central','Lateral izquierdo',
    'Centrocampista defensivo','Medio izquierdo','Medio derecho','Centrocampista ofensivo',
    'Extremo izquierdo','Extremo derecho','Segundo delantero','Delantero centro'),
    secundary_position ENUM('Portero','Lateral derecho','Defensa central','Lateral izquierdo',
    'Centrocampista defensivo','Medio izquierdo','Medio derecho','Centrocampista ofensivo',
    'Extremo izquierdo','Extremo derecho','Segundo delantero','Delantero centro'),
    id_user INT UNSIGNED,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    property_of INT UNSIGNED,
    FOREIGN KEY (property_of) REFERENCES clubs(id) ON DELETE CASCADE,
    actual_team INT UNSIGNED,
    FOREIGN KEY (actual_team) REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS players_skills(
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_player INT UNSIGNED,
    FOREIGN KEY (id_player) REFERENCES players(id) ON DELETE CASCADE,
    id_skill INT UNSIGNED,
    FOREIGN KEY (id_skill) REFERENCES skills(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS managers (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    agency VARCHAR(100),
    id_user INT UNSIGNED,
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS players_managers (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    contract_start_date DATE,
    contract_end_date DATE,
    offer BOOLEAN DEFAULT FALSE,
    date_of_offer DATE,
    id_player INT UNSIGNED,
    FOREIGN KEY (id_player) REFERENCES players(id) ON DELETE CASCADE,
    id_manager INT UNSIGNED,
    FOREIGN KEY (id_manager) REFERENCES managers(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS multimedia_contents (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tittle VARCHAR(100),
    upload_date DATE,
    description VARCHAR(400),
    content VARCHAR(400),
    type VARCHAR(50),
    id_player INT UNSIGNED,
    FOREIGN KEY (id_player) REFERENCES players(id) ON DELETE CASCADE
);
SET FOREIGN_KEY_CHECKS = 1;