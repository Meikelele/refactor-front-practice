import { Box, Group, SimpleGrid, Title} from "@mantine/core";
import "../../styles/globals.scss";
import "./ScheduleSection.scss";



export default function ScheduleSection() {
    const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <Box className="scheduleSection__container">
            <Title order={2}>Schedule Mode</Title>
            {/* <Text>Manual mode</Text> */}

            {/* Week days */}
            {/* TODO:
            - do better grid
                - or onRowClick
            - add subtext to explain wht is it
            */}
            <Box className="scheduleSection__container__daysCheckboxes">
                <SimpleGrid
                    cols={{ base: 1, sm: 2, lg: 5 }}
                    spacing={{ base: 10, sm: 'xl' }}
                    verticalSpacing={{ base: 'md', sm: 'xl' }}
                >
                    {/* <Text>Pick your days.</Text> */}
                    {DAYS.map((day) => (
                        <div className="scheduleSection__container__daysCheckboxes__Checkbox">
                            <div>
                                <input type="checkbox" id={day} name={day} />
                                <label>{day}</label>
                            </div>
                        </div>
                    ))}
                </SimpleGrid>
            </Box>
            
            {/* Date */}
            {/* TODO:
            - add validations on datePickers
            - add subtext to explain wht is it
            */}
            {/* <Text>Pick your date.</Text> */}
            <Group className="scheduleSection__container__datePickers" >
                <Box>
                    <input
                        type="time"
                    required />
                </Box>
                <Box>
                    <input
                        type="time"
                    required />
                </Box>
            </Group>
            
            {/* Button */}
            {/* TODO:
            - add validators
             */}
            <Box className="scheduleSection__container__button">
                <button>
                    Confirm
                </button>
            </Box>
        </Box>
    );
}