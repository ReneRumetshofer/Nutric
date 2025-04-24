CREATE SEQUENCE tracking_entry_id_seq START WITH 1000 INCREMENT BY 1;

CREATE TABLE tracking_entry (
    id BIGINT NOT NULL DEFAULT nextval('tracking_entry_id_seq'),
    uuid UUID NOT NULL,
    day_id BIGINT NOT NULL,
    meal_type VARCHAR(255) NOT NULL,
    product_id BIGINT NOT NULL,
    amount DECIMAL(10, 3) NOT NULL,
    base_unit VARCHAR(255) NOT NULL,
    calories_per_base_unit DECIMAL(10, 3) NOT NULL,
    carbs_per_base_unit DECIMAL(10, 3) NOT NULL,
    protein_per_base_unit DECIMAL(10, 3) NOT NULL,
    fat_per_base_unit DECIMAL(10, 3) NOT NULL,

    CONSTRAINT pk_tracking_entry PRIMARY KEY (id),
    CONSTRAINT fk_tracking_entry_product FOREIGN KEY (product_id) REFERENCES product(id),
    CONSTRAINT fk_tracking_entry_day FOREIGN KEY (day_id) REFERENCES day(id)
);