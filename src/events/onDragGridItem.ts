export default function onDragGridItem(item: Muuri.Item, event?: any)  {
  const element = item.getElement() as HTMLDivElement;  
  const link = element.querySelector('a') as HTMLAnchorElement;  

  if(element.dataset.id === undefined || !link) {
    return;
  }
  
  if (event.type === 'end') link.style.pointerEvents = 'initial'
  else link.style.pointerEvents = 'none'
}