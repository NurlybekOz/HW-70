
export interface IContact {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
}
export interface IContactForm {
    name: string;
    email: string;
    phone: string;
    image: string;
}
export interface IContactApi {
    [id: string]: IContact;
}
