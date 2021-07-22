import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState:{
        roomId: null,
        user: null,
        docUserId: null,
        dataUpdated: null,
        userUid: null
    },
    reducers: {
        enterRoom: (state, action) =>{
            state.roomId = action.payload.roomId;
        },

        saveUserInfo: (state, action) => {
            state.user = action.payload.user;
        },

        docUserId: (state, action) => {
            state.docUserId = action.payload.docUserId
        },

        reset: (state, action) => {
            state.roomId = action.payload.initState;
            state.user = action.payload.initState;
            state.dataUpdated = action.payload.initState;
        },
        getDataState: (state, action) => {
            state.dataUpdated = action.payload.dataUpdated;
        },
        enterDirectMessage: (state, action) => {
            state.userUid = action.payload.userUid;
        }
     }
});

export const {enterRoom, saveUserInfo, docUserId, reset, getDataState, enterDirectMessage} = appSlice.actions;

export const selectRoomId = state => state.app.roomId;

export const selectUser = state => state.app.user;

export const selectDocId = state => state.app.docUserId;

export const selectDataState = state => state.app.dataUpdated;

export const selectUserDirect = state => state.app.userUid;

export default appSlice.reducer;