import { BuilderProvider } from "@/context/BuilderContext";
import BuilderPanel from "@/components/builder/BuilderPanel";
import ReviewPanel from "@/components/review/ReviewPanel";

export default function Home() {
  return (
    <BuilderProvider>
      <div className="mx-auto w-full max-w-[1440px] bg-white px-0 py-8 md:px-[105px] lg:px-[122px] lg:py-[49px]">
        <h1 className="mb-6 text-center font-['Gilroy-Bold',sans-serif] text-[2rem] leading-[35.1px] text-[rgba(31,31,31,1)] tracking-[-0.064px] lg:hidden">
          Let&apos;s get started!
        </h1>
        <div className="flex flex-col lg:flex-row lg:gap-[29px]">
          <div className="w-full lg:w-[768px]">
            <BuilderPanel />
          </div>
          <div className="w-full lg:w-[399px] lg:self-start">
            <ReviewPanel />
          </div>
        </div>
      </div>
    </BuilderProvider>
  );
}
