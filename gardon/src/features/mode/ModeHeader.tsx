import "./ModeHeader.scss"
import { Title, Text, Group, Switch, Box } from "@mantine/core";
// import ModeSwitch from "../../components/ui/ModeSwitch/ModeSwitch";

export function ModeHeader() {  
return (
    <Box className="modeHeader__container">
        <Box>
            <Group className="modeHeader__container__header">
                <Title>GardOn</Title>
                {/* TODO: przerobic na wlasna wersje tego switcha*/}
                <Switch size="xs" onLabel="ON" offLabel="OFF"/>
            </Group>
        </Box>
        <Box>
            <Text>Solution for your garden</Text>
        </Box>
    </Box>
);
}

export default ModeHeader; 