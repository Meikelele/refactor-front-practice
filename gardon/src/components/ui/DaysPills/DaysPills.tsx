import { SelectButton } from 'primereact/selectbutton';
import './DaysPills.scss';
import { useState } from 'react';

const DAYS: string[] = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function DaysPills() {
    const [value, setValue] = useState<string[]>([]);
    
    return(
        <SelectButton
            value={value}
            onChange={(e) => setValue(e.value)}
            options={DAYS}
            multiple
            allowEmpty
            pt={{
                root: { className: "days-wrap" },
                button: { className: "day-pill" },
            }}
      />
    );
}