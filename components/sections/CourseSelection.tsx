"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { CategoryId } from "@/data/featuredCourse";

type CourseSelection = {
  selected: CategoryId;
  select: (id: CategoryId) => void;
};

const CourseSelectionContext = createContext<CourseSelection | null>(null);

/** Shares the selected category between the Categories cards and the Featured Course section. */
export function CourseSelectionProvider({
  defaultCategory,
  children,
}: {
  defaultCategory: CategoryId;
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<CategoryId>(defaultCategory);
  const value = useMemo(() => ({ selected, select: setSelected }), [selected]);
  return <CourseSelectionContext value={value}>{children}</CourseSelectionContext>;
}

export function useCourseSelection(): CourseSelection {
  const context = useContext(CourseSelectionContext);
  if (!context) throw new Error("useCourseSelection must be used inside CourseSelectionProvider");
  return context;
}
