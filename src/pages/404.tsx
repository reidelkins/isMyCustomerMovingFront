import { useEffect } from "react";

import Error from "next/error";
import { useRouter } from "next/router";

export default function Four0four() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, [router]);
  return <Error statusCode={404} />;
}
