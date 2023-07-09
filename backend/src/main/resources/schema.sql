create schema if not exists ukhinms;


-- Перед регистрацией пользователей выполнить, иначе выйдет ошибка о не существовании роли
insert into ukhinms.roles (name)
values ('ROLE_USER');
insert into ukhinms.roles (name)
values ('ROLE_ADMIN');

insert into ukhinms.statuses (name)
values ('EXECUTED');
insert into ukhinms.statuses (name)
values ('EXECUTED');
insert into ukhinms.statuses (name)
values ('IN_PROCESS');

insert into ukhinms.priorities (name)
values ('LOW');
insert into ukhinms.priorities (name)
values ('MEDIUM');
insert into ukhinms.priorities (name)
values ('HIGH');

insert into ukhinms.regularities (date_notify)
values ('2020-12-20 12:12:01');

