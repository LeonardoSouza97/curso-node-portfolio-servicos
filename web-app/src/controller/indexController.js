import portfolioModel from '../model/portfolio/portfolioModel';

let divPortfolios = window.document.getElementById("div-portfolio");
let objIndexController;

class indexController {

    getTodosIndex(divPortfolios) {
        let promisse = new Promise(function (resolve, reject) {

            let promisseFetch = portfolioModel.getTodos();

            promisseFetch.then(response => {
                resolve(response);
            })

        });

        promisse.then(response => {
            let dados = "";

            for (const servico of response.dados) {
                dados += `<div class="card text-white bg-primary">
               <div class="card-header">
               <h5 class="card-title">${servico.descricao}</h5>
               </div>
               <div class="card-body">
                 <p class="card-text">${servico.detalhes}</p>
               </div>
             </div><br>`;
            }

            divPortfolios.innerHTML = dados;

        }).catch(response => console.log("erro catch:", response));

    }
}

function main() {
    objIndexController = new indexController();
    objIndexController.getTodosIndex(divPortfolios);
}

window.onload = main;