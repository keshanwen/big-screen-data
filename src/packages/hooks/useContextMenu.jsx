import { cloneDeep } from "../utils/util";

export function useContextMenu(bigScreenStore, command) {
  const lastSelectBlock = cloneDeep(bigScreenStore.lastSelectBlock)
  const focus = cloneDeep(bigScreenStore.focusData.focus)
  /*
  [
    {  label: '你好世界', icon: 'xxxx', onClick: () => console.log('hello wrold') }
  ]
  */

  // 当只有一个节点时。区分已经组合的和 未组合的
  if (focus.length === 1) {
    const commonContent = [
      { label: '锁定', icon: 'icon', onClick: () => { console.log('锁定') } },
      { label: '隐藏', icon: 'icon', onClick: () => { console.log('隐藏') } },
      { label: '复制', icon: 'icon', onClick: () => { console.log('复制') } },
      { label: '剪切', icon: 'icon', onClick: () => { console.log('剪切') } },
      { label: '粘贴', icon: 'icon', onClick: () => { console.log('粘贴') } },
      { label: '置顶', icon: 'icon', onClick: () => { console.log('置顶') } },
      { label: '置底', icon: 'icon', onClick: () => { console.log('置底') } },
      { label: '上移', icon: 'icon', onClick: () => { console.log('上移') } },
      { label: '下移', icon: 'icon', onClick: () => { console.log('下移') } },
      { label: '清空剪贴板', icon: 'icon', onClick: () => { console.log('清空剪贴板') } },
      { label: '删除', icon: 'icon', onClick: () => { console.log('删除') }},
    ]
    if (lastSelectBlock.group) {
      commonContent.unshift(
        { label: '解除分组', icon: 'icon', onClick: () => { console.log('解除分组') } }
     )
    }
    return commonContent
  }

  // 如果聚焦有大于两个，那么点击右键，显示 --》》 创建分组， 删除
  if (focus.length >= 2) {
    return [
      {
        label: '创建分组',
        icon: 'icon-group',
        onClick: () => command.group()
      },
      {
        label: '删除',
        icon: 'icon-group',
       onClick: () => console.log('删除')
      },
    ]
  }

}