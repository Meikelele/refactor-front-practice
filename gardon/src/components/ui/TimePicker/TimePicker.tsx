import { Calendar } from 'primereact/calendar';
import './TimePicker.scss';
import { useState } from 'react';

export default function TimePicker() {
    const [start, setStart] = useState<Date | null >(null);
    const [end, setEnd] = useState<Date | null >(null);

    return (
        <div className="timePicker__container">
            <Calendar 
                value={start}
                onChange={(e) => setStart(e.value as Date)}
                timeOnly
                hourFormat='24'
                showIcon
                icon='pi pi-clock'
                placeholder='-- : --'
                pt={{
                    root: { className: "timePicker__container___time" },
                    input: { className: "timePicker__container___time__input" },
                    dropdownButton: { className: "timePicker__container___time__btn" },
                    panel: { className: "timePicker__container___time__panel" },
                }}           
            />
            <Calendar 
                value={end}
                onChange={(e) => setEnd(e.value as Date)}
                timeOnly
                hourFormat='24'
                showIcon
                icon='pi pi-clock'
                placeholder='-- : --'
                pt={{
                    root: { className: "timePicker__container___time" },
                    input: { className: "timePicker__container___time__input" },
                    dropdownButton: { className: "timePicker__container___time__btn" },
                    panel: { className: "timePicker__container___time__panel" },
                }}           
            />
        </div>
    );
}