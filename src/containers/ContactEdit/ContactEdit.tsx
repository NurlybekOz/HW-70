import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectContactsLoading} from "../../../store/Contacts/contactsSlice.ts";
import {IContactForm} from "../../types";
import {updateContact} from "../../../store/Contacts/contactsThunks.ts";
import ContactForm from "../../components/ContactForm/ContactForm.tsx";



const EditContact = () => {
    const loading = useAppSelector(selectContactsLoading)
    const navigate = useNavigate();
    const {idContact} = useParams();
    const dispatch = useAppDispatch();

    const onEditContact = async (contact: IContactForm) => {
        if (idContact) {
            await dispatch(updateContact({id: idContact, contact: contact}));
            navigate('/')
        }

    };
    return (
        <div className="row">
            <div className="col">
                <ContactForm onSubmitAction={onEditContact} isEdit isLoading={loading} idContact={idContact} />
            </div>
        </div>
    );
};

export default EditContact;