import { reducerWithInitialState } from "typescript-fsa-reducers";
import {
  IMessage,
  IMessagesState,
  messagesInitialState,
} from "./IMessagesState";
import { MessagesActions } from "./messagesActions";
import { newState } from "Store/common/newState";
import { LoadState } from "Common/loadState";
import { Success } from "typescript-fsa";
import { IEmpty } from "Common/IEmpty";

function getMessagesStartedHandler(state: IMessagesState) {
  return newState(state, {
    messages: {
      loadState: LoadState.refreshing,
      data: state.messages.data,
      count: state.messages.data.length,
    },
  });
}

function getMessagesDoneHandler(
  state: IMessagesState,
  { result: messages }: Success<IEmpty, IMessage[]>,
) {
  return newState(
    state,
    newState(state, {
      messages: {
        loadState: LoadState.idle,
        data: messages,
        count: messages.length,
      },
    }),
  );
}

function getMessagesFailedHandler(state: IMessagesState) {
  return newState(
    state,
    newState(state, {
      messages: {
        loadState: LoadState.error,
        data: state.messages.data,
        count: state.messages.data.length,
      },
    }),
  );
}

function insertMessageStartedHandler(state: IMessagesState) {
  return newState(
    state,
    newState(state, {
      messages: {
        loadState: LoadState.refreshing,
        data: [...state.messages.data],
        count: state.messages.data.length,
      },
    }),
  );
}

function insertMessageDoneHandler(
  state: IMessagesState,
  { result: message }: Success<IEmpty, IMessage>,
) {
  return newState(
    state,
    newState(state, {
      messages: {
        loadState: LoadState.idle,
        data: [...state.messages.data, message],
        count: state.messages.data.length + 1,
      },
    }),
  );
}

function insertMessageFailedHandler(state: IMessagesState) {
  return newState(
    state,
    newState(state, {
      messages: {
        loadState: LoadState.error,
        data: [...state.messages.data],
        count: state.messages.data.length,
      },
    }),
  );
}

export const messagesReducer = reducerWithInitialState(messagesInitialState)
  .case(MessagesActions.getMessages.started, getMessagesStartedHandler)
  .case(MessagesActions.getMessages.done, getMessagesDoneHandler)
  .case(MessagesActions.getMessages.failed, getMessagesFailedHandler)

  .case(MessagesActions.insertMessage.started, insertMessageStartedHandler)
  .case(MessagesActions.insertMessage.done, insertMessageDoneHandler)
  .case(MessagesActions.insertMessage.failed, insertMessageFailedHandler)
  .build();
