import { defineAsyncComponent } from 'vue'
import Loading from '../layout/loading.vue'

export const loadAsyncComponent = (loader) => {
  return defineAsyncComponent({
    loader,
    loadingComponent: Loading,
    delay: 2000,
  })
}
