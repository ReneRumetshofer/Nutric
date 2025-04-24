CREATE SEQUENCE product_id_seq START WITH 1000 INCREMENT BY 1;

CREATE TABLE product(
    id BIGINT NOT NULL DEFAULT nextval('product_id_seq'),
    uuid UUID NOT NULL,
    external_uuid UUID,
    name VARCHAR(255) NOT NULL,
    producer VARCHAR(255) NOT NULL,
    serving_unit VARCHAR(255),
    base_unit_amount DECIMAL(10, 3),
    base_unit VARCHAR(255) NOT NULL,
    calories_per_base_unit DECIMAL(10, 3) NOT NULL,
    carbs_per_base_unit DECIMAL(10, 3) NOT NULL,
    protein_per_base_unit DECIMAL(10, 3) NOT NULL,
    fat_per_base_unit DECIMAL(10, 3) NOT NULL,
    is_customized BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT pk_product PRIMARY KEY (id)
)