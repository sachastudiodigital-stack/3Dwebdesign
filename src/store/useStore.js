import { create } from 'zustand'

const useStore = create((set) => ({
  form: { name: '', phone: '', date: '', guests: '', message: '' },
  submitted: false,
  setField: (field, value) => set((state) => ({ form: { ...state.form, [field]: value } })),
  setSubmitted: (val) => set({ submitted: val }),
  resetForm: () => set({ form: { name: '', phone: '', date: '', guests: '', message: '' }, submitted: false }),
}))

export default useStore
