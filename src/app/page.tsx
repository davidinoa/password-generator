'use client'

import RangeSlider from '@/components/RangeSlider'

export default function Home() {
  return (
    <main>
      <RangeSlider
        label="Length"
        name="length"
        value={12}
        min={8}
        max={48}
        onChange={() => {}}
        title="Adjust password length"
      />
    </main>
  )
}
