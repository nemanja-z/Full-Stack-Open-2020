import React from 'react';

import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Icon, Grid, Button } from 'semantic-ui-react';
import { Patient } from "../types";
import { patientDetails } from '../state/reducer';
import Entries from './Entries';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import AddHealthCheckEntryForm from '../AddHealthcheckModal/index';


const PatientDetails: React.FC = () => {
  const [{ patientInfo }, dispatch] = useStateValue();

  const [healthcheckModalOpen, setHealthcheckModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setHealthcheckModalOpen(true);


  const submitHealthCheckEntry = () => { };
  const closeModal = (): void => {
    setError(undefined);
    setHealthcheckModalOpen(false);
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
  const icons = (gender: string) => {
    switch (gender) {
      case 'male': return <Icon name='mars' />;
      case 'female': return <Icon name='venus' />;
      case 'other': return <Icon name='genderless' />;
      default: return gender;
    }
  };
  if (!patientInfo) return null;
  return (
    < div >
      <Grid>
        <Grid.Column floated="left" width={5}>
          <h2>{patientInfo.name} {icons(patientInfo.gender)}</h2>
        </Grid.Column>
        <Grid.Column floated="right" width={8}>
          Add Healthcare Entry:{' '}
          <Button onClick={() => openModal()}>Hospital</Button>
        </Grid.Column>
      </Grid>
      {Object.values(patientInfo).map((pat: Patient) => (

        <div key={pat.id}>
          <h2>{pat.name} {icons(pat.gender)}</h2>
          <p>{pat.ssn}</p>
          <p>{pat.occupation}</p>
        </div >))}
      {Object.values(patientInfo).map((pat: Patient) => {
        {
          return pat.entries ? pat.entries.map(p =>
            <Entries key={p.id} entry={p} />) : null;
        }
      })}
      <AddHealthCheckEntryForm
        modalOpen={healthcheckModalOpen}
        onSubmit={submitHealthCheckEntry}
        onClose={() => closeModal()}
        error={error}
        patientName={patientInfo.name}
      />
    </div>
  );
};
export default PatientDetails;

/* {!pat.entries ? <h4>no entries</h4> :
  <div>
    <h4>entries</h4>
    {pat.entries.map(pa =>
      <div key={pa.id}>
        <div>{pa.date} {pa.description}</div>
        {!pa.diagnosisCodes ? null :
          <ul>
            {pa.diagnosisCodes?.map(p =>
              <li key={p}>{p}</li>)}
          </ul>}
      </div>)} */