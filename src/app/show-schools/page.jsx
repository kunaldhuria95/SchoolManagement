"use client";

import { Suspense } from "react";
import ShowSchools from "./showSchool";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading schools...</div>}>
      <ShowSchools />
    </Suspense>
  );
}
