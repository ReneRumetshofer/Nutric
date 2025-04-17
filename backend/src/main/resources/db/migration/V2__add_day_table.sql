CREATE SEQUENCE day_id_seq START WITH 1000 INCREMENT BY 1;

CREATE TABLE day (
    id BIGINT NOT NULL DEFAULT nextval('day_id_seq'),
    day DATE NOT NULL,
    user_uuid UUID NOT NULL,
    calorie_goal INT NOT NULL,
    carb_limit_grams INT NOT NULL,
    protein_limit_grams INT NOT NULL,
    fat_limit_grams INT NOT NULL,

    CONSTRAINT pk_day PRIMARY KEY (id)
)