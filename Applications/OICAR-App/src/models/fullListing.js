class FullListing {
    constructor (id, title, description, price, pricePeriod, startDate, endDate, coordX, coordY, images, vehicle, user) {
        this.id = id,
        this.title = title,
        this.description = description,
        this.price = price,
        this.pricePeriod = pricePeriod,
        this.startDate = startDate,
        this.endDate = endDate,
        this.coordinates = {
            lat: coordX,
            lng: coordY
        }
        this.images = images,
        this.vehicle = vehicle,
        this.user = user
    };
}

export default FullListing;