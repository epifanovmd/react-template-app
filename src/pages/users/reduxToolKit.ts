import { createSlice } from "@reduxjs/toolkit";
import { callApiToolkit } from "../../store/common/apiActionsAsync";
import { IUser } from "../../api/dto/Users.g";
import { arrayToObjectFromKey, LoadState, RequestType } from "../../common";
import { usersInitialState } from "./IUsersState";

export const fetchUsers = callApiToolkit<IUser[]>({
  url: "users",
  method: RequestType.GET,
  actionType: "USERS/GET_USERS",
});

export const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.users.loadState = LoadState.refreshing;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users.data = arrayToObjectFromKey(action.payload.data, "id");
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.users.loadState = LoadState.error;
      console.log("Error");
    });
  },
});

export const UsersActions = usersSlice.actions;
