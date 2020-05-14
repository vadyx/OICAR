import moment from 'moment';

export class DocumentVerification {

    constructor(isIDVerified, idExpirationDate, isDLVerified, dlExpirationDate) {
        this.isIDVerified = isIDVerified,
        this.idExpirationDate = idExpirationDate,
        this.isDLVerified = isDLVerified,
        this.dlExpirationDate = dlExpirationDate
    }

    get displayIDExpirationDate() {
        return moment(this.idExpirationDate).format('DD.MM.YYYY');
    }

    get displayDLExpirationDate() {
        return moment(this.dlExpirationDate).format('DD.MM.YYYY');
    }
}

export default DocumentVerification;