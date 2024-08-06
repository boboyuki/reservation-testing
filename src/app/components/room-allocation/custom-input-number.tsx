'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChangeEvent } from "react";
type Props = {
  min: number;
  max: number;
  step: number;
  name: string;
  value: number;
  onChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element> | React.FocusEvent<HTMLButtonElement, Element>) => void;
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

  return (
    <div className="flex gap-2">
      <Button name={name} variant="outline" className="w-[48px] h-[48px] text-[#1D9FD2] border-[#1D9FD2]"
        onClick={onChange}
        onBlur={onBlur}>-</Button>
      <Input name={name} className="w-[48px] h-[48px] text-center" type="text" value={value} onChange={
        onChange} onBlur={onBlur} />
      <Button name={name} variant="outline" className="w-[48px] h-[48px] text-[#1D9FD2] border-[#1D9FD2]"
        onClick={onChange}
        onBlur={onBlur}
      >+</Button>
    </div>
  );
}
