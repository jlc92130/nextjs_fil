"use client";

export default function Button({ children, onClick, withoutMarginTop }) {
  return (
    <button
      className={`bg-white rounded-2xl border-threads-gray-light w-full ${
        !withoutMarginTop && "mt-4"
      } p-4 hover:bg-gray-300 duration-150`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
