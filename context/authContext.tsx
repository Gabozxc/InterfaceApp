"use client";

import React, { Dispatch, createContext, useReducer, useEffect, useState } from "react";

type StateType = {
  token: string | null;
};

type ActionType = {
  type: string;
  payload?: string;
};

const initialState: StateType = {
  token: null,
};

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload || null };
    case "REMOVE_TOKEN":
      return { ...state, token: null };
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
