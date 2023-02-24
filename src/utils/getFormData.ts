export default function getFormData<T>(target: HTMLFormElement): T {
  const formData: any = {};

  for (const [key, element] of Object.entries(target.elements)) {
    const el = element as HTMLInputElement;

    if (el.nodeName === 'INPUT' && el!.value && isNaN(+key)) {
      let value: any = el.value;

      if (el.type === 'file') value = el!.files![0];
      if (el.type === 'checkbox') value = el.checked;

      formData[key] = value;
    }
  }

  return formData
}