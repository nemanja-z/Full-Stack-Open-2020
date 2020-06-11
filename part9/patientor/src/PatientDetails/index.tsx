import React from 'react';

import { useStateValue } from "../state";
import { Patient } from "../types";
import { useParams } from "react-router-dom";

import axios from "axios";
import { apiBaseUrl } from "../constants";



const PatientDetails = () => {
  const [{ patientInfo }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/patients/:${id}`);

    const fetchPatientDetails = async () => {
      try {
        const { data: patients } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/:${id}`
        );
        console.log(id);
        dispatch({ type: "PATIENT_DETAILS", payload: patients });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientDetails();
  }, [dispatch, id]);
  console.log(patientInfo);
  return (
    <div>

    </div>
  );
};
export default PatientDetails;