import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { selectContacts, selectContactsLoading } from "../../store/Contacts/contactsSlice.ts";
import {fetchContacts, deleteContact, fetchContactInfo} from "../../store/Contacts/contactsThunks.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import Modal from "../../UI/Modal/Modal.tsx";

const Home = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectContactsLoading);
    const contacts = useAppSelector(selectContacts);

    const [showModal, setShowModal] = useState<string | null>(null);
    const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleOpenModal = (contactId: string) => {
        dispatch(fetchContactInfo(contactId));
        setSelectedContactId(contactId);
        setShowModal(contactId);
    };

    const handleCloseModal = () => {
        setShowModal(null);
        setSelectedContactId(null);
    };

    const handleDelete = (contactId: string) => {
        dispatch(deleteContact(contactId))
            .then(() => {
                dispatch(fetchContacts());
                handleCloseModal();
            })

    };

    return (
        <>
            <div className="row mt-2">
                <div className="col-4">
                    {loading ? <Loader /> :
                        contacts.map(contact => (
                            <div key={contact.id} className="d-flex flex-column align-items-center">
                                <button
                                    className="d-flex gap-4 align-items-center border w-75 bg-white m-2 p-3"
                                    onClick={() => handleOpenModal(contact.id)}
                                >
                                    <img className="contactImg" src={contact.image} alt={contact.name} />
                                    <b className="fs-4">{contact.name}</b>
                                </button>

                                {showModal === contact.id && selectedContactId && (
                                    <Modal
                                        show={showModal === contact.id}
                                        title={`Contact Details - ${contact.name}`}
                                        onClose={handleCloseModal}
                                        contactId={contact.id}
                                        onDelete={handleDelete}
                                    >
                                        <div className='d-flex gap-3 align-items-center'>
                                            <img className="contactImg" src={contact.image} alt={contact.name} />
                                            <div>
                                                <p className='m-0 fs-5'><b>Email:</b> {contact.email}</p>
                                                <p className='m-0 fs-5'><b>Phone:</b> {contact.phone}</p></div>

                                        </div>
                                    </Modal>
                                )}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Home;
