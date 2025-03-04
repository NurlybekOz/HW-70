import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../src/axiosApi";
import {IContact, IContactApi, IContactForm} from "../../src/types";


export const fetchContacts = createAsyncThunk<IContact[], void>(
    'contacts/fetchContacts',
    async () => {
        const response = await axiosApi<IContactApi | null>('/contacts.json');
        const contactsListObject = response.data;

        if (!contactsListObject) {
            return [];
        } else {
            return Object.keys(contactsListObject).map((contactId) => {
                const contact = contactsListObject[contactId];
                return {
                    ...contact,
                    id: contactId,
                };
            });
        }
    }
);
export const fetchContactInfo = createAsyncThunk<IContact, string>(
    'contacts/fetchContactInfo',
    async (contactId) => {
        const response = await axiosApi.get<IContact>(`/contacts/${contactId}.json`);
        return response.data;
    }
);
export const updateContact = createAsyncThunk<void, {id: string, contact: IContactForm}>(
    'contacts/updateContact',
    async ({id, contact}) => {
        await axiosApi.put(`/contacts/${id}.json`, contact);
    }
)
export const createContact = createAsyncThunk<void, IContactForm>(
    'contacts/createContact',
    async (contactToCreate) => {
        await axiosApi.post(`/contacts.json`, contactToCreate);
    }
)

export const deleteContact = createAsyncThunk<void, string>(
    'contacts/deleteContact',
    async (contactId) => {
        await axiosApi.delete(`/contacts/${contactId}.json`);

    }
)