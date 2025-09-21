import ManualSection from './features/manual/ManualSection';
import ModeHeader from './features/mode/ModeHeader';
import ScheduleSection from './features/schedule/ScheduleSection';
import StatusSection from './features/status/StatusSection';

export default function App() {

  return (
    <div>
      <ModeHeader />
      <ScheduleSection />
      <ManualSection />
      <StatusSection />
    </div>
  );
}
