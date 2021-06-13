import { useImperativeHandle, Ref } from "react";

type ListProps<ItemType> = {
  items: ItemType[];
  innerRef?: Ref<{ yideng(item: ItemType): void }>;
};

function App<ItemType>(props: ListProps<ItemType>) {
  //给ref挂载方法
  useImperativeHandle(props.innerRef, () => ({
    yideng() {},
  }));
  return null;
}

console.log(App);
