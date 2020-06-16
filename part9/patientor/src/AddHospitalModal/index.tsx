import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHospitalForm, { HospitalEntryFormValues } from './AddHospitalForm';
interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HospitalEntryFormValues) => void;
    error?: string;
    patientName: string;
}

const AddHospitalEntryForm = ({ modalOpen, onClose, onSubmit, error, patientName }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add Hospital entry for patient: {patientName}</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddHospitalForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddHospitalEntryForm;