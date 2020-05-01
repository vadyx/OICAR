import moment from 'moment';

class User {

    constructor(id, firstName, lastName, email, rating, registrationDate, profileImage) {
        this.id = id,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.rating = rating,
        this.registrationDate = registrationDate,
        this.profileImage = profileImage
    }

    get displayRegistrationDate() {
        return moment(this.registrationDate).format('DD.MM.YYYY');
    }

    get imageUri() {
        return `data:image/png;base64,${this.profileImage}`;
    }
}

export default User;