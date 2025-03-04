import {createSlice} from "@reduxjs/toolkit";
import {createContact, deleteContact, fetchContactInfo, fetchContacts, updateContact} from "./contactsThunks.ts";
import { RootState } from "../../src/app/store.ts";
import {IContact} from "../../src/types";


interface ContactsState {
    contacts: IContact[];
    contact: IContact | null;
    loading: boolean;
    error: boolean;
}

const initialState: ContactsState = {
    contacts: [],
    contact: null,
    loading: false,
    error: false,
};

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectContact = (state: RootState) => state.contacts.contact;
export const selectContactsLoading = (state: RootState) => state.contacts.loading;

const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })

            .addCase(fetchContactInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchContactInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.contact = action.payload
            })
            .addCase(fetchContactInfo.rejected, (state) => {
                state.loading = false;
            })

            .addCase(deleteContact.pending, (state) => {
                state.loading = true;
            }).addCase(deleteContact.fulfilled, (state) => {
                state.loading = false
            }).addCase(deleteContact.rejected, (state) => {
                state.loading = false
             })

            .addCase(createContact.pending, (state) => {
                state.loading = true
            }).addCase(createContact.fulfilled, (state) => {
                state.loading = false
            }).addCase(createContact.rejected, (state) => {
                state.loading = false
             })

            .addCase(updateContact.pending, (state) => {
                state.loading = true
            }).addCase(updateContact.fulfilled, (state) => {
                state.loading = false
            }).addCase(updateContact.rejected, (state) => {
                state.loading = false
            })


    }
});

export const contactsReducer = contactsSlice.reducer;
