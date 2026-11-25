import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postUserActivity } from '../../api/userActivityApi'

const initialState = {
  pendingKeys: {},
  sentKeys: {},
  lastActivity: null,
  error: null,
}

export const recordUserActivity = createAsyncThunk(
  'activity/recordUserActivity',
  async ({ activity, eventKey = activity, location }, { rejectWithValue }) => {
    try {
      const payload = {
        activity,
        ...(location ? { location } : {}),
      }
      const response = await postUserActivity(payload)

      return {
        activity,
        eventKey,
        recordedAt: new Date().toISOString(),
        response,
      }
    } catch (error) {
      return rejectWithValue({
        eventKey,
        message: error instanceof Error ? error.message : 'Unable to record activity',
      })
    }
  },
  {
    condition: ({ activity, eventKey = activity }, { getState }) => {
      const state = getState().activity
      return !state.pendingKeys[eventKey] && !state.sentKeys[eventKey]
    },
  },
)

const activitySlice = createSlice({
  name: 'activity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recordUserActivity.pending, (state, action) => {
        const { activity, eventKey = activity } = action.meta.arg
        state.pendingKeys[eventKey] = true
        state.error = null
      })
      .addCase(recordUserActivity.fulfilled, (state, action) => {
        const { activity, eventKey, recordedAt } = action.payload
        delete state.pendingKeys[eventKey]
        state.sentKeys[eventKey] = true
        state.lastActivity = { activity, recordedAt }
      })
      .addCase(recordUserActivity.rejected, (state, action) => {
        const { activity, eventKey = activity } = action.meta.arg
        delete state.pendingKeys[eventKey]

        if (!action.meta.condition) {
          state.error = action.payload?.message || action.error.message
        }
      })
  },
})

export const selectActivityState = (state) => state.activity

export default activitySlice.reducer
