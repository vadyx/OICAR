use OICAR_Project
go

insert into LoginCredentials values('Mila', 'krmpotic123')
insert into LoginCredentials values('Robi', 'password')
insert into LoginCredentials values('BeastMaster64', 'pokemon')
insert into RegisteredUser values('Milica', 'Krmpotic', 'mkrmpotic@gmail.com', 1, 1, GETDATE())
insert into RegisteredUser values('Robert', 'MeDiro', 'robert.mediro@gmail.com', 2, 3, GETDATE())
insert into RegisteredUser values('Željko', 'Željkić', 'beastmaster@gmail.com', 3, 5, GETDATE())

create procedure SelectAllRegisteredUsers
as
select * from RegisteredUser
inner join LoginCredentials on RegisteredUser.LoginCredentialsID = LoginCredentials.IDLoginCredentials

create procedure SelectOneRegisteredUserByID
@id int
as
select * from RegisteredUser
inner join LoginCredentials on RegisteredUser.LoginCredentialsID = LoginCredentials.IDLoginCredentials
where RegisteredUser.IDRegisteredUser = @id


