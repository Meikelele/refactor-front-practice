import ModeSwitch from "../../components/ui/Switches/ModeSwitch/ModeSwitch";
import "./ModeHeader.scss"

type Props = {
  isScheduleMode: boolean;
  setIsScheduleMode: (isScheduleMode: boolean) => void;
}

export default function ModeHeader({isScheduleMode, setIsScheduleMode}: Props) {  

return (
    <div className="modeHeader__container">
        <div>
            <div className="modeHeader__container__header">
                <h1>GardOn</h1>
                <ModeSwitch isScheduleMode={isScheduleMode} setIsScheduleMode={setIsScheduleMode}/>
            </div>
        </div>
        <div>
            <p className="subtitle">Solution for your garden</p>
        </div>
    </div>
);
}