import React from 'react';
import { Entry } from '../types';
import HealthRatingBar from "../components/HealthRatingBar";
import { Icon, Card } from "semantic-ui-react";

const Entries: React.FC<{ entry: Entry }> = ({ entry }) => {

    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    const icon = (entry: Entry) => {
        switch (entry.type) {
            case "HealthCheck": return <Icon name='stethoscope' />;
            case "OccupationalHealthcare": return <Icon name='user md' />;
            case "Hospital": return <Icon name='hospital' />;
            default: return assertNever(entry);

        }
    };
    switch (entry.type) {
        case "HealthCheck":
            {
                return (<Card>
                    <Card.Content>
                    <Card.Header>{entry.date} {icon(entry)}</Card.Header>
                    <Card.Description>
                    <p>Specialist: {entry.specialist}</p>
                    <p>Description: {entry.description}</p>
                    {entry.diagnosisCodes && <p>Diagnosis codes:</p>}
                    <ul>
                        {
                            entry.diagnosisCodes?.map(e => <li key={e}>{e}</li>)
                        }
                            </ul>
                    </Card.Description>
                    <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
                    </Card.Content>
                </Card>);
            }
        case "OccupationalHealthcare": {
            return (<Card>
                <Card.Header>{entry.date} {icon(entry)}</Card.Header>
                <Card.Content>
                <p>Specialist: {entry.specialist}</p>
                <p>Description: {entry.description}</p>
                <p>Employer name: {entry.employerName}</p>
                {entry.diagnosisCodes && <p>Diagnosis codes:</p>}
                <ul>
                    {
                        entry.diagnosisCodes?.map(e => <li key={e}>{e}</li>)
                    }
                </ul>
                
                    <div>
                        <p>Sick leave start: {entry.sickLeave?.startDate} </p>
                        <p>Sick leave end: {entry.sickLeave?.endDate}</p>
                        </div>
                </Card.Content>
            </Card>);
        }

        case "Hospital":
            {
                return (<Card>
                    <Card.Header>{entry.date} {icon(entry)}</Card.Header>
                    <Card.Content>
                    <p>Specialist: {entry.specialist}</p>
                    <p>Description: {entry.description}</p>
                        {entry.diagnosisCodes && <p>Diagnosis codes:</p>}
                    <ul>
                        {
                            entry.diagnosisCodes?.map(e => <li key={e}>{e}</li>)
                        }
                    </ul>
                    {entry.discharge ? (
                        <div>
                            <p>Discharge date:{entry.discharge.date}</p>
                            <p>Discharge criteria:{entry.discharge.criteria}</p>
                            </div>) : null}
                    </Card.Content>
                </Card>);
            }
        default:
            return assertNever(entry);
    }
};
export default Entries;