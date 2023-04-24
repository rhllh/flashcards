-- drop database if exists miniproject;
-- create database miniproject;
use railway;

-- User table
-- drop table if exists set_data;
-- drop table if exists set_topics;
-- drop table if exists topic;
-- drop table if exists card;
-- drop table if exists card_set;
drop table if exists user;
create table user(
    id varchar(8) not null,
    username varchar(128) not null,
    password varchar(256) not null,
    email varchar(128) not null,
    created_date datetime,

    primary key(id)
);
insert into user(id, username, password, email, created_date)
            values("mk2u737d", "rhllh", sha("rhllh"), "rahillah.yusri@gmail.com", curdate());

-- Metadata of a card set
drop table if exists card_set;
create table card_set(
    id int auto_increment,
    creator_id varchar(128) not null,
    title varchar(128) not null,
    description text,
    created_date date,
    last_review date,
    last_review_score float,

    primary key(id),
    foreign key(creator_id) references user(id)
);
insert into card_set(creator_id, title, description, created_date)
        values("mk2u737d", "Physics Definitions", "For O Levels", curdate());
insert into card_set(creator_id, title, description, created_date)
		values("mk2u737d", "QM2", "For Finals", curdate());

-- Card table
drop table if exists card;
create table card(
    id int auto_increment,
    set_id int not null,
    presented text not null,
    hidden text not null,
    image_file text,
    created_date datetime,
    updated_date datetime,

    primary key(id),
    foreign key(set_id) references card_set(id)
);
insert into card(set_id, presented, hidden, created_date)
    values(1, "Conservation of Energy", 
        "Energy cannot be created or destroyed. It can only be converted from one form to another", now());
insert into card(set_id, presented, hidden, created_date)
    values(1, "Newton's Second Law of Motion", 
        "The acceleration of an object in motion depends on its mass and the force acting on it", now());
insert into card(set_id, presented, hidden, created_date)
    values(1, "Principle of Moments", 
        "For a body to be at equilibrium, the sum of clockwise moments at a point is equal to the sum of anti-clockwise moments about the same point", now());
insert into card(set_id, presented, hidden, created_date)
    values(1, "Vector", 
        "A vector quantity is a quantity that is fully described by both magnitude and direction.", now());
insert into card(set_id, presented, hidden, created_date)
    values(1, "Work", 
        "When a force acts upon an object to cause a displacement of the object, it is said that work was done upon the object.", now());
insert into card(set_id, presented, hidden, created_date)
    values(1, "Newton's First Law of Motion", 
        "If a body is at rest or moving at a constant speed in a straight line, it will remain at rest or keep moving in a straight line at constant speed unless it is acted upon by a force.", now());