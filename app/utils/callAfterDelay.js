export default async function callAfterDelay(callback, delay) {
  await sleep(delay)
  await callback()
}
