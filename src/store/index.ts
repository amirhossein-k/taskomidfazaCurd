// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usesrSlice'
import navReducer from './navSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    nav:navReducer,
    auth:authReducer
  },
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
