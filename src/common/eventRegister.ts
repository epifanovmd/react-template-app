interface IListenerHandler {
  callback: (data: any) => void;
  id: string;
}

export const EventNames = { modalActions: "modalActions" };

class EventRegister {
  addEventListener<T>(eventName: string, callback: (data: T) => void) {
    const callbacks = this.getOrCreateListeners(eventName);
    const listenerId = eventName + callbacks.length;

    callbacks.push({
      id: listenerId,
      callback,
    });
    this.listenersToEvent.set(listenerId, eventName);

    return listenerId;
  }

  removeEventListener(listenerId: string) {
    const eventName = this.listenersToEvent.get(listenerId);

    if (eventName != null) {
      const listeners = this.getOrCreateListeners(eventName);

      this.listeners.set(
        eventName,
        listeners.filter(i => i.id != listenerId),
      );
    }
  }

  removeAllListeners(eventName: string) {
    this.listeners.delete(eventName);
  }

  emitEvent<T>(eventName: string, data?: T) {
    const listeners = this.listeners.get(eventName);

    if (listeners != null) {
      setTimeout(() => listeners.forEach(i => i.callback(data)));
    }
  }

  private getOrCreateListeners(eventName: string) {
    let listeners = this.listeners.get(eventName);

    if (listeners == null) {
      listeners = [];
      this.listeners.set(eventName, listeners);
    }

    return listeners;
  }

  private listeners = new Map<string, IListenerHandler[]>(); // eventName, listeners
  private listenersToEvent = new Map<string, string>(); // listenerId, eventName
}

export const eventRegister = new EventRegister();
