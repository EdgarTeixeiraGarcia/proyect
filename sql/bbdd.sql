use pruebas;

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
    rol ENUM('player','manager')
);

CREATE TABLE IF NOT EXISTS players (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    height VARCHAR(20),
    weight VARCHAR(20),
    place_of_birth VARCHAR(50),
    nationality VARCHAR(50),
    national_team VARCHAR(50),
    property_of VARCHAR(80),
    actual_team VARCHAR(80),
    dominant_leg VARCHAR(20),
    main_position VARCHAR(20),
    secundary_position VARCHAR(20),
    skills VARCHAR(50),
    id_user INT UNSIGNED,
    FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS managers (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    agency VARCHAR(100),
    id_user INT UNSIGNED,
    FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS players_managers (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    contract_start_date DATE,
    contract_end_date DATE,
    offer BOOLEAN DEFAULT FALSE,
    date_of_offer DATE,
    id_player INT UNSIGNED,
    FOREIGN KEY (id_player) REFERENCES players(id),
    id_manager INT UNSIGNED,
    FOREIGN KEY (id_manager) REFERENCES managers(id)
);

CREATE TABLE IF NOT EXISTS multimedia_contents (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    tittle VARCHAR(100),
    upload_date DATE,
    description VARCHAR(400),
    content VARCHAR(400),
    type VARCHAR(50),
    id_player INT UNSIGNED,
    FOREIGN KEY (id_player) REFERENCES players(id)
);

CREATE TABLE IF NOT EXISTS skills (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    skill VARCHAR(100),
    id_player INT UNSIGNED,
    FOREIGN KEY (id_player) REFERENCES players(id)
);