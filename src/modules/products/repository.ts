import { IProduct } from './model';
import { database } from '../../database/database';
import { IQueryResponse } from '../../interfaces/query_responses';

class ProductsRepository {

    private table: string = 'products';

    private atributes = `(
        name,
        price,
        image,
        stock,
        description,
        atributes
    )`;

    public create = async (product: IProduct): Promise<IQueryResponse> => {

        const query = `insert into ${this.table}${this.atributes} values(
            '${product.name}',
            ${product.price},
            '${product.image}',
            ${product.stock},
            '${product.description}',
            '${JSON.stringify(product.atributes || {})}'
        ) RETURNING *`;

        return database.query(query)
            .then((value: any) => {
                return {
                    ok: true,
                    data: value[0],
                }
            })
            .catch((err) => {
                console.log(err.message);
                return {
                    ok: false,
                    data: err.message
                }
            });
    }

    public getAll = async (): Promise<IQueryResponse> => {

        return database.query(
            `SELECT * FROM ${this.table} WHERE active = true`
        ).then((value: any) => {
            return {
                ok: true,
                data: value,
            }
        }).catch((err) => {
            console.log(err.message);
            return {
                ok: false,
                data: err.message
            }
        });
    }

    public getById = async (id: string): Promise<IQueryResponse> => {

        return database.query(
            `SELECT * FROM ${this.table} WHERE id = '${id}'`
        ).then((value: any) => {

            if (!value) return {
                ok: false,
                data: 'product not found'
            }
            else return {
                ok: true,
                data: value[0],
            }
        }).catch((err) => {
            console.log(err.message);
            return {
                ok: false,
                data: err.message
            }
        });
    }

    public update = async (id: string, product: IProduct): Promise<IQueryResponse> => {

        return database.query(
            `UPDATE ${this.table} SET
            name = '${product.name}',
            price = ${product.price},
            image = '${product.image}',
            stock = ${product.stock},
            description = '${product.description}',
            atributes = '${JSON.stringify(product.atributes || {})}'
            WHERE id = '${id}'`
        ).then(async (value) => {

            if (!value) return {
                ok: false,
                data: 'product not found'
            }

            const product = await this.getById(id);
            if (!product.ok) return product;

            return {
                ok: true,
                data: product.data,
            }
        }).catch((err) => {
            console.log(err.message);
            return {
                ok: false,
                data: err.message
            }
        });
    }

    public delete = async (id: string): Promise<IQueryResponse> => {

        return database.query(
            `delete from ${this.table} WHERE id = '${id}'`
        ).then((value) => {
            if (!value) return {
                ok: false,
                data: 'product not found'
            }
            else return {
                ok: true,
                data: value,
            }
        }).catch((err) => {
            console.log(err.message);
            return {
                ok: false,
                data: err.message
            }
        });
    }
}

export const productsRepository = new ProductsRepository;
