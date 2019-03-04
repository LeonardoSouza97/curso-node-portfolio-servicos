import ConfigClass from '../../ConfigClass';

const path = `${ConfigClass.getUrlApi().toString()}/portfolio`;

export default class portfolioModel{
    constructor(){
    }

    static getTodos(){
        return fetch(path).then(response => {
            if(response.status >= 400){
                throw new Error('Erro server');
            }
            return response.json();
        })
    }

    static getById(id){
        return fetch(`${path}/${id}`).then(response => {
            if(response.status >= 400){
                throw new Error('Erro server');
            }
            return response.json();
        })
    }

    static adicionar(objPortfolioClass){
        return fetch(path, {
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(objPortfolioClass)
        }).then(response => {
            if(response.status >= 400){
                throw new Error('Erro server');
            }
            return response.json();
        })
    }

    static editar(objPortfolioClass){
        return fetch(path, {
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(objPortfolioClass)
        }).then(response => {
            if(response.status >= 400){
                throw new Error('Erro server');
            }
            return response.json();
        })
    }

    static deletar(id){
        return fetch(`${path}/${id}`, {
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            method: "DELETE"
        }).then(response => {
            if(response.status >= 400){
                throw new Error('Erro server');
            }
            return response.json();
        })
    }
}