import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState:{
        roomId: null,
        user: null,
        docUserId: null,
        dataUpdated: null,
        userUid: null,
        directMessageUid: null,
        isShowingSecondaryWorkspace: null,
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
            state.directMessageUid = action.payload.directMessageUid;
        },
        setUserProfileUid:(state, action) => {
            state.userUid = action.payload.userUid;
        },
        showSecondaryWorkspace:(state, action) => {
            state.isShowingSecondaryWorkspace = action.payload.isShowingSecondaryWorkspace;
        }
     }
});

export const { showSecondaryWorkspace,enterRoom, saveUserInfo, docUserId, reset, getDataState, enterDirectMessage, setUserProfileUid} = appSlice.actions;

export const selectRoomId = state => state.app.roomId;

export const selectUser = state => state.app.user;

export const selectDocId = state => state.app.docUserId;

export const selectDataState = state => state.app.dataUpdated;

export const selectUserDirect = state => state.app.directMessageUid;

export const selectUserProfileUid = state => state.app.userUid; 

export const selectSecondaryWorkspaceStatus = state => state.app.isShowingSecondaryWorkspace;

export default appSlice.reducer;