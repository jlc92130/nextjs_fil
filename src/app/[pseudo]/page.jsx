"use client";

import ConnectedLayout from "@/components/ConnectedLayout/ConnectedLayout";
import { useParams } from "next/navigation";

export default function Profile() {
  // Variable
  const params = useParams();
  const pseudo = params.pseudo.slice(3); //%43pseudo  => pseudo

  return <ConnectedLayout>{pseudo}</ConnectedLayout>;
}
