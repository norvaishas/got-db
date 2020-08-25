export default class GotService {

    /*constructor() {
        this._apiBase = 'https://anapioficeandfire.com/api'
    }*/

    _apiBase =  'https://anapioficeandfire.com/api'; /* Тоже что и создание поля в конструкторе выше */


    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Не удается получить данные с сервера ${url}. Код ошибки: ${res.status}.`)
        }

        return await res.json();
    };

    getAllCharacters() {
        return this.getResource(`/characters/?page=59`)
    };

    async getSomeCharacter(id) {
        const people = await this.getResource(`/characters/${id}`);
        return people;
    }
};
