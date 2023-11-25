export interface account {
    username: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginUserParams {
    email: string;
    password: string;
}

export interface product {
    idproduct: number;
    productname: string;
    category: string;
    price: number;
    stock: number;
}

export interface category {
    idcategory: number;
    categoryname: string;
}

export interface transaction {
    idtransaction: number;
    username: string;
    transactiondate: Date;
    totalcost: number;
}

export interface orders {
    idtransaction: number;
    idproduct: number;
    quantity: number;
    price: number;
}