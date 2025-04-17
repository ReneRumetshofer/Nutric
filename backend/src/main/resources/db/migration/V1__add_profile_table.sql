CREATE TABLE profile (
    user_uuid UUID NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    calorie_goal INT NOT NULL,
    weight DECIMAL(7,2) NOT NULL,
    carb_limit_grams INT NOT NULL,
    protein_limit_grams INT NOT NULL,
    fat_limit_grams INT NOT NULL,

    CONSTRAINT pk_profile PRIMARY KEY (user_uuid)
);