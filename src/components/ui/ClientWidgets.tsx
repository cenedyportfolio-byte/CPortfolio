"use client";

import dynamic from 'next/dynamic';

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor').then(mod => mod.CustomCursor), { ssr: false });
const InteractivePet = dynamic(() => import('@/components/ui/InteractivePet').then(mod => mod.InteractivePet), { ssr: false });
const PetPlayground = dynamic(() => import('@/components/ui/PetPlayground').then(mod => mod.PetPlayground), { ssr: false });
const SuggestionBox = dynamic(() => import('@/components/ui/SuggestionBox').then(mod => mod.SuggestionBox), { ssr: false });

export function ClientWidgets() {
  return (
    <>
      <CustomCursor />
      <SuggestionBox />
      <InteractivePet />
      <PetPlayground />
    </>
  );
}
