export default function runSuspendedScript(cb: () => Promise<void>) {
  cb().catch(error => {
    console.error(error);
    process.exit(1);
  });
}
