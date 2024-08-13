"use client";
import { useFormStatus } from "react-dom";

export default function Button({
  children,
  onClick,
  withoutMarginTop,
  formButton,
  disab,
}) {
  const { pending } = useFormStatus(); // pending is true while the form is sending
  return (
    <button
      disabled={disab || (pending && formButton)}
      className={`bg-white rounded-2xl border-threads-gray-light w-full disabled:bg-opacity-45 disabled:cursor-not-allowed ${
        !withoutMarginTop && "mt-4"
      } p-4 hover:bg-gray-300 duration-150`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
