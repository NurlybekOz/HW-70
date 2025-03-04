import { useState, useEffect } from "react";
import {Button, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {IContactForm} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectContact, selectContactsLoading} from "../../store/Contacts/contactsSlice.ts";
import {fetchContactInfo} from "../../store/Contacts/contactsThunks.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

interface Props {
    isEdit?: boolean;
    idContact?: string;
    onSubmitAction: (contact: IContactForm) => void;
    isLoading?: boolean;
}

const ContactForm: React.FC<Props> = ({isEdit = false, onSubmitAction, idContact}) => {
    const [form, setForm] = useState<IContactForm>({
        name: '', email: '', image: '', phone: '',
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const navigate = useNavigate();
    const loading = useAppSelector(selectContactsLoading);
    const contact = useAppSelector(selectContact);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (idContact) {
            dispatch(fetchContactInfo(idContact));
        }
    }, [idContact, dispatch]);

    useEffect(() => {
        if (contact && isEdit) {
            setForm({
                name: contact.name,
                email: contact.email,
                image: contact.image,
                phone: contact.phone,
            });
            setImagePreview(contact.image);
        }
    }, [contact, isEdit]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
        if (name === 'image' && value) {
            setImagePreview(value);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim() || !form.phone.trim() || !form.image.trim() || !form.email.trim()) {
            toast.error("All fields are required");
            return;
        }
        onSubmitAction(form);
    };


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <form onSubmit={onSubmit}>
                    <Typography variant="h4" sx={{ textAlign: 'center' }}>
                        {isEdit ? 'Edit' : 'Add new contact'}
                    </Typography>

                    <Grid container spacing={2} sx={{ mx: 'auto', width: '50%', mt: 4 }}>
                        <Grid size={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                label="Name"
                                name="name"
                                variant="outlined"
                                value={form.name}
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                label="Phone"
                                name="phone"
                                variant="outlined"
                                type="number"
                                value={form.phone}
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                label="Email"
                                name="email"
                                variant="outlined"
                                type="email"
                                value={form.email}
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                sx={{ width: '100%' }}
                                label="Image"
                                name="image"
                                variant="outlined"
                                value={form.image}
                                onChange={onInputChange}
                            />
                        </Grid>
                        {imagePreview && (
                            <Grid size={12} sx={{ mt: 2 }} aria-label='Photo preview'>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className='contactImg'
                                />
                            </Grid>
                        )}
                        <Grid size={12} sx={{ mt: 2, display: 'flex', height: '40px', gap: '20px'}}>
                            <Button sx={{ width: '30%' }} type="submit" variant="contained">
                                {isEdit ? 'Save' : 'Add'}
                            </Button>
                            <Button sx={{ width: '30%', whiteSpace: 'nowrap'}} color='inherit' type="button" onClick={() => navigate('/')} variant='contained'>
                                Back to contacts
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </>
    );
};

export default ContactForm