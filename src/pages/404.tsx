import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <>
      <h1>{"notFound.0000"}</h1>
      <Link href="/">{"notFound.0001"}</Link>
    </>
  );
}
