import { useReducer, useCallback, useEffect, useRef } from 'react';
import type { StepperState, StepperAction } from '@lib/types';

const AUTO_PLAY_INTERVAL = 6000;

function stepperReducer(state: StepperState, action: StepperAction): StepperState {
  switch (action.type) {
    case 'select':
      return {
        ...state,
        activeStepId: action.stepId,
        expandedStepId: action.stepId,
        autoPlay: false,
      };
    case 'toggleExpand':
      return {
        ...state,
        expandedStepId: state.expandedStepId === action.stepId ? null : action.stepId,
      };
    case 'setApprovalMode':
      return { ...state, approvalMode: action.mode };
    case 'next':
      return state; // handled via stepIds array in hook
    case 'prev':
      return state; // handled via stepIds array in hook
    case 'reset':
      return { ...state, activeStepId: '', expandedStepId: null, autoPlay: false };
    default:
      return state;
  }
}

export function useStepperState(stepIds: string[], initialStepId?: string) {
  const firstId = initialStepId ?? stepIds[0] ?? '';

  const [state, dispatch] = useReducer(stepperReducer, {
    activeStepId: firstId,
    expandedStepId: firstId,
    approvalMode: 'manual',
    autoPlay: false,
  });

  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentIndex = stepIds.indexOf(state.activeStepId);

  const goNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < stepIds.length) {
      const nextId = stepIds[nextIndex];
      dispatch({ type: 'select', stepId: nextId });
      dispatch({ type: 'toggleExpand', stepId: nextId });
    }
  }, [currentIndex, stepIds]);

  const goPrev = useCallback(() => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      const prevId = stepIds[prevIndex];
      dispatch({ type: 'select', stepId: prevId });
      dispatch({ type: 'toggleExpand', stepId: prevId });
    }
  }, [currentIndex, stepIds]);

  const selectStep = useCallback((stepId: string) => {
    dispatch({ type: 'select', stepId });
  }, []);

  const toggleExpand = useCallback((stepId: string) => {
    dispatch({ type: 'toggleExpand', stepId });
  }, []);

  const setApprovalMode = useCallback((mode: 'manual' | 'autonomous') => {
    dispatch({ type: 'setApprovalMode', mode });
  }, []);

  const startAutoPlay = useCallback(() => {
    dispatch({ type: 'reset' });
    dispatch({ type: 'select', stepId: stepIds[0] ?? '' });
  }, [stepIds]);

  useEffect(() => {
    if (state.autoPlay) {
      autoPlayRef.current = setTimeout(() => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < stepIds.length) {
          dispatch({ type: 'select', stepId: stepIds[nextIndex] });
        } else {
          dispatch({ type: 'reset' });
        }
      }, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [state.autoPlay, currentIndex, stepIds]);

  return {
    state,
    currentIndex,
    isFirst: currentIndex === 0,
    isLast: currentIndex === stepIds.length - 1,
    goNext,
    goPrev,
    selectStep,
    toggleExpand,
    setApprovalMode,
    startAutoPlay,
  };
}
