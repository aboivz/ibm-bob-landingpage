import { Header } from '@components/layout/Header';
import { Footer } from '@components/layout/Footer';
import HeroSection from '@components/sections/01-Hero';
import ProblemSection from '@components/sections/02-Problem';
import MeetBobSection from '@components/sections/03-MeetBob';
import UseCaseIntroSection from '@components/sections/04-UseCaseIntro';
import SDLCStepperSection from '@components/sections/05-SDLCStepper';
import DashboardSection from '@components/sections/05b-Dashboard';
import ModesSection from '@components/sections/06-Modes';
import ApprovalSection from '@components/sections/07-Approval';
import MCPSection from '@components/sections/08-MCP';
import SecuritySection from '@components/sections/09-Security';
import ROISection from '@components/sections/10-ROI';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <MeetBobSection />
        <UseCaseIntroSection />
        <SDLCStepperSection />
        <DashboardSection />
        <ModesSection />
        <ApprovalSection />
        <MCPSection />
        <SecuritySection />
        <ROISection />
      </main>
      <Footer />
    </div>
  );
}
