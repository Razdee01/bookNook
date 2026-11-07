import { Banner } from "@/components/Banner";
import { CategorySection } from "@/components/CategorySection";
import { CtaBanner } from "@/components/CtaBanner";
import { FeaturesSection } from "@/components/FeaturesSection";
import NewArivals from "@/components/NewArivals";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <NewArivals></NewArivals>
      <FeaturesSection></FeaturesSection>
      <CategorySection></CategorySection>
      <CtaBanner></CtaBanner>
    
    </div>
  );
}
