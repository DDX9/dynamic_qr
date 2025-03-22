create table dynamic_qr(
    qr_detail_id bigint, 
    qr_code varchar(50),
    course_id bigint,
    destination varchar(255),
    remark varchar(50)
);

-- -- future phase
-- create table courses(
--     id bigserial,
--     title varchar(50),
--     "description" varchar(255)
-- );

-- create table customers(
--     "name" varchar(50),
--     phone varchar(25),
--     email varchar(25),
--     "address" varchar(100),
-- )

-- create table customer_purchases(
--     customer_id
-- )
-- create table delivery_orders()


-- create index dynamic_qr_qr_code_index on dynamic_qr(qr_code);
-- create index dynamic_qr_qr_detail_id_index on dynamic_qr(qr_detail_id);