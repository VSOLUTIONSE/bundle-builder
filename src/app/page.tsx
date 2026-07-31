import { BuilderProvider } from "@/context/BuilderContext";
import BuilderPanel from "@/components/builder/BuilderPanel";
import ReviewPanel from "@/components/review/ReviewPanel";

export default function Home() {
  return (
    <BuilderProvider>
      <div className="mx-auto w-full max-w-[1440px] bg-white px-0 py-8 tab:px-[105px] desktop:px-[122px] desktop:py-[49px]">
        <h1 className="mb-5 text-center align-middle font-['Gilroy-Bold',sans-serif] text-[31.88px] leading-[110%] text-[rgba(31,31,31,1)] tracking-[-0.06px] desktop:hidden">
          Let&apos;s get started!
        </h1>
        <div className="flex flex-col tab:gap-[33.58px] desktop:flex-row desktop:gap-[29px]">
          <div className="w-full desktop:w-[768px]">
            <BuilderPanel />
          </div>
          <div className="w-full desktop:w-[399px] desktop:self-start">
            <ReviewPanel />
          </div>
        </div>
      </div>
    </BuilderProvider>
  );
}
