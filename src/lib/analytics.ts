import { ANALYTICS_ID } from './constants';

export function trackEvent(name: string, props?: Record<string, string>) {
  if (!ANALYTICS_ID) return;
  // Plausible custom event — swap for GA4 if needed
  if (typeof window !== 'undefined' && 'plausible' in window) {
    (window as Window & { plausible: (n: string, o?: object) => void }).plausible(name, {
      props,
    });
  }
}

export function trackStepperInteraction(stepId: string) {
  trackEvent('Stepper Step View', { step: stepId });
}
