import { getAllBlockIds } from "@/lib/blocks";
import { BlockDisplay } from "@/components/block-display";
import Header from "@/app/header";

export default async function BlocksPage() {
  const blocks = await getAllBlockIds();

  return (
    <>
      <Header />
      {blocks.map((name, index) => (
        <BlockDisplay key={`${name}-${index}`} name={name} />
      ))}
    </>
  );
}
