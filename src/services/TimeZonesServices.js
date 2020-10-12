export default async function TimeZonesService () {
  try {
    const url = 'https://jsonblob.com/api/jsonBlob/f922d7c5-0c96-11eb-89ae-df9baa30f534';
    const resp = await fetch(url);
    const data = await resp.json();
    //localStorage.setItem('ctime-zones', JSON.stringify(data));
    return data;
  } catch (error) {

  }
}