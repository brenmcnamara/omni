export default function runScript(cb: () => Promise<void>) {
  cb()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}
