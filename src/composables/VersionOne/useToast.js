import { ref } from 'vue'

const toasts = ref([])

export function useToast() {
  const showToast = (message) => {
    const id = Date.now()
    toasts.value.push({ id, message })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3500)
  }
  return { toasts, showToast }
}
