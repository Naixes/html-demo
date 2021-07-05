//Bad
// 库存查询
class InventoryRequester {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

// 库存跟踪
class InventoryTracker {
  constructor(items) {
    this.items = items;

    // 这里依赖一个特殊的请求类，其实我们只是需要一个请求方法。
    this.requester = new InventoryRequester();
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

const inventoryTracker = new InventoryTracker(['apples', 'bananas']);
inventoryTracker.requestItems();


//Good:
// 库存跟踪
class InventoryTracker {
  constructor(items, requester) {
    this.items = items;
    this.requester = requester;
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

// HTTP 请求
class InventoryRequesterHTTP {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

// webSocket 请求
class InventoryRequesterWS {
  constructor() {
    this.REQ_METHODS = ['WS'];
  }

  requestItem(item) {
    // ...
  }
}

// 通过依赖注入的方式将请求模块解耦，这样我们就可以很轻易的替换成 webSocket 请求。
const inventoryTracker = new InventoryTracker(['apples', 'bananas'], new InventoryRequesterHTTP());
inventoryTracker.requestItems();
