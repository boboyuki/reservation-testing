'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';
type Props = {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  onChange: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | ChangeEvent<HTMLInputElement>,
  ) => void;
  onBlur: (
    e: React.FocusEvent<HTMLInputElement, Element> | React.FocusEvent<HTMLButtonElement, Element>,
  ) => void;
  disabled: boolean;
};
export const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  onChange,
  onBlur,
  disabled,
}: Props) => {
  const handleIncreaseButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newValue = value + step;
    console.log(newValue, max);
    if (newValue > max) {
      return;
    }
    onChange(e);
  };

  const handleDecreaseButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newValue = value - step;
    console.log(newValue, min);
    if (newValue < min) {
      return;
    }
    onChange(e);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value.replace(/\D/g, ''), 10);
    if (newValue < min || newValue > max) {
      return;
    }
    onChange(e);
  };
  return (
    <div className="flex gap-2">
      <Button
        name={`${name}-decrease`}
        variant="outline"
        className="h-[48px] w-[48px] border-[#1D9FD2] text-[24px] text-[#1D9FD2]"
        onClick={handleDecreaseButton}
        onBlur={onBlur}
        disabled={disabled}
      >
        -
      </Button>
      <Input
        name={`${name}-input`}
        className="h-[48px] w-[48px] text-center"
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      <Button
        name={`${name}-increase`}
        variant="outline"
        className="h-[48px] w-[48px] border-[#1D9FD2] text-[24px] text-[#1D9FD2]"
        onClick={handleIncreaseButton}
        onBlur={onBlur}
        disabled={disabled}
      >
        +
      </Button>
    </div>
  );
};
