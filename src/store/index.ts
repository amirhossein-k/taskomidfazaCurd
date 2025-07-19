// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usesrSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
