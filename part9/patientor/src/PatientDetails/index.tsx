import React from 'react';
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Icon, Grid, Button } from 'semantic-ui-react';
import { Patient, Gender } from "../types";
import { patientDetails } from '../state/reducer';
import Entries from './Entries';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import AddHealthCheckEntryForm from '../AddHealthcheckModal/index';
import AddOccupationalHealthcareEntryForm from '../AddOccupationalHealthcareModal/index';
import AddHospitalEntryForm from '../AddHospitalModal/index';
import { HealthCheckEntryFormValues } from '../AddHealthcheckModal/AddHealthcheckForm';
import { HospitalEntryFormValues } from '../AddHospitalModal/AddHospitalForm';
import { OccupationalHealthcareEntryFormValues } from '../AddOccupationalHealthcareModal/AddOccupationalHealthcareForm';
import { updateEntry } from '../state/reducer';



const PatientDetails: React.FC = () => {
  const [{ patientInfo }, dispatch] = useStateValue();
  const [healthcheckModalOpen, setHealthcheckModalOpen] = React.useState<boolean>(false);
  const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
  const [occupationalHealthcareModalOpen, setOccupationalHealthcareModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openHealthcheck = (): void => setHealthcheckModalOpen(true);
  const openHospital = (): void => setHospitalModalOpen(true);
  const openOccupational = (): void => setOccupationalHealthcareModalOpen(true);

  const closeModal = (): void => {
    setError(undefined);
    setHealthcheckModalOpen(false);
    setHospitalModalOpen(false);
    setOccupationalHealthcareModalOpen(false);
  };

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {

    const fetchPatientDetails = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(patientDetails(patient));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientDetails();
  }, [dispatch, id]);
  if (!patientInfo) return null;
  const icons = (gender: Gender) => {
    switch (gender) {
      case "male": return <Icon name='mars' />;
      case "female": return <Icon name='venus' />;
      case "other": return <Icon name='genderless' />;
      default: return null;
    }
  };
  const submitHealthCheckEntry = async (values: HealthCheckEntryFormValues) => {
    try {
      const { data: updatePatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updateEntry(updatePatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
  const submitHospitalEntry = async (values: HospitalEntryFormValues) => {
    try {
      const { data: updatePatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updateEntry(updatePatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
  const submitOccupationalHealthcareEntry = async (values: OccupationalHealthcareEntryFormValues) => {
    try {
      const { data: updatePatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(updateEntry(updatePatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    < div >
      <Grid>
        <Grid.Column floated="left" width={5}>
          <h2>{patientInfo.name} {icons(patientInfo.gender)}</h2>
        </Grid.Column>
        <Grid.Column floated="right" width={8}>
          Add Entry:{' '}
          <Button onClick={() => openHospital()}>Hospital</Button>
          <Button onClick={() => openOccupational()}>Occupational Healthcare</Button>
          <Button onClick={() => openHealthcheck()}>Healthcheck</Button>
        </Grid.Column>
      </Grid>
        <div key={patientInfo.id}>
          <p>{patientInfo.ssn}</p>
          <p>{patientInfo.occupation}</p>
        </div >
      {patientInfo.entries?.map(p =>
        <Entries key={p.id} entry={p} />)}
      <AddHealthCheckEntryForm
        modalOpen={healthcheckModalOpen}
        onSubmit={submitHealthCheckEntry}
        onClose={() => closeModal()}
        error={error}
        patientName={patientInfo.name}
      />
      <AddOccupationalHealthcareEntryForm
        modalOpen={occupationalHealthcareModalOpen}
        onSubmit={submitOccupationalHealthcareEntry}
        onClose={() => closeModal()}
        error={error}
        patientName={patientInfo.name}
      />
      <AddHospitalEntryForm
        modalOpen={hospitalModalOpen}
        onSubmit={submitHospitalEntry}
        onClose={() => closeModal()}
        error={error}
        patientName={patientInfo.name}
      />
    </div>
  );
};
export default PatientDetails;
