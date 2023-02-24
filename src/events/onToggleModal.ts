import { modalEL } from "../constants/defaults";

export default function onToggleModal (){
  const isOpen =  modalEL!.style.display === 'flex';
  modalEL!.style.display =isOpen? 'none':'flex'
}