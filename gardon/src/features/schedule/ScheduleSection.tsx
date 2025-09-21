import "../../styles/globals.scss";
import "./ScheduleSection.scss";
import Section from "../../components/ui/Section/Section";
import DaysPills from "../../components/ui/DaysPills/DaysPills";
import TimePicker from "../../components/ui/TimePicker/TimePicker";
import ConfirmButton from "../../components/ui/Buttons/ConfirmButton/ConfirmButton";

export default function ScheduleSection() {

    return (
        <Section title="Schedule Mode">
            <div className="scheduleSection__container">
                <DaysPills />
                <TimePicker />
                <ConfirmButton />
            </div>
        </Section>
    );
}