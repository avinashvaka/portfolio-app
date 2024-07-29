-- Sample Portfolio Data
INSERT INTO portfolio (name, ticker, exchange, isin, website) VALUES
                                                                  ('Apple Inc.', 'AAPL', 'NASDAQ', 'US0378331005', 'http://www.apple.com'),
                                                                  ('British Airways Plc', 'BAIRY', 'Pink Sheets', 'US1104193065', NULL),
                                                                  ('Heineken NV', 'HEIA', 'Euronext Amsterdam', 'NL0000009165', NULL),
                                                                  ('Panasonic Corp', '6752', 'Tokyo Stock Exchange', 'JP3866800000', 'http://www.panasonic.co.jp'),
                                                                  ('Porsche Automobil', 'PAH3', 'Deutsche Börse', 'DE000PAH0038', 'https://www.porsche.com');

-- Sample Users Data
INSERT INTO users (username, password) VALUES
    ('user', '$2a$10$pv2T71scpBlRcmIY5m88C.Pi6Iu7UtfE6OreL9Or5zMvaUD2xHmae');
