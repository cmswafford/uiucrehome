CREATE DATABASE uiucsd DEFAULT CHARACTER SET = utf8 DEFAULT COLLATE = utf8_general_ci;
USE uiucsd;

CREATE TABLE categories ( category_id INT UNSIGNED AUTO_INCREMENT
                         ,category_name VARCHAR(255) DEFAULT NULL
                         ,PRIMARY KEY (category_id)
                         ) ENGINE=InnoDB;
INSERT INTO categories( category_name ) VALUES ('lights'), ('appliances'), ('electronics');
/*
  lights = all [monitored] lights from every room
  appliances = refrigerator, freezer, 
  electronics = TV, server, computer, tablet
*/

CREATE TABLE rooms ( room_id INT UNSIGNED AUTO_INCREMENT
                    ,room_name VARCHAR(255) DEFAULT NULL
                    ,PRIMARY KEY (room_id)
                   ) ENGINE=InnoDB;
INSERT INTO rooms( room_name ) VALUES ('bathroom'), ('bedroom'), ('living room'), ('kitchen'), ('office'), ('outside');


CREATE TABLE devices ( device_id INT UNSIGNED AUTO_INCREMENT
                      ,category_id INT UNSIGNED DEFAULT NULL
                      ,room_id INT UNSIGNED DEFAULT NULL
                      ,off_or_on TINYINT(1) DEFAULT 0
                      ,metadata TEXT DEFAULT ''
                      ,FOREIGN KEY (category_id) REFERENCES categories(category_id)
                      ,FOREIGN KEY (room_id) REFERENCES rooms(room_id)
                      ,PRIMARY KEY(device_id)
                     ) ENGINE=InnoDB;
INSERT INTO devices( category_id, room_id, metadata )
            VALUES ( 2, 4, NULL /* Serialized associative array in format of $kField => $vValue */ )
                  ; 
/* Some metadata fields might include:
     - manufacturer
     - lifetime (probably in W*h e.g. to show how much life a lightbulb has left) 
*/


CREATE TABLE power_logs ( power_log_id INT UNSIGNED AUTO_INCREMENT
                         ,device_id INT UNSIGNED DEFAULT NULL
                         ,value FLOAT DEFAULT NULL
                         ,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                         ,PRIMARY KEY (power_log_id)
                         ,FOREIGN KEY (device_id) REFERENCES devices(device_id)
                        ) ENGINE=InnoDB;

CREATE TABLE temperature_logs ( temperature_log_id INT UNSIGNED AUTO_INCREMENT
                               ,device_id INT UNSIGNED DEFAULT NULL
                               ,value FLOAT DEFAULT NULL
                               ,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                               ,PRIMARY KEY (temperature_log_id)
                               ,FOREIGN KEY (device_id) REFERENCES devices(device_id)
                              ) ENGINE=InnoDB;

CREATE TABLE water_logs ( water_log_id INT UNSIGNED AUTO_INCREMENT
                         ,room_id INT UNSIGNED DEFAULT NULL
                         ,value FLOAT DEFAULT NULL
                         ,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                         ,PRIMARY KEY (water_log_id)
                         ,FOREIGN KEY (device_id) REFERENCES devices(device_id)
                        ) ENGINE=InnoDB;
