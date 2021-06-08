interface Disconnect {
  disconnect: () => void;
}

// 观察者模式，mobx是proxy，性能好一点
class Stateful<T> {
  // ts会自动把value注入到this
  constructor(protected value: T) {}

  private listeners = new Set<(value: T) => void>();

  public subscribe(callback: (value: T) => void): Disconnect {
    this.listeners.add(callback);
    return {
      disconnect: () => {
        this.listeners.delete(callback);
      },
    };
  }

  public snapshot(): T {
    return this.value;
  }

  // 执行回调
  public emit() {
    console.log('update');
    for (const listener of Array.from(this.listeners)) {
      listener(this.snapshot());
    }
  }

  protected update(value: T) {
    if (this.value !== value) {
      this.value = value;
      // 触发监听
      this.emit();
    }
  }
}

class Atomic<T> extends Stateful<T> {
  public setState(value: T) {
    super.update(value);
  }
}

// unknow，不能交互
export function atom<T>(value: { key: string; default: T }) {
  return new Atomic<T>(value.default);
}

// class作为类型
export function useRecoilValue<T>(value: Stateful<T>) {
  return value.snapshot();
}
