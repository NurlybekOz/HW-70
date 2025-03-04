import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectContactsLoading} from "../../../store/Contacts/contactsSlice.ts";
import ContactForm from "../../components/ContactForm/ContactForm.tsx";
import {IContactForm} from "../../types";
import {createContact, fetchContacts} from "../../../store/Contacts/contactsThunks.ts";


const NewContact = () => {
    const navigate = useNavigate();
    const loading = useAppSelector(selectContactsLoading)
    const dispatch = useAppDispatch();

    const onCreateContact = async (newContact: IContactForm) => {
        await dispatch(createContact(newContact));
        navigate('/')
        await dispatch(fetchContacts())
    };

    return (
        <div className="row">
            <div className="col">
                <ContactForm onSubmitAction={onCreateContact} isLoading={loading} />
            </div>
        </div>
    );
};

export default NewContact;