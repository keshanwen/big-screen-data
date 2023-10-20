<template>
  <div>
    hello wrold {{ name }}
  </div>
  <button @click="changeCb">change</button>
  </template>


<script setup>
import { reactive, toRef, toRefs } from 'vue'


const state = reactive({
  name: 'kebi',
  age: 24
})

// const { name } = state
// const name = toRef(state, 'name')
const { name } = toRefs(state)


console.log(name)


const changeCb = () => {
  // state.name = 'change kebi'
  name.value = 'i am change kebi'
  console.log(state.name)
}

</script>