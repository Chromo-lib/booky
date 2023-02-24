import setTabBg from "../utils/setTabBg";

const imgTypes = ['image/jpeg', 'image/png', 'image/gif'];

export default function onChangeBg(e: any) {
  e.preventDefault();

  const file = e.target.elements[0].files[0];
  const widthFiler = e.target.elements[1].checked;
  const widthBlur = e.target.elements[2].checked;

  const reader: any = new FileReader();

  reader.onloadend = () => {
    if (imgTypes.includes(file.type)) {
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      localStorage.setItem('wallpaper', base64String);

      setTabBg({ widthBlur, widthFiler })      
    }
  };
  reader.readAsDataURL(file)

}