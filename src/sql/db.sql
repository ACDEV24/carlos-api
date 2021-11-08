
CREATE TABLE IF NOT EXISTS products(
    id VARCHAR(64) DEFAULT (uuid()),
    name text NOT NULL CHECK (name <> ''),
    price real NOT NULL,
    image text,
    active boolean default true,
    description text,
    atributes json,
    stock integer DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    constraint pk_products primary key(id)
);

CREATE TABLE IF NOT EXISTS users(
    id VARCHAR(64) DEFAULT (uuid()),
    first_name text NOT NULL CHECK (first_name <> ''),
    last_name text NOT NULL CHECK (last_name <> ''),
    email text NOT NULL UNIQUE,
    password text NOT NULL,
    role int NOT NULL DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    constraint pk_users primary key(id)
);
