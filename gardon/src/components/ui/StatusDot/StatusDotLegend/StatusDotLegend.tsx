import StatusDot from "../StatusDot";
import { StatusDotState } from "../../../../shared/StatusDotState";

export default function StatusLegend() {
  return (
    <div>
      <StatusDot state={StatusDotState.ACTIVE} label="trwa nalewanie / nawadnianie" size={13}/>
      <StatusDot state={StatusDotState.OK}     label="warunki w normie" size={13}/>
      <StatusDot state={StatusDotState.IDLE}   label="bezczynne / nie potrzeba działania" size={13}/>
      <StatusDot state={StatusDotState.WARN}   label="niski poziom / sucho / uwaga" size={13}/>
      <StatusDot state={StatusDotState.ERROR}  label="błąd odczytu / urządzenia" size={13}/>
      <StatusDot state={StatusDotState.UNKNOWN} label="brak danych" size={13}/>
    </div>
  );
}
