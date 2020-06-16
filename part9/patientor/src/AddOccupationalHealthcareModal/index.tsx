import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOccupationalHealthcareForm, { OccupationalHealthcareEntryFormValues } from './AddOccupationalHealthcareForm';
interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
    error?: string;
    patientName: string;
}

const AddOccupationalHealthcareEntryForm = ({ modalOpen, onClose, onSubmit, error, patientName }: Props) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
        <Modal.Header>Add Occupational healthcare entry for patient: {patientName}</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddOccupationalHealthcareForm onSubmit={onSubmit} onCancel={onClose} />
        </Modal.Content>
    </Modal>
);

export default AddOccupationalHealthcareEntryForm;