import Section from '../../components/ui/Section/Section';
import './ManualSection.scss';
import Switch from '../../components/ui/Switches/Switch/Switch';
import React from 'react';

export default function ManualSection() {
    const [pumpOn, setPumpOn] = React.useState(false);
    const [valveOn, setValveOn] = React.useState(false);
    return (
        <Section title='Manual Mode'>
            <div className="manualMode__container">
                <div className="manualMode__container__pump">
                    <div className="manualMode__container__pump__textAndSwitch">
                        <p>Pump</p>
                        <Switch checked={pumpOn} onChange={setPumpOn} color="#c04dae" />
                    </div>
                </div>
                <div className="manualMode__container__valve">
                    <div className="manualMode__container__valve__textAndSwitch">
                        <p>Valve</p>
                        <Switch checked={valveOn} onChange={setValveOn} color="#c04dae" />
                    </div>
                </div>
            </div>
            
            
        </Section>
    );
}