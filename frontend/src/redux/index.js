import { configureStore } from '@reduxjs/toolkit'
import { channelsApi } from './slice/channelsApi.js'
import { messagesApi } from './slice/messagesApi.js'
import ui from './slice/uiSlice.js'
import authSlice from './slice/authSlice.js'

const createStore = () => configureStore({
  reducer: {
    ui,
    auth: authSlice,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
    .concat(channelsApi.middleware).concat(messagesApi.middleware),
})

export default createStore
