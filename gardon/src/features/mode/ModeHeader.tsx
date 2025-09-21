import { useState } from "react";
import ModeSwitch from "../../components/ui/Switches/ModeSwitch/ModeSwitch";
import "./ModeHeader.scss"

export default function ModeHeader() {  
const [scheduleMode, setScheduleMode] = useState(true);

return (
    <div className="modeHeader__container">
        <div>
            <div className="modeHeader__container__header">
                <h1>GardOn</h1>
                <ModeSwitch checked={scheduleMode} onChange={setScheduleMode}/>
            </div>
        </div>
        <div>
            <p className="subtitle">Solution for your garden</p>
        </div>
    </div>
);
}