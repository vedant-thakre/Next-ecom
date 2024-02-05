"use client";

import {PulseLoader } from "react-spinners";

export default function ComponentLoader({color, loading, size }) {
  return (
    <span className="flex gap-1 items-center">
      <PulseLoader color={color} loading={loading} size={size || 10} data-testid = 'loader' />
    </span>
  );
}
