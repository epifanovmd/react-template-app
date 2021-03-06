import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "Api/dto/Users.g";
import { LoadState } from "Common/loadState";
import { createNormalize } from "Common/normalizer";
import { RequestType } from "Common/requestType";
import { IUsersState, usersInitialState } from "Pages/users/IUsersState";
import { callApiToolkit } from "Store/common/apiActionsAsync";

export const fetchUsers = callApiToolkit<IUser[]>({
  url: "users",
  method: RequestType.GET,
  actionType: "USERS/GET_USERS",
});

const { fromResponse, reducers } = createNormalize<IUser, IUsersState>();

export const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    ...reducers("users"),
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.users.loadState = LoadState.refreshing;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users.data = fromResponse(action.payload.data, "id");
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.users.loadState = LoadState.error;
      console.log("Error");
    });
  },
});

export const UsersActions = usersSlice.actions;
