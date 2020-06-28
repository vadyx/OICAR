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

create table Verification
(
	IDVerification int primary key identity,
	DriverLicense varbinary(max) null,
	DriverLicenseVerified bit null,
	DriverLicenseVerificationExpirationDate date null,
	PersonalIdentification varbinary(max) null,
	PersonalIdentificationVerified bit null,
	PersonalIdentificationVerificationExpirationDate date null
)

create table RegisteredUser
(
	IDRegisteredUser int primary key identity,
	FirstName nvarchar(100) not null,
	LastName nvarchar(100) not null,
	Email nvarchar(256) not null UNIQUE,
	LoginCredentialsID int not null,
	Rating decimal(3,2) not null,
	RegistrationDate date not null default GETDATE(),
	ProfileImage varbinary(max) null,
	VerificationID int null,

	CONSTRAINT FK_User_LoginCredentials FOREIGN KEY (LoginCredentialsID)
		REFERENCES LoginCredentials(IDLoginCredentials),

	CONSTRAINT FK_User_Verification FOREIGN KEY (VerificationID)
		REFERENCES Verification(IDVerification)
)

create table Category
(
	IDCategory int primary key identity,
	CategoryName nvarchar(60) not null,
	CategoryImage varbinary(max) not null
)

create table VehicleManufacturer
(
	IDVehicleManufacturer int primary key identity,
	ManufacturerName nvarchar(50) not null,
)

create table VehicleModel
(
	IDVehicleModel int primary key identity,
	ModelName nvarchar(100) not null,
	VehicleManufacturerID int not null,

	CONSTRAINT FK_VehicleModel_VehicleManufacturer FOREIGN KEY (VehicleManufacturerID)
		REFERENCES VehicleManufacturer(IDVehicleManufacturer)
)

create table Category_VehicleManufacturer
(
	CategoryID int not null,
	VehicleManufacturerID int not null,

	CONSTRAINT FK_Category_VehicleManufacturer_Category FOREIGN KEY (CategoryID)
		REFERENCES Category(IDCategory),
	CONSTRAINT FK_Category_VehicleManufacturer_VehicleManufacturer FOREIGN KEY (VehicleManufacturerID)
		REFERENCES VehicleManufacturer(IDVehicleManufacturer),

	UNIQUE(CategoryID, VehicleMAnufacturerID)

)

create table FuelType
(
	IDFuelType int primary key identity,
	FuelType nvarchar(70)
)

create table DriveType
(
	IDDriveType int primary key identity,
	DriveType nvarchar(70)
)

create table GearShiftType
(
	IDGearShiftType int primary key identity,
	GearShiftType nvarchar(70)
)

create table PriceBy
(
	IDPriceBy int primary key identity,
	PriceBy nvarchar(70)
)

create table VehicleAccessories
(
	IDVehicleAccessories int primary key identity,
	VehicleAccessories nvarchar(70)
)

create table SubCategory
(
	IDSubCategory int primary key identity,
	SubCategory nvarchar(70),
	CategoryID int not null,

	CONSTRAINT FK_SubCategory_Category FOREIGN KEY (CategoryID)
		REFERENCES Category(IDCategory)
)

create table Vehicle
(
	IDVehicle int primary key identity,
	CategoryID int not null,
	VehicleManufacturerID int not null,
	VehicleModelID int null,
	ManufacturingYear int null,
	FuelTypeID int null,
	DriveTypeID int null,
	GearShiftTypeID int null,
	Kilometers float null,
	EnginePower float null,

	CONSTRAINT FK_Vehicle_Category FOREIGN KEY (CategoryID)
		REFERENCES Category(IDCategory),
	CONSTRAINT FK_Vehicle_VehicleManufacturer FOREIGN KEY (VehicleManufacturerID)
		REFERENCES VehicleManufacturer(IDVehicleManufacturer),
	CONSTRAINT FK_Vehicle_VehicleModel FOREIGN KEY (VehicleModelID)
		REFERENCES VehicleModel(IDVehicleModel),
	CONSTRAINT FK_Vehicle_FuelType FOREIGN KEY (FuelTypeID)
		REFERENCES FuelType(IDFuelType),
	CONSTRAINT FK_Vehicle_DriveType FOREIGN KEY (DriveTypeID)
		REFERENCES DriveType(IDDriveType),
	CONSTRAINT FK_Vehicle_GerShiftType FOREIGN KEY (GearShiftTypeID)
		REFERENCES GearShiftType(IDGearShiftType)
)

create table VehicleAccessories_Vehicle
(
	VehicleAccessoriesID int not null,
	VehicleID int not null,

	CONSTRAINT FK_VehicleAccessories_Vehicle_VehicleAccessories FOREIGN KEY (VehicleAccessoriesID)
		REFERENCES VehicleAccessories(IDVehicleAccessories),
	CONSTRAINT FK_VehicleAccessories_Vehicle_Vehicle FOREIGN KEY (VehicleID)
		REFERENCES Vehicle(IDVehicle),

	UNIQUE(VehicleAccessoriesID, VehicleID)
)

create table Vehicle_SubCategories
(
	VehicleID int not null,
	SubCategoryID int not null,

	CONSTRAINT FK_Vehicle_SubCategories_Vehicle FOREIGN KEY (VehicleID)
		REFERENCES Vehicle(IDVehicle),
	CONSTRAINT FK_Vehicle_SubCategories_SubCategory FOREIGN KEY (SubCategoryID)
		REFERENCES SubCategory(IDSubCategory),

	UNIQUE(VehicleID, SubCategoryID)
)

create table VehicleImage
(
	IDVehicleImage int primary key identity,
	VehicleImageString varbinary(max) not null,
	VehicleID int not null,

	CONSTRAINT FK_VehicleImage_Vehicle FOREIGN KEY (VehicleID)
		REFERENCES Vehicle(IDVehicle)
)

create table Listing
(
	IDListing int primary key identity,
	Title nvarchar(max) not null,
	ListingDescription nvarchar(max),
	VehicleID int not null,
	Price float not null,
	PriceByID int not null,
	AvailableFromDate date not null,
	AvailableToDate date not null,
	LocationCoordinateX decimal(9,6) null,
	LocationCoordinateY decimal(9,6) null,
	UserID int not null,

	CONSTRAINT FK_Listing_Vehicle FOREIGN KEY (VehicleID)
		REFERENCES Vehicle(IDVehicle),
	CONSTRAINT FK_Listing_PriceBy FOREIGN KEY (PriceByID)
		REFERENCES PriceBy(IDPriceBy),
	CONSTRAINT FK_Listing_User FOREIGN KEY (UserID)
		REFERENCES RegisteredUser(IDRegisteredUser),
)

create table ListingReservation
(
	IDListingReservation int primary key identity,
	FromDate date not null,
	ToDate date not null,
	MobileNumber nvarchar(20) not null,
	Price float not null,
	CardNumber int not null,
	Rating float null,
	ReservatorID int not null,
	ListingOwnerID int not null,
	ListingID int not null,

	CONSTRAINT FK_ListingReservation_Reservator FOREIGN KEY (ReservatorID)
		REFERENCES RegisteredUser(IDRegisteredUser),
	CONSTRAINT FK_ListingReservation_ListingOwner FOREIGN KEY (ListingOwnerID)
		REFERENCES RegisteredUser(IDRegisteredUser),
	CONSTRAINT FK_ListingReservation_Listing FOREIGN KEY (ListingID)
		REFERENCES Listing(IDListing),
)

create table Rating
(
	IDRating int primary key identity,
	UserRaterID int not null,
	RatedUserID int not null,
	Rating float not null,

	CONSTRAINT FK_Rating_UserRater FOREIGN KEY (UserRaterID)
		REFERENCES RegisteredUser(IDRegisteredUser),
	CONSTRAINT FK_Rating_RatedUser FOREIGN KEY (RatedUserID)
		REFERENCES RegisteredUser(IDRegisteredUser)
)