create database OICAR_Project
go

use OICAR_Project
go

create table Country
(
	IDCountry int primary key identity,
	CountryName nvarchar(100) not null
)

create table Region
(
	IDRegion int primary key identity,
	RegionName nvarchar(100) not null,
	CountryID int not null,

	CONSTRAINT FK_Region_Country FOREIGN KEY (CountryID)
		REFERENCES Country(IDCountry)
)

create table City
(
	IDCity int primary key identity,
	CityName nvarchar(100) not null,
	RegionID int not null,

	CONSTRAINT FK_City_Region FOREIGN KEY (RegionID)
		REFERENCES Region(IDRegion)
)

create table LoginCredentials
(
	IDLoginCredentials int primary key identity,
	Username nvarchar(64) not null UNIQUE,
	Pwd nvarchar(max) not null
)

create table RegisteredUser
(
	IDRegisteredUser int primary key identity,
	FirstName nvarchar(100) not null,
	LastName nvarchar(100) not null,
	Email nvarchar(256) not null,
	LoginCredentialsID int not null,
	Rating decimal(3,2) not null,
	RegistrationDate date not null default GETDATE(),

	CONSTRAINT FK_User_LoginCredentials FOREIGN KEY (LoginCredentialsID)
		REFERENCES LoginCredentials(IDLoginCredentials)
)

create table VehicleType
(
	IDVehicleType int primary key identity,
	VehicleType nvarchar(30) not null
)

create table VehicleManufacturer
(
	IDVehicleManufacturer int primary key identity,
	ManufacturerName nvarchar(50) not null
)

create table VehicleModel
(
	IDVehicleModel int primary key identity,
	ModelName nvarchar(100) not null,
	VehicleManufacturerID int not null,

	CONSTRAINT FK_VehicleModel_VehicleManufacturer FOREIGN KEY (VehicleManufacturerID)
		REFERENCES VehicleManufacturer(IDVehicleManufacturer)
)

create table EngineType
(
	IDEngineType int primary key identity,
	EngineType nvarchar(50) not null
)

create table Vehicle
(
	IDVehicle int primary key identity,
	UserID int not null,
	RegistrationPlate nvarchar(15) not null,
	VehicleTypeID int not null,
	VehicleModelID int not null,
	ManufacturingDate date not null,
	Kilometers int not null,
	EngineTypeID int not null,
	FuelEfficiency decimal(2,1) not null,
	IsActive bit not null,

	CONSTRAINT FK_Vehicle_User FOREIGN KEY (UserID)
		REFERENCES RegisteredUser(IDRegisteredUser),
	CONSTRAINT FK_Vehicle_VehicleType FOREIGN KEY (VehicleTypeID)
		REFERENCES VehicleType(IDVehicleType),
	CONSTRAINT FK_Vehicle_VehicleModel FOREIGN KEY (VehicleModelID)
		REFERENCES VehicleModel(IDVehicleModel),
	CONSTRAINT FK_Vehicle_EngineType FOREIGN KEY (EngineTypeID)
		REFERENCES EngineType(IDEngineType)
)

create table VehiclePicture
(
	IDVehiclePicture int primary key identity,
	PicturePath nvarchar(max) not null,
	VehicleID int not null,

	CONSTRAINT FK_VehiclePicture_Vehicle FOREIGN KEY (VehicleID)
		REFERENCES Vehicle(IDVehicle)
)

create table Listing
(
	IDListing int primary key identity,
	VehicleID int not null,
	DatePosted date not null,
	IsActive bit not null,
	ListingDescription nvarchar(max),
	CityID int not null,
	LocationCoordinateX decimal(9,6) not null,
	LocationCoordinateY decimal(9,6) not null,

	CONSTRAINT FK_Listing_Vehicle FOREIGN KEY (VehicleID)
		REFERENCES Vehicle(IDVehicle),
	CONSTRAINT FK_Listing_City FOREIGN KEY (CityID)
		REFERENCES City(IDCity)
)

create table Rental
(
	IDRental int primary key identity,
	ListingID int not null,
	RenterID int not null,
	DateStart date not null,
	DateEnd date not null,
	IsActive bit not null,
	IsSuccessful bit not null,
	Rating int,

	CONSTRAINT FK_Rental_Listing FOREIGN KEY (ListingID)
		REFERENCES Listing(IDListing),
	CONSTRAINT FK_Rental_User FOREIGN KEY (RenterID)
		REFERENCES RegisteredUser(IDRegisteredUser),
)

/*

use master
go
drop database OICAR_Project
go

*/