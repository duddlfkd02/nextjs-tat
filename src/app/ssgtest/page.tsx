import ssgServer from "@/app/utils/ssgServer";

export default async function ssgTestPage() {
  const data = await ssgServer();

  return (
    <div>
      <p>title</p>
      <p>body</p>
    </div>
  );
}
