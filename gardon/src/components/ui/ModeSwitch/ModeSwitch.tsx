import './ModeSwitch.scss';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ModeSwitch({checked, onChange}: Props) {

  return (
    <button
      type='button'
      className='modeSwitch'
      onClick={ () => onChange(!checked)}
      aria-pressed={checked}
    >
      <span className='modeSwitch__thumb'
        style={{
            left: checked ? "40px" : "4px",
            background: checked
              ? "#33c476"
              : "#c04dae"
          }}
      >
        <img
          src={checked ? "../../../../public/logoONswitch.png" : "../../../../public/logoOFFswitch.png"}
          alt={checked ? "ON Logo" : "OFF Logo"}
          style={{ width: 20, height: 20 }}
        />

      </span>
    </button>
  );
}
