export interface AtomicSubscription {
  remove: () => void;
}

export interface RunnableSubscription extends AtomicSubscription {
  run: () => void;
}

export interface StoppabbleSubscription extends RunnableSubscription {
  stop: () => void;
}
