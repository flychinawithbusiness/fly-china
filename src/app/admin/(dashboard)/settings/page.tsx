import type { Metadata } from "next";
import SettingsForm from "./SettingsForm";

export const metadata: Metadata = { title: "Settings | Fly China Admin" };

export default function SettingsPage() {
  return <SettingsForm />;
}
