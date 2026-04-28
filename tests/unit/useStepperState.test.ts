import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useStepperState } from '@hooks/useStepperState';

const STEP_IDS = ['spec-plan', 'architecture', 'scaffolding', 'implementation', 'code-review'];

describe('useStepperState', () => {
  it('initializes with the first step active and expanded', () => {
    const { result } = renderHook(() => useStepperState(STEP_IDS));
    expect(result.current.state.activeStepId).toBe(STEP_IDS[0]);
    expect(result.current.state.expandedStepId).toBe(STEP_IDS[0]);
  });

  it('selects a step and disables autoPlay', () => {
    const { result } = renderHook(() => useStepperState(STEP_IDS));
    act(() => result.current.selectStep('architecture'));
    expect(result.current.state.activeStepId).toBe('architecture');
    expect(result.current.state.autoPlay).toBe(false);
  });

  it('goes to next step correctly', () => {
    const { result } = renderHook(() => useStepperState(STEP_IDS));
    act(() => result.current.goNext());
    expect(result.current.state.activeStepId).toBe(STEP_IDS[1]);
    expect(result.current.currentIndex).toBe(1);
  });

  it('goes to previous step correctly', () => {
    const { result } = renderHook(() => useStepperState(STEP_IDS));
    act(() => result.current.selectStep(STEP_IDS[2]));
    act(() => result.current.goPrev());
    expect(result.current.state.activeStepId).toBe(STEP_IDS[1]);
  });

  it('does not go before first step', () => {
    const { result } = renderHook(() => useStepperState(STEP_IDS));
    act(() => result.current.goPrev());
    expect(result.current.state.activeStepId).toBe(STEP_IDS[0]);
    expect(result.current.isFirst).toBe(true);
  });

  it('does not go past last step', () => {
    const { result } = renderHook(() => useStepperState(STEP_IDS));
    act(() => result.current.selectStep(STEP_IDS[STEP_IDS.length - 1]));
    act(() => result.current.goNext());
    expect(result.current.state.activeStepId).toBe(STEP_IDS[STEP_IDS.length - 1]);
    expect(result.current.isLast).toBe(true);
  });

  it('sets approval mode correctly', () => {
    const { result } = renderHook(() => useStepperState(STEP_IDS));
    expect(result.current.state.approvalMode).toBe('manual');
    act(() => result.current.setApprovalMode('autonomous'));
    expect(result.current.state.approvalMode).toBe('autonomous');
  });

  it('toggles expand on a step', () => {
    const { result } = renderHook(() => useStepperState(STEP_IDS));
    act(() => result.current.toggleExpand('architecture'));
    expect(result.current.state.expandedStepId).toBe('architecture');
    act(() => result.current.toggleExpand('architecture'));
    expect(result.current.state.expandedStepId).toBe(null);
  });

  it('uses initialStepId when provided', () => {
    const { result } = renderHook(() => useStepperState(STEP_IDS, 'scaffolding'));
    expect(result.current.state.activeStepId).toBe('scaffolding');
    expect(result.current.currentIndex).toBe(2);
  });

  it('tracks isFirst and isLast correctly', () => {
    const { result } = renderHook(() => useStepperState(STEP_IDS));
    expect(result.current.isFirst).toBe(true);
    expect(result.current.isLast).toBe(false);

    act(() => result.current.selectStep(STEP_IDS[STEP_IDS.length - 1]));
    expect(result.current.isFirst).toBe(false);
    expect(result.current.isLast).toBe(true);
  });
});
