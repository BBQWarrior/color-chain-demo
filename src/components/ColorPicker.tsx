interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const handleColorChange = () => {
    onChange(color);
  }

  return (
    <div className="color-picker">
      ColorPicker
    </div>
  );
};
