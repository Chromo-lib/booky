import store from "../store";
import getFormData from "../utils/getFormData";

export default function onFormSettings(e: any) {
  e.preventDefault();
  const formData = getFormData(e.target)
  store.actions.setSettings(formData);
  window.location.reload();
}