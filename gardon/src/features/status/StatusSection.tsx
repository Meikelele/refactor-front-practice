import Section from "../../components/ui/Section/Section";
import "./StatusSection.scss";
import StatusDot from "../../components/ui/StatusDot/StatusDot";
import { StatusDotState } from "../../shared/StatusDotState";

export default function StatusSection() {
    return (
        <Section title="Status Section">
            <div className="statusSection__container">
                <div className="statusSection__container__irrigation">
                    <div className="statusSection__container__irrigation__text">
                        <p>Irrigation:</p>
                        <p><span style={{backgroundColor: `#e03131`, color: `white`, padding: `0.15em`}}>failed</span></p>
                    </div>
                    <div className="statusSection__container__irrigation__statusDotSection">
                        <StatusDot state={StatusDotState.ACTIVE} size={20} />
                        <StatusDot state={StatusDotState.ERROR} size={20} />
                        <StatusDot state={StatusDotState.IDLE} size={20} />
                        <StatusDot state={StatusDotState.OK} size={20} />
                        <StatusDot state={StatusDotState.WARN} size={20} />
                        <StatusDot state={StatusDotState.UNKNOWN} size={20} />
                    </div>
                </div>

                <div className="statusSection__container__pouring">
                    <div className="statusSection__container__pouring__text">
                        <p>Pouring:</p>
                        <p><span style={{backgroundColor: `#e03131`, color: `white`, padding: `0.15em`}}>failed</span></p>
                    </div>
                    <div className="statusSection__container__pouring__statusDotSection">
                        <StatusDot state={StatusDotState.ACTIVE} size={20} />
                    </div>
                </div>
            </div>
        </Section>
    );
}