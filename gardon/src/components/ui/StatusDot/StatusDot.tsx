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
          <div
            className="statusDot"
            data-state={props.state}
            style={{ width: props.size, height: props.size }}
            title={props.title ?? props.state}
            aria-label={props.title ?? props.state}
          />
    );
}