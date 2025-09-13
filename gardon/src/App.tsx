import { Container } from '@mantine/core';
import ModeHeader from './features/mode/ModeHeader';
import ScheduleSection from './features/schedule/ScheduleSection';

export default function App() {

  return (
    <Container>
      <ModeHeader />
      <ScheduleSection />
    </Container>
  );
}
