import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "Api/dto/Users.g";
import { LoadState } from "Common/loadState";
import { popup } from "Common/popup";
import { RequestType } from "Common/requestType";
import { usersInitialState } from "Modules/users/IUsersState";
import { callApiToolkit } from "Store/common/apiActionsAsync";
import { string } from "yup";

export const fetchUsers = callApiToolkit<IUser[]>({
  url: "users",
  method: RequestType.GET,
  actionType: "USERS/GET_USERS",
  onFail: ({ error, extraArguments: { i18next } }) => {
    popup.notification.error({
      message: i18next.t("error"),
      description: error?.message,
    });
  },
});

export const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    clearUsers: state => {
      state.users.data.keys = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, state => {
      state.users.loadState = LoadState.refreshing;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users.data = createNormalize(action.payload.data, "id");
    });
    builder.addCase(fetchUsers.rejected, state => {
      state.users.loadState = LoadState.error;
      console.log("Error");
    });
  },
});

export const { clearUsers } = usersSlice.actions;

export interface INormalizeData<T> {
  values: { [key in string | number]?: T };
  keys: T[keyof T][];
}
export const createNormalize = <T>(
  array?: T[],
  key?: keyof T,
): INormalizeData<T> => {
  const keys: T[keyof T][] = [];
  const values: { [key in string | number]?: T } = {};

  key &&
    array &&
    array.forEach(item => {
      keys.push(item[key]);
      values[item[key] as any] = item;
    });

  return {
    values,
    keys,
  };
};
