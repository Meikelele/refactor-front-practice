// import type { ChangeEvent } from 'react';

// type Props = {
//   checked: boolean;
//   onChange: (checked: boolean) => void;
//   ariaLabel?: string;
// };

export default function ModeSwitch() {
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   onChange(e.currentTarget.checked);
  // };

  return (
    <label className="switchMode">
      <input
        type="checkbox"
        // checked={checked}
        // onChange={handleChange}
      />
      <span className="sliderMode" />
    </label>
  );
}
