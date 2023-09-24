import { defineAsyncComponent } from 'vue';
/* 业务组件 */
const MyText = defineAsyncComponent(() => import('../components/text.vue'));
const MyButton = defineAsyncComponent(() => import('../components/button.vue'));

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

registerConfig.register({
  label: '文本',
  preview: '预览文本icon',
  render: MyText,
  key: 'text',
});
registerConfig.register({
  label: '按钮',
  preview: '按钮icon',
  render: MyButton,
  key: 'button',
});
