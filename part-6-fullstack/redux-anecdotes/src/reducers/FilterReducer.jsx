import { createSlice } from "@reduxjs/toolkit"



const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterAction(state, action) {
            return action.payload
        },
    }
})


export const { filterAction } = filterSlice.actions;
export default filterSlice.reducer;