import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Input, InputProps } from "./Input";

type InputPassProps = Omit<InputProps, "rightIcon" | "type">;

export function InputPass({ ...props }: InputPassProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Input
      {...props}
      type={passwordVisible ? "text" : "password"}
      rightIcon={
        <i
          className="cursor-pointer text-sm text-gray-500 hover:opacity-75 transition-all"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          {passwordVisible ? <Eye /> : <EyeClosed />}
        </i>
      }
    />
  );
}