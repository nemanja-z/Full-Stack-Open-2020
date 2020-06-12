import React from 'react';

import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { Icon } from 'semantic-ui-react';
import { Patient } from "../types";
import { patientDetails } from '../state/reducer';

import axios from "axios";
import { apiBaseUrl } from "../constants";



const PatientDetails: React.FC = () => {
  const [{ patientInfo }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {

    const fetchPatientDetails = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(patientDetails(patient));
        // dispatch({ type: "PATIENT_DETAILS", payload: patients });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientDetails();
  }, [dispatch, id]);
  console.log(patientInfo);
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
      {Object.values(patientInfo).map((pat: Patient) => (
        <div key={pat.id}>
          <h2>{pat.name} {icons(pat.gender)}</h2>
          <p>{pat.ssn}</p>
          <p>{pat.occupation}</p>
          <h4>entries</h4>

          {pat.entries && pat.entries.map(pa => {
            pa.diagnosisCodes && pa.diagnosisCodes.map(p => {
              return (<div key={pat.id}>
                <p>{pa.date} {pa.description}</p>
              </div>);
            }
            );
          }
          )}
        </div>
      ))}

    </div >
  );
};
/* {
  pa.diagnosisCodes && pa.diagnosisCodes.map(p =>
    <li key={pat.id}>{p}</li>
  );
}

                  <li key={pat.id}>{p}</li> */
export default PatientDetails;