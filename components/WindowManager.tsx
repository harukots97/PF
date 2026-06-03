'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { APP_REGISTRY } from '@/appRegistry';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  appId: string;
}

interface WindowManagerContextType {
  windows: WindowState[];
  openWindow: (appId: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updatePosition: (id: string, position: { x: number; y: number }) => void;
  activeWindowId: string | null;
}

type Action =
  | { type: 'OPEN'; appId: string }
  | { type: 'CLOSE'; id: string }
  | { type: 'MINIMIZE'; id: string }
  | { type: 'MAXIMIZE'; id: string }
  | { type: 'FOCUS'; id: string }
  | { type: 'UPDATE_POSITION'; id: string; position: { x: number; y: number } };

interface State {
  windows: WindowState[];
  nextZIndex: number;
  activeWindowId: string | null;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'OPEN': {
      const appDef = APP_REGISTRY[action.appId];
      if (!appDef) return state;
      const existing = state.windows.find(w => w.appId === action.appId);
      if (existing) {
        return {
          ...state,
          nextZIndex: state.nextZIndex + 1,
          activeWindowId: existing.id,
          windows: state.windows.map(w =>
            w.id === existing.id
              ? { ...w, isMinimized: false, zIndex: state.nextZIndex + 1 }
              : w
          ),
        };
      }
      const offset = Math.floor(Math.random() * 60) - 30;
      const newWindow: WindowState = {
        id: `${action.appId}-${Date.now()}`,
        title: appDef.title,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        position: {
          x: Math.max(50, (window.innerWidth - appDef.defaultSize.width) / 2 + offset),
          y: Math.max(50, (window.innerHeight - appDef.defaultSize.height) / 2 + offset),
        },
        size: appDef.defaultSize,
        zIndex: state.nextZIndex + 1,
        appId: action.appId,
      };
      return {
        ...state,
        nextZIndex: state.nextZIndex + 1,
        activeWindowId: newWindow.id,
        windows: [...state.windows, newWindow],
      };
    }
    case 'CLOSE':
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.id),
        activeWindowId: state.activeWindowId === action.id ? null : state.activeWindowId,
      };
    case 'MINIMIZE':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, isMinimized: true } : w
        ),
        activeWindowId: state.activeWindowId === action.id ? null : state.activeWindowId,
      };
    case 'MAXIMIZE':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, isMaximized: !w.isMaximized } : w
        ),
      };
    case 'FOCUS':
      return {
        ...state,
        nextZIndex: state.nextZIndex + 1,
        activeWindowId: action.id,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, zIndex: state.nextZIndex + 1 } : w
        ),
      };
    case 'UPDATE_POSITION':
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.id ? { ...w, position: action.position } : w
        ),
      };
    default:
      return state;
  }
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    windows: [],
    nextZIndex: 100,
    activeWindowId: null,
  });

  const openWindow = useCallback((appId: string) => dispatch({ type: 'OPEN', appId }), []);
  const closeWindow = useCallback((id: string) => dispatch({ type: 'CLOSE', id }), []);
  const minimizeWindow = useCallback((id: string) => dispatch({ type: 'MINIMIZE', id }), []);
  const maximizeWindow = useCallback((id: string) => dispatch({ type: 'MAXIMIZE', id }), []);
  const focusWindow = useCallback((id: string) => dispatch({ type: 'FOCUS', id }), []);
  const updatePosition = useCallback((id: string, position: { x: number; y: number }) =>
    dispatch({ type: 'UPDATE_POSITION', id, position }), []);

  return (
    <WindowManagerContext.Provider value={{
      windows: state.windows,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      focusWindow,
      updatePosition,
      activeWindowId: state.activeWindowId,
    }}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) throw new Error('useWindowManager must be used within WindowManagerProvider');
  return ctx;
}
