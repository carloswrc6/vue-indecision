import { useCounter } from "@/composables/useCounter"
import { describe, expect, test } from "vitest"

describe('useCounter', () => {
  test('Initializes counter with provided default values', ()=>{
    const defaultValue = 5
    const {counter, squareCounter}=useCounter()
    expect(counter.value).toBe(defaultValue)
    expect(squareCounter.value).toBe(defaultValue*defaultValue)
  })
  test('Inicializes counter with provided initial value', ()=>{
    const initialValue = 10
    const {counter,squareCounter}=useCounter(initialValue)
    expect(counter.value).toBe(initialValue)
    expect(squareCounter.value).toBe(initialValue*initialValue)
  })
  test('Increments counter correctly', () => {
    const {counter,squareCounter}=useCounter(-5)
    counter.value++
    expect(counter.value).toBe(-4)
    expect(squareCounter.value).toBe(16)
  })
})