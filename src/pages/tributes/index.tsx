import Footer from "../../components/Footer/Footer";
import TributesGrid from "../../components/TributesGrid/TributesGrid";
import MainLayout from "../../layouts/MainLayout";

export default function TributesPage() {
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-7xl leading-5 font-bold text-center">
            Atomic Particles
          </h1>

          <p className="w-3/4 mx-auto mt-8 mb-20 leading-6 text-center text-xl">
            These particles are dedicated to those uplifting the 1/1 space.
            These are the particles that bind our community together.
          </p>
        </div>

        <div className="max-w-[1200px]">
          <TributesGrid />
        </div>
      </div>
      <Footer />
    </MainLayout>
  );
}
