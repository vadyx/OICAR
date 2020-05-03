class Category {

    constructor(id, name, image) {
        this.id = id,
        this.name = name,
        this.image = image
    }

    get imageUri() {
        return `data:image/jpg;base64,${this.image}`;
    }
}

export default Category;