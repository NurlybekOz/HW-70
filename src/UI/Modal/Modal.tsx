import * as React from "react";
import { useNavigate } from "react-router-dom";
import BackDrop from "../BackDrop/BackDrop.tsx";

interface Props extends React.PropsWithChildren {
    show?: boolean;
    title?: string;
    onClose: React.MouseEventHandler;
    contactId: string;
    onDelete: (contactId: string) => void;
}

const Modal: React.FC<Props> = ({ show = false, title = 'Custom title', onClose, children, contactId, onDelete }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit/${contactId}`);
    };

    const handleDelete = () => {
        onDelete(contactId);
    };

    return (
        <>
            <BackDrop show={show} onClickBackDrop={onClose} />
            <div className="modal show" style={{
                display: show ? 'block' : 'none', position: 'fixed',
                width: '500px',
                height: '300px',
                overflow: 'hidden',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">{title}</h1>
                        </div>
                        <div className="p-3">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={handleEdit}>Edit</button>
                            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
