import getFormData from "../utils/getFormData";
import setTabBg from "../utils/setTabBg";

const imgTypes = ['image/jpeg', 'image/png', 'image/gif'];

export default function onFormBg(e: any) {
  e.preventDefault();

  const formData = getFormData<{ bg: File | null, widthBlur: boolean, widthFiler: boolean }>(e.target);

  const reader: any = new FileReader();

  reader.onloadend = () => {
    if (imgTypes.includes(formData.bg!.type)) {
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      localStorage.setItem('wallpaper', base64String);

      formData.bg = null;
      setTabBg({ ...formData, image: true })
    }
  };

  reader.readAsDataURL(formData.bg);
}