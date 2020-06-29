import moment from 'moment';

class Reservation {

    constructor(id, title, manufacturer, model, image, price, rating, startDate, endDate, phoneNr, coordinates, user) {
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

    get displayStartDate() {
        return moment(this.startDate).format('DD.MM.YYYY');
    }

    get displayEndDate() {
        return moment(this.endDate).format('DD.MM.YYYY');
    }
};

export default Reservation;