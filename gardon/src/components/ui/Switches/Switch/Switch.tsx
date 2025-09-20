import React from "react";
import "./Switch.scss";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: string;
  disabled?: boolean;
  size?: number;
};

export default function CapsuleSwitch({
  checked,
  onChange,
  color = "#c04dae",
  disabled = false,
  size = 36,
}: Props) {
  const trackBg = checked ? color : "#ccc";
  const width = size * 2;

  return (
    <button
      type="button"
      className="capsule-switch"
      onClick={() => !disabled && onChange(!checked)}
      aria-pressed={checked}
      style={{
        width,
        height: size,
        background: trackBg,
        opacity: disabled ? 0.7 : 1
      }}
      disabled={disabled}
    >
      <span
        className="capsule-thumb"
        style={{
          left: checked ? size : 4,
          width: size - 8,
          height: size - 8,
        }}
      />
    </button>
  );
}