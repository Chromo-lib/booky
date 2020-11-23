export default async function TimeZonesService () {
  try {
    const url = 'https://cdn.jsdelivr.net/npm/tthings@1.0.1/timezon.json';
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (error) {

  }
}