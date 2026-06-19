import { useState, useCallback } from 'react';
import type { Tweaks } from '../types';

export function useTweaks(defaults: Tweaks): [Tweaks, (key: keyof Tweaks, value: unknown) => void] {
  const [tweaks, setTweaks] = useState<Tweaks>(defaults);
  const setTweak = useCallback((key: keyof Tweaks, value: unknown) => {
    setTweaks(prev => ({ ...prev, [key]: value }));
  }, []);
  return [tweaks, setTweak];
}
