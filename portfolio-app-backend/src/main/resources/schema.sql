-- Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
                                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                         name VARCHAR(255) NOT NULL,
    ticker VARCHAR(10) NOT NULL,
    exchange VARCHAR(50) NOT NULL,
    isin VARCHAR(12) NOT NULL UNIQUE,
    website VARCHAR(255)
    );

-- Users Table
CREATE TABLE IF NOT EXISTS users (
                                     id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                     username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    );