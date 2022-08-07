import dynamic from "next/dynamic";
const StakeWrapper = dynamic(
  () => import("@/components/Wrappers/StakeWrapper"),
  { ssr: false }
);

export default function StakingPage() {
  return <StakeWrapper />;
}
