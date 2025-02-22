import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/signin");//เริ่มมาไปหน้า login
  return null;
}
