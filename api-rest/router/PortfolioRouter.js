let express = require('express');
let router = express.Router();
let portfolioModel = require('../model/portfolio/PortfolioModel');
let RespostaClass = require('../model/RespostaClass');

router.get('/', function (req, res, next) {

    portfolioModel.getTodos(function (erro, retorno) {
        let resposta = new RespostaClass();

        if (erro) {
            resposta.erro = true;
            resposta.mensagem = 'Ocorreu um erro!';
        } else {
            resposta.dados = retorno;
        }

        res.json(resposta);
    });

})

router.get('/:id?', function (req, res, next) {

    portfolioModel.getId(req.params.id, function (erro, retorno) {
        let resposta = new RespostaClass();

        if (erro) {
            resposta.erro = true;
            resposta.mensagem = 'Ocorreu um erro!';
            console.log('erro', erro);
        } else {
            resposta.dados = retorno;
        }

        res.json(resposta);
    });

})

router.delete('/:id?', function (req, res, next) {

    portfolioModel.deletar(req.params.id, function (erro, retorno) {
        let resposta = new RespostaClass();

        if (erro) {
            resposta.erro = true;
            resposta.mensagem = 'Ocorreu um erro!';
            console.log('erro', erro);
        } else {
            resposta.mensagem = `Registro: ${req.params.id} deletado com sucesso!`;
        }

        res.json(resposta);
    });

})

router.post('/?', function (req, res, next) {

    portfolioModel.adicionar(req.body, function (erro, retorno) {
        let resposta = new RespostaClass();

        if (erro) {
            resposta.erro = true;
            resposta.mensagem = 'Ocorreu um erro!';
            console.log('erro', erro);
        } else {
            if (retorno.affectedRows > 0) {
                resposta.mensagem = 'Cadastro realizado com sucesso!';
            } else {
                resposta.erro = true;
                resposta.mensagem = "Erro ao realizar o cadastro!";
            }
        }
        console.log('Erro:', resposta);
        res.json(resposta);
    });

})

router.put('/?', function (req, res, next) {

    portfolioModel.atualizar(req.body, function (erro, retorno) {
        let resposta = new RespostaClass();

        if (erro) {
            resposta.erro = true;
            resposta.mensagem = 'Ocorreu um erro!';
            console.log('erro', erro);
        } else {
            if (retorno.affectedRows > 0) {
                resposta.mensagem = 'Registro atualizado com sucesso!';
            } else {
                resposta.erro = true;
                resposta.mensagem = "Erro ao atualizar o cadastro!";
            }
        }
        console.log('Erro:', resposta);
        res.json(resposta);
    });

})

module.exports = router;