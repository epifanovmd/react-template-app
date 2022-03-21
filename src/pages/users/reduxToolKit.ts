import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "Api/dto/Users.g";
import { LoadState } from "Common/helpers/loadState";
import { RequestType } from "Common/helpers/requestType";
import { usersInitialState } from "Pages/users/IUsersState";
import { callApiToolkit } from "Store/common/apiActionsAsync";
import { arrayToObjectFromKey } from "@/common";

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
