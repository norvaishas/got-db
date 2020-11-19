export default class GotService {
    _apiBase = 'https://anapioficeandfire.com/api';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Не удается получить данные с сервера ${url}. Код ошибки: ${res.status}.`)
        }
        return await res.json();
    };

    getAllCharacters = async () => {
        const chars = await this.getResource(`/characters/?page=70`); //214-last
        // console.log(chars);
        /*Вернем массив объектов трансформированных по шаблону метода*/
        return chars.map(this._transformCharacter);
    };

    async getCharacter(id) {
        const char = await this.getResource(`/characters/${id}`);
        // console.log(char);
        /* Передаем в метод объект полученный от сервера и трансформим его */
        return this._transformCharacter(char);
    };

    getAllHouses = async () => {
        const houses = await this.getResource('/houses')
        return houses.map(this._transformHouse);
    };

    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    };

    getAllBooks= async () => {
        const books = await this.getResource('/books')
        return books.map(this._transformBook);
    };

    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    };

    /* Трансформация данных полученных с сервера:
    * - позволяет передавать в компонент только нужные данные а не весь ответ
    * - превращает ответ в удобный для js формат (camelCase)
    * - позволяет не копипастить */
    _transformCharacter(char) {
        return {
            name: char.name,
            gender: char.gender,
            born: char.born,
            died: char.died,
            culture: char.culture,
            id: char.url.match(RegExp('[0-9]{1,5}'))[0],
        };
    };

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            coatOfArms: house.coatOfArms,
            words: house.words,
            id: house.url.match(RegExp('[0-9]{1,5}'))[0],
        };
    };

    _transformBook(book) {
        return {
            name: book.name,
            isbn: book.isbn,
            authors: book.authors,
            numberOfPages: book.numberOfPages,
            id: book.url.match(RegExp('[0-9]{1,5}'))[0],
        };
    };
};
