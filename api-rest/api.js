const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = express();
const port = 3000;
const router = express.Router();
const portfolioRouter = require('./router/PortfolioRouter')

api.use(cors());

api.use(bodyParser.urlencoded({extended: true}));

api.use(bodyParser.json());

router.get("/", (req, res) => res.json({
    mensagem: 'Api está online'
}));

api.use('/', router);
api.use('/portfolio', portfolioRouter);

api.listen(3000);
console.log('Api está rodando');