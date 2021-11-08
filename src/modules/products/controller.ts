import { Request, Response } from 'express';
import { productsRepository } from './repository';
import { IQueryResponse } from '../../interfaces/query_responses';

class ProductsController {

    public create = async (req: Request, res: Response): Promise<void> => {

        const response: IQueryResponse = await productsRepository.create(req.body);

        if (response.ok) {
            res.send({
                product: response.data
            });
        } else {
            res.status(400).json({
                message: response.data
            });
        }
    };

    public getAll = async (req: Request, res: Response): Promise<void> => {

        const response: IQueryResponse = await productsRepository.getAll();

        if (response.ok) {
            res.send({
                products: response.data
            });
        } else {
            res.status(400).json({
                message: response.data
            });
        }

    };

    public getById = async (req: Request, res: Response): Promise<void> => {

        const response: IQueryResponse = await productsRepository.getById(req.params.id);

        if (response.ok) {
            res.send({
                product: response.data
            });
        } else {
            res.status(400).json({
                message: response.data
            });
        }

    };

    public update = async (req: Request, res: Response): Promise<void> => {

        const response: IQueryResponse = await productsRepository.update(req.params.id, req.body);

        if (response.ok) {
            res.send({
                product: response.data
            });
        } else {
            res.status(400).json({
                message: response.data
            });
        }
    };

    public delete = async (req: Request, res: Response): Promise<void> => {

        const response: IQueryResponse = await productsRepository.delete(req.params.id);

        if (response.ok) {
            res.send({
                message: 'product deleted successfully'
            });
        } else {
            res.status(400).json({
                message: response.data
            });
        }

    };
}

export const productsController = new ProductsController;
