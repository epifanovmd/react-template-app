import {reducerWithInitialState} from "typescript-fsa-reducers";
import {IMessage, IMessagesState, messagesInitialState} from "./IMessagesState";
import {MessagesActions} from "./messagesActions";
import {newState} from "../../store/common/newState";
import {LoadState} from "../../common/loadState";
import {Success} from "typescript-fsa";
import {IEmpty} from "../../common/IEmpty";

function getMessagesStartedHandler(state: IMessagesState) {
  return newState(state, {
    messages: {
      loadState: LoadState.refreshing,
      items: state.messages.items,
    },
  });
}

function getMessagesDoneHandler(state: IMessagesState, {result: messages}: Success<IEmpty, IMessage[]>) {
  return newState(state, newState(state, {
    messages: {
      loadState: LoadState.idle,
      items: messages,
    },
  }));
}

function getMessagesFailedHandler(state: IMessagesState) {
  return newState(state, newState(state, {
    messages: {
      loadState: LoadState.error,
      items: state.messages.items,
    },
  }));
}

function insertMessageHandler(state: IMessagesState, message: IMessage) {
  return newState(state, newState(state, {
    messages: {
      loadState: LoadState.idle,
      items: [...state.messages.items, message],
    },
  }));
}

export const messagesReducer = reducerWithInitialState(messagesInitialState)
  .case(MessagesActions.getMessages.started, getMessagesStartedHandler)
  .case(MessagesActions.getMessages.done, getMessagesDoneHandler)
  .case(MessagesActions.getMessages.failed, getMessagesFailedHandler)

  .case(MessagesActions.insertMessage, insertMessageHandler)
  .build();
