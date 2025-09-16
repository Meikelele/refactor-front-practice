import { Box, Text } from '@mantine/core';
import './StatusDot.scss';
import type { StatusDotState } from '../../../shared/StatusDotState';

type StatusDotProps = {
    state: StatusDotState,
    size: number,
    label?: string,
    title?: string
}

export default function StatusDot(props: StatusDotProps) {
    return(
        <Box style={{display: 'flex', padding: '0.2em'}}>
          <Box
            className="statusDot"
            data-state={props.state}
            style={{ width: props.size, height: props.size }}
            title={props.title ?? props.state}
            aria-label={props.title ?? props.state}
          />
          {/* TODO: labelka ma byc obok, jesli wogole */}
          {props.label ? <Text size="sm">{props.label}</Text> : null}
    </Box>
    );
}