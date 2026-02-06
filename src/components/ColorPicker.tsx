import { useState, useRef, useEffect } from 'react';
import { Color } from '../types';
import { hslToRgb, rgbToCss } from '../utils';

interface ColorPickerProps {
  onColorSelect: (color: Color) => void;
  disabled?: boolean;
  initialColor?: Color;
}

export const ColorPicker = ({ onColorSelect, disabled = false, initialColor }: ColorPickerProps) => {
  const [selectedHue, setSelectedHue] = useState(0);
  const [selectedSaturation, setSelectedSaturation] = useState(50);
  const [lightness, setLightness] = useState(50);
  const [selectedColor, setSelectedColor] = useState<Color | null>(initialColor || null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize from initialColor if provided
  useEffect(() => {
    if (initialColor && !selectedColor) {
      setSelectedColor(initialColor);
    }
  }, [initialColor, selectedColor]);

  // Draw the gradient canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create gradient: hue on x-axis, saturation on y-axis
    for (let x = 0; x < width; x++) {
      const hue = (x / width) * 360;
      for (let y = 0; y < height; y++) {
        const saturation = 100 - (y / height) * 100;
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [lightness]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate hue and saturation from click position
    const hue = (x / rect.width) * 360;
    const saturation = 100 - (y / rect.height) * 100;

    setSelectedHue(hue);
    setSelectedSaturation(saturation);

    // Convert to RGB and create color object
    const color = hslToRgb(hue, saturation, lightness);
    setSelectedColor(color);
    onColorSelect(color);
  };

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newLightness = parseInt(e.target.value);
    setLightness(newLightness);
    
    // Update selected color with new lightness
    if (selectedColor) {
      const color = hslToRgb(selectedHue, selectedSaturation, newLightness);
      setSelectedColor(color);
      onColorSelect(color);
    }
  };

  return (
    <div ref={containerRef} className="color-picker flex flex-col items-center gap-2 flex-1 min-h-0">
      <div className="relative w-full flex-1 min-h-0">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          onClick={handleCanvasClick}
          className={`w-full h-full cursor-crosshair rounded-lg shadow-lg ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{ minHeight: '200px' }}
        />
        {selectedColor && (
          <div
            className="absolute w-3 h-3 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: `${(selectedHue / 360) * 100}%`,
              top: `${100 - selectedSaturation}%`,
              backgroundColor: rgbToCss(selectedColor),
            }}
          />
        )}
      </div>
      
      <div className="w-full flex items-center gap-3 px-2">
        <span className="text-xs font-medium text-gray-700 whitespace-nowrap">Lightness</span>
        <input
          type="range"
          min="0"
          max="100"
          value={lightness}
          onChange={handleLightnessChange}
          disabled={disabled}
          className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-gray-600 font-mono whitespace-nowrap">{lightness}%</span>
      </div>

      {selectedColor && (
        <div className="flex items-center gap-2 px-2">
          <span className="text-xs font-medium text-gray-700">Selected:</span>
          <div
            className="w-10 h-10 rounded border border-gray-300 shadow-sm"
            style={{ backgroundColor: rgbToCss(selectedColor) }}
          />
        </div>
      )}
    </div>
  );
};
