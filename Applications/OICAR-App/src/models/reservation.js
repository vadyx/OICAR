class Reservation {

    constructor(id, title, manufacturer, model, image, price, rating, startDate, phoneNr, endDate, coordinates, user) {
        this.id = id,
        this.title = title,
        this.manufacturer = manufacturer,
        this.model = model,
        this.image = image,
        this.price = price,
        this.rating = rating,
        this.startDate = startDate,
        this.endDate = endDate,
        this.phoneNr = phoneNr,
        this.coordinates = coordinates,
        this.user = user
    }

};

export default Reservation;