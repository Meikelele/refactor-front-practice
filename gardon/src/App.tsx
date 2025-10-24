import { useState } from 'react';
import ManualSection from './features/manual/ManualSection';
import ModeHeader from './features/mode/ModeHeader';
import ScheduleSection from './features/schedule/ScheduleSection';
import StatusSection from './features/status/StatusSection';

export default function App() {
  const [isScheduleMode, setIsScheduleMode] = useState(true);

  return (
    <div>
      <ModeHeader isScheduleMode={isScheduleMode} setIsScheduleMode={setIsScheduleMode}/>
      {isScheduleMode ? <ScheduleSection /> : <ManualSection />}
      <StatusSection />
    </div>
  );
}
