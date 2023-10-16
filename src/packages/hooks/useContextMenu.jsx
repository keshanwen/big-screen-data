import { cloneDeep } from "../utils/util";

export function useContextMenu(bigScreenStore, command, block) {
  const lastSelectBlock = cloneDeep(bigScreenStore.lastSelectBlock)
  const focus = cloneDeep(bigScreenStore.focusData.focus)
  // const showLock = focus.some(block => !block.lock)
  const showLock = !block.lock
  /*
  [
    {  label: '你好世界', icon: 'xxxx', onClick: () => console.log('hello wrold') }
  ]
  */
  let commonContent =  [
      showLock ? { label: '锁定', icon: 'icon', onClick: () => { command.lock(block) } } : {
        label: '解锁', icon: 'icon', onClick: () => { command.unlock(block) }
      },
      { label: '隐藏', icon: 'icon', onClick: () => { console.log('隐藏') } },
      { label: '复制', icon: 'icon', onClick: () => { console.log('复制') } },
      { label: '剪切', icon: 'icon', onClick: () => { console.log('剪切') } },
      { label: '粘贴', icon: 'icon', onClick: () => { console.log('粘贴') } },
      { label: '置顶', icon: 'icon', onClick: () => { console.log('置顶') } },
      { label: '置底', icon: 'icon', onClick: () => { console.log('置底') } },
      { label: '上移', icon: 'icon', onClick: () => { console.log('上移') } },
      { label: '下移', icon: 'icon', onClick: () => { console.log('下移') } },
      { label: '清空剪贴板', icon: 'icon', onClick: () => { console.log('清空剪贴板') } },
      { label: '删除', icon: 'icon', onClick: () => { command.delete(block) }},
    ]
  let content = []

  // 当只有一个节点时。区分已经组合的和 未组合的
  if (focus.length === 1) {
    content = content.concat(commonContent)
    if (lastSelectBlock?.group) {
      content.unshift(
        { label: '解除分组', icon: 'icon', onClick: () => { command.removeGroup() } }
     )
    }
   // return content
  }

  // 如果聚焦有大于两个，那么点击右键，显示 --》》 创建分组， 删除
  if (focus.length >= 2) {
    content = [
      {
        label: '创建分组',
        icon: 'icon-group',
        onClick: () => command.group()
      },
      {
        label: '删除',
        icon: 'icon-group',
       onClick: () => command.delete(block)
      },
    ]
  }

  if (block.focus) {
    return content
  } else {
    return commonContent
  }


}