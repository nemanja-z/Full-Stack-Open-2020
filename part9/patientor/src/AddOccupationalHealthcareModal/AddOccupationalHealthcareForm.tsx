
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";

export type OccupationalHealthcareEntryFormValues = Omit<OccupationalHealthcareEntry, 'id'>;
interface Props {
    onSubmit: (values: OccupationalHealthcareEntryFormValues) => void;
    onCancel: () => void;
}


export const AddOccupationalHealthcareEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: 'OccupationalHealthcare',
                description: '',
                date: '',
                specialist: '',
                diagnosisCodes: [],
                employerName: '',
                sickLeave: {
                    startDate: "",
                    endDate: ""
                }
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Social Security Number"
                            placeholder="SSN"
                            name="ssn"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                        />
                        <Field
                            label='Employer name'
                            placeholder="Employer name"
                            name="employerName"
                            component={TextField}
                        />
                        <Field
                            label='Sick leave - start date'
                            placeholder="Start date"
                            name="sickLeave.startDate"
                            component={TextField}
                        />
                        <Field
                            label='Sick leave - end date'
                            placeholder="End date"
                            name="sickLeave.endDate"
                            component={TextField}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};
export default AddOccupationalHealthcareEntryForm;