import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';
import cors from 'cors';
import  { conn } from './instances/pg';

dotenv.config();

const server = express();

server.use(cors({}));

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({error: 'Endpoint não encontrado.'});
});

conn
.sync()
//.sync({ force: true })
.then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`Servidor rodando: http://localhost:${process.env.PORT}`)
    });
}).catch((err) => {
    console.log((`ERRO DE CONEXÃO: ${err}`));
});