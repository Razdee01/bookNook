import { Banner } from "@/components/Banner";
import { CategorySection } from "@/components/CategorySection";
import { CtaBanner } from "@/components/CtaBanner";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeaturesSection></FeaturesSection>
      <CategorySection></CategorySection>
      <CtaBanner></CtaBanner>
      <Footer></Footer>
    </div>
  );
}
