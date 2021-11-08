
export interface IProduct {
    id?: string
    name: string
    price: number
    image: string
    atributes: Atributes
    description: string
    stock: number
    active?: boolean
    createdAt?: Date;
    updatedAt?: Date;
}

interface Atributes {
    title: string
    items: string[]
}
