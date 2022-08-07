import dynamic from "next/dynamic";
import AppLayout from "../../layouts/AppLayout";

const GalleryContainer = dynamic(() => import("../../containers/gallery"), {
  ssr: false,
});
const Providers = dynamic(() => import("../../context/bridgesplit/Providers"), {
  ssr: false,
});

export default function StakingPage() {
  return <GalleryContainer />;
}
