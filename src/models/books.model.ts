export interface BodyResponseGetAllBooks {
    message: string;
    data: Datum[];
}

export interface Datum {
    id: string;
    title: string;
    author: string;
    description: string;
    summary: string;
    publicationDate: Date;
    createdBy: string;
    updatedBy: null;
    deletedBy: null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
    files: any[];
}

export interface BodyRequestCreateBook {
    title: string
    author: string
    description: string
    summary: string
    publicationDate: string
}

export interface BodyResponseCreateBook{
    message: string, // Text message describing the response
    data : Record <string, string> // Object with key-value pairs of type string
}

