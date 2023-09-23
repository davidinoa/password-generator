'use client'

import CheckBox from '@/components/CheckBox'
import RangeSlider from '@/components/RangeSlider'

export default function Home() {
  return (
    <main>
      <CheckBox
        label="Lowercase"
        name="lowercase"
        value="lowercase"
        checked
        onChange={() => {}}
      />
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
