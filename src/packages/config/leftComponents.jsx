import { defineAsyncComponent } from 'vue';
/* 业务组件 */
const MyText = defineAsyncComponent(() => import('../components/text.vue'));
const MyButton = defineAsyncComponent(() => import('../components/button.vue'));
const MyBar = defineAsyncComponent(() => import('../components/bar.vue'));

function createEditorConfig() {
  const componentList = [];
  const componentMap = {};

  return {
    componentList,
    componentMap,
    register: (component) => {
      componentList.push(component);
      componentMap[component.key] = component;
    },
  };
}


export let registerConfig = createEditorConfig();


/* 这里初始化的时候一定要给 width height, 这样可以省事很多。不要在后面频繁的去 获取 dom, 而且异步组件不一定什么时候才生成 dom. */
registerConfig.register({
  label: '文本',
  preview: '预览文本icon',
  width: 90,
  height: 24,
  render: MyText,
  key: 'text',
});
registerConfig.register({
  label: '按钮',
  preview: '按钮icon',
  width: 116,
  height: 32,
  render: MyButton,
  key: 'button',
});
registerConfig.register({
  label: 'bar',
  preview: 'baricon',
  width: 260,
  height: 260,
  render: MyBar,
  key: 'bar',
});
