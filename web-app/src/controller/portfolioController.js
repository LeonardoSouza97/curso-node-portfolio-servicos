import portfolioModel from '../model/portfolio/portfolioModel';
import portfolioClass from '../model/portfolio/portfolioClass';

let divMsg = window.document.getElementById("msg");
let divPortfolio = window.document.getElementById("listagem");
let formulario = window.document.getElementById("form");

let objPortfolio;

class portfolioController {

    getTodosTable(divPortfolio) {
        let promisse = new Promise(function (resolve, reject) {

            let promisseFetch = portfolioModel.getTodos();

            promisseFetch.then(response => {
                resolve(response);
            })

        });

        promisse.then(response => {
            let dados = "";

            if (response.erro) {
                this.exibirMsgAlert(response.msg, "erro");
            } else {
                dados += `<div class ="table-responsive">
                    <table class="table table-striped table-bordered table-hover table-sm">
                        <thead class="table-dark">
                            <tr>
                            <th>Código</th>
                            <th>Descrição</th>
                            <th></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>`;
                for (const servico of response.dados) {
                    dados += ` <tr>
                    <th>${servico.id_portfolio}</th>
                    <th>${servico.descricao}</th>
                    <th><button type="button" class="btn btn-primary btn-editar" mr-sm-2 data-id="${servico.id_portfolio}">Editar</button></th>
                    <th><button type="button" class="btn btn-primary btn-excluir" mr-sm-2 data-id="${servico.id_portfolio}">Excluir</button></th>
                    </tr>`;
                }

                dados += "</tbody></table></div>";
                divPortfolio.innerHTML = dados;

                let btnEditar = document.querySelectorAll(".btn-editar");
                let btnExcluir = document.querySelectorAll(".btn-excluir");

                btnEditar.forEach(function (item) {
                    item.addEventListener("click", event => {
                        objPortfolio.limparAlert();
                        let id = event.target.getAttribute('data-id');
                        objPortfolio.prepararEditar(id);
                    });

                });

                btnExcluir.forEach(function (item) {
                    item.addEventListener("click", event => {
                        objPortfolio.limparAlert();
                        let id = event.target.getAttribute('data-id');
                        objPortfolio.deletar(id);
                    });

                });
            }

        }).catch(response => console.log("erro catch:", response));
    }

    ocultarElemento(elemento) {
        document.getElementById(elemento).style.display = "none";
    };

    exibirElemento(elemento) {
        document.getElementById(elemento).style.display = "block";
    };

    limparCamposForm(form) {
        form.id.value = "";
        form.descricao.value = "";
        form.detalhes.value = "";
    };

    exibirMsgAlert(msg, tipo) {
        let dados = "";
        if (tipo == "sucesso") {
            dados = `<div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>${msg}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
        } else {
            dados = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>${msg}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`;
        }

        divMsg.innerHTML = dados;
    }

    limparAlert() {
        divMsg.innerHTML = "";
    }

    prepararEditar(id) {

            let promisse = new Promise(function (resolve, reject) {

                let promisseFetch = portfolioModel.getById(id);

                promisseFetch.then(response => {
                    resolve(response);
                })

            });

            promisse.then(response => {
                if (response.erro) {
                    this.exibirMsgAlert(response.mensagem, "erro");
                } else {
                    let objPortfolioClass = new portfolioClass(response.dados[0].id_portfolio,response.dados[0].descricao, response.dados[0].detalhes);
                    
                    formulario.id.value = objPortfolioClass.id_portfolio;
                    formulario.descricao.value = objPortfolioClass.descricao;
                    formulario.detalhes.value = objPortfolioClass.detalhes;

                    objPortfolio.getTodosTable(divPortfolio);
                    objPortfolio.ocultarElemento("listagem");
                    objPortfolio.exibirElemento("formulario");
                }

            }).catch(response => console.log('Deu erro ao adicionar', response));
        
    }

    editar(formulario) {
        let id, descricao, detalhes;

        id = formulario.id.value;
        descricao = formulario.descricao.value;
        detalhes = formulario.detalhes.value;

        if (descricao && detalhes && id) {

            let objPortfolioClass = new portfolioClass(id, descricao, detalhes); 

            let promisse = new Promise(function (resolve, reject) {

                let promisseFetch = portfolioModel.editar(objPortfolioClass);

                promisseFetch.then(response => {
                    resolve(response);
                })

            });

            promisse.then(response => {
                if (response.erro) {
                    this.exibirMsgAlert(response.mensagem, "erro");
                } else {
                    objPortfolio.getTodosTable(divPortfolio);
                    objPortfolio.exibirMsgAlert(response.mensagem, "sucesso");
                    objPortfolio.ocultarElemento("formulario");
                    objPortfolio.exibirElemento("listagem");
                    objPortfolio.limparCamposForm(formulario);
                }

            }).catch(response => console.log('Deu erro ao adicionar', response));

        } else {
            this.exibirMsgAlert("Por favor preencher corretamente todos os campos!", "erro");
        }
    }

    adicionar(formulario) {
        let descricao, detalhes;

        descricao = formulario.descricao.value;
        detalhes = formulario.detalhes.value;

        if (descricao && detalhes) {

            let objPortfolioClass = new portfolioClass(null, descricao, detalhes); 

            let promisse = new Promise(function (resolve, reject) {

                let promisseFetch = portfolioModel.adicionar(objPortfolioClass);

                promisseFetch.then(response => {
                    resolve(response);
                })

            });

            promisse.then(response => {
                if (response.erro) {
                    this.exibirMsgAlert(response.mensagem, "erro");
                } else {
                    objPortfolio.getTodosTable(divPortfolio);
                    objPortfolio.exibirMsgAlert(response.mensagem, "sucesso");
                    objPortfolio.ocultarElemento("formulario");
                    objPortfolio.exibirElemento("listagem");
                    objPortfolio.limparCamposForm(formulario);
                }

            }).catch(response => console.log('Deu erro ao adicionar', response));

        } else {
            this.exibirMsgAlert("Por favor preencher corretamente todos os campos!", "erro");
        }
    }

    deletar(id) {

            let promisse = new Promise(function (resolve, reject) {

                let promisseFetch = portfolioModel.deletar(id);

                promisseFetch.then(response => {
                    resolve(response);
                })

            });

            promisse.then(response => {
                if (response.erro) {
                    this.exibirMsgAlert(response.mensagem, "erro");
                } else {
                    objPortfolio.getTodosTable(divPortfolio);
                    objPortfolio.exibirMsgAlert(response.mensagem, "sucesso");
                }

            }).catch(response => console.log('Deu erro ao adicionar', response));
        } 

    registrarEvents() {

        document.getElementById("btn-cadastrar-portfolio").addEventListener("click", function () {
            event.preventDefault();
            objPortfolio.limparAlert();
            if (formulario.id.value) {
                objPortfolio.editar(formulario);
            } else {
                objPortfolio.adicionar(formulario);
            }
        });

        document.getElementById("btn-exibir-portfolio").addEventListener("click", function () {
            event.preventDefault();
            objPortfolio.limparAlert();
            objPortfolio.ocultarElemento("listagem");
            objPortfolio.exibirElemento("formulario");
        });

        document.getElementById("btn-cancelar-portfolio").addEventListener("click", function () {
            objPortfolio.ocultarElemento("formulario");
            objPortfolio.exibirElemento("listagem");
            objPortfolio.limparCamposForm(formulario);

        });
    }

}

function main() {
    objPortfolio = new portfolioController();
    objPortfolio.ocultarElemento("formulario");
    objPortfolio.getTodosTable(divPortfolio);
    objPortfolio.registrarEvents();
}


window.onload = main;