import { redirect } from "next/navigation";

export default function PreviewRedirect({ params }: { params: { packetId: string } }) {
  redirect(`/packets/${params.packetId}/preview`);
}
