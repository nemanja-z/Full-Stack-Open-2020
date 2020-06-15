import React from 'react';
import { Entry } from '../types';
import HealthRatingBar from "../components/HealthRatingBar";
import { Icon } from "semantic-ui-react";
const Entries: React.FC<{ entry: Entry }> = ({ entry }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };
    const icon = (entry: Entry) => {
        switch (entry.type) {
            case 'HealthCheck': return <Icon name='stethoscope' />;
            case 'OccupationalHealthcare': return <Icon name='user md' />;
            case 'Hospital': return <Icon name='hospital' />;
            default: return assertNever(entry);

        }
    };
    switch (entry.type) {
        case 'HealthCheck':
            {
                return (<>
                    <h3>{entry.date}</h3>
                    {icon(entry)}
                    <p>{entry.specialist}</p>
                    <p>{entry.description}</p>
                    <ul>
                        {entry.diagnosisCodes && (
                            entry.diagnosisCodes.map(e => <li key={e}>{e}</li>)
                        )}
                    </ul>
                    <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
                </>);
            }
        case 'OccupationalHealthcare': {
            return (<>
                <h3>{entry.date}</h3>
                {icon(entry)}
                <p>{entry.specialist}</p>
                <p>{entry.description}</p>
                <p>{entry.employerName}</p>
                <ul>
                    {entry.diagnosisCodes && (
                        entry.diagnosisCodes.map(e => <li key={e}>{e}</li>)
                    )}
                </ul>
                {entry.sickLeave ? (
                    <div>
                        <h4>Sick leave:start-end</h4>
                        <p>{entry.sickLeave.startDate}-{entry.sickLeave.endDate}</p>
                    </div>) : null}
            </>);
        }

        case 'Hospital':
            {
                return (<>
                    <h3>{entry.date}</h3>
                    {icon(entry)}
                    <p>{entry.specialist}</p>
                    <p>{entry.description}</p>
                    <ul>
                        {entry.diagnosisCodes && (
                            entry.diagnosisCodes.map(e => <li key={e}>{e}</li>)
                        )}
                    </ul>
                    {entry.discharge ? (
                        <div>
                            <p>Discharge date:{entry.discharge.date}</p>
                            <p>Discharge criteria:{entry.discharge.criteria}</p>
                        </div>) : null}
                </>);
            }
        default:
            return assertNever(entry);
    }
};
export default Entries;