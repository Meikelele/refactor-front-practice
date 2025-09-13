// import { Stack } from "@mantine/core";
import { Title, Text, Container, Group } from "@mantine/core";
import "./ModeHeader.scss"
import ModeSwitch from "../../components/ui/ModeSwitch/ModeSwitch";

export function ModeHeader() {  
return (
    <Container className="modeHeader__container">
        <Container>
            <Group className="modeHeader__container__header">
                <Title>GardOn</Title>
                {/* TODO: przerobic na wlasna wersje tego switcha*/}
                <ModeSwitch />
            </Group>
        </Container>
        <Container>
            <Text>Solution for your garden</Text>
        </Container>
    </Container>
);
}

export default ModeHeader; 