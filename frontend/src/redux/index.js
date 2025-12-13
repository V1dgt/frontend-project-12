import { configureStore } from '@reduxjs/toolkit'
import { channelsApi } from './store/channelsApi.js'
import { messagesApi } from './store/messagesApi.js'
import ui from './store/uiSlice.js'
import authSlice from './store/authSlice.js'

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
