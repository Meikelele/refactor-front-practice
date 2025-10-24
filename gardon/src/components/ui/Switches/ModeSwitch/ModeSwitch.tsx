import './ModeSwitch.scss';

type Props = {
  isScheduleMode: boolean;
  setIsScheduleMode: (isScheduleMode: boolean) => void;
}

export default function ModeSwitch({isScheduleMode, setIsScheduleMode}: Props) {

  return (
    <button
      type='button'
      className='modeSwitch'
      onClick={ () => setIsScheduleMode(!isScheduleMode)}
      aria-pressed={isScheduleMode}
    >
      <span className='modeSwitch__thumb'
        style={{
            left: isScheduleMode ? "40px" : "4px",
            background: isScheduleMode
              ? "#33c476"
              : "#c04dae"
          }}
      >
        <img
          src={isScheduleMode ? "../../../../public/logoONswitch.png" : "../../../../public/logoOFFswitch.png"}
          alt={isScheduleMode ? "ON Logo" : "OFF Logo"}
          style={{ width: 20, height: 20 }}
        />

      </span>
    </button>
  );
}
