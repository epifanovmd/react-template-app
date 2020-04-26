import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "Api/dto/Users.g";
import { LoadState } from "Common/loadState";
import { createNormalize } from "Common/normalaizer";
import { popup } from "Common/popup";
import { RequestType } from "Common/requestType";
import { IUsersState, usersInitialState } from "Modules/users/IUsersState";
import { callApiToolkit } from "Store/common/apiActionsAsync";

export const fetchUsers = callApiToolkit<IUser[]>({
  url: "users",
  method: RequestType.GET,
  actionType: "USERS/GET_USERS",
  onFail: ({ error, extraArguments: { i18next } }) => {
    document &&
      popup.notification.error({
        message: i18next.t("error"),
        description: error?.message,
      });
  },
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
