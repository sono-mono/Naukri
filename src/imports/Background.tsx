import svgPaths from "./svg-14kgwtq3ns";
import imgWorker from "figma:asset/6087fee78766f721bbe83ad3064ed583f9ede296.png";
import imgRajesh from "figma:asset/9549fd5f187f521deb59bed58236188244e7e37e.png";
import imgPriya from "figma:asset/e6300e7f49a1799b3dbc5056412aadcf88a4d696.png";
import imgSuresh from "figma:asset/9fb0ec14349ee8ac9d0addb5f6c4a1c8a39c3ecf.png";

function Group() {
  return (
    <div className="absolute inset-[8.32%]" data-name="Group">
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.8361 12.8361">
          <g id="Group">
            <path d={svgPaths.p11301100} id="Vector" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
            <path d={svgPaths.p3bf3ae70} id="Vector_2" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="SVG">
      <Group />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[14px]" data-name="Container">
      <Svg />
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(26,60,110,0.12)] content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative rounded-[12px] shrink-0" data-name="Overlay">
      <Container2 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#1a3c6e] text-[13px] tracking-[0.65px] uppercase w-[157.69px]">
        <p className="leading-[normal] whitespace-pre-wrap">The Future of Work</p>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[70.4px] not-italic relative shrink-0 text-[#0f172a] text-[64px] tracking-[-1.92px] w-full whitespace-pre-wrap">
        <p className="mb-0">{`India's Workforce,`}</p>
        <p className="mb-0 text-[#1a3c6e]">Digitally</p>
        <p className="text-[#1a3c6e]">Empowered</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[1.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[32px] not-italic relative shrink-0 text-[#64748b] text-[20px] w-full whitespace-pre-wrap">
        <p className="mb-0">Connect with verified jobs and skilled talent instantly. Built</p>
        <p>for the core of India—fast, fair, and reliable.</p>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p358a3100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#1a3c6e] content-stretch flex gap-[8px] items-center justify-center px-[36px] py-[18px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white w-[78.38px]">
        <p className="leading-[normal] whitespace-pre-wrap">Find Work</p>
      </div>
      <Svg1 />
    </div>
  );
}

function Border() {
  return (
    <div className="content-stretch flex items-center justify-center px-[38px] py-[20px] relative rounded-[6px] shrink-0" data-name="Border">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] text-center w-[100.83px]">
        <p className="leading-[normal] whitespace-pre-wrap">Hire Workers</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[16px] items-center pt-[17.1px] relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <Border />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[22.9px] items-start max-w-[580px] min-h-px min-w-px relative" data-name="Container">
      <Overlay />
      <Heading />
      <Container3 />
      <Container4 />
    </div>
  );
}

function Worker() {
  return (
    <div className="aspect-[4/5] relative rounded-[12px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.15)] shrink-0 w-full" data-name="Worker">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
        <img alt="" className="absolute h-full left-[-43.75%] max-w-none top-0 w-[187.5%]" src={imgWorker} />
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[8.33%_8.33%_16.67%_8.33%]" data-name="Group">
      <div className="absolute inset-[-5.56%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 16.6667">
          <g id="Group">
            <path d={svgPaths.p17909700} id="Vector" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p6a2b00} id="Vector_2" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="SVG">
      <Group1 />
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(26,60,110,0.15)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[40px]" data-name="Overlay">
      <Svg2 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[19px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[15px] w-[113.64px]">
        <p className="leading-[normal] whitespace-pre-wrap">New Job Match</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[13px] w-[137.14px]">
        <p className="leading-[normal] whitespace-pre-wrap">Electrician • ₹900/day</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading3 />
      <Container7 />
    </div>
  );
}

function Background2() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[16px] items-center left-[-40px] px-[20px] py-[16px] rounded-[6px] top-[40px]" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[6px] shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.1)]" data-name="Overlay+Shadow" />
      <Overlay1 />
      <Container6 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[8.33%_16.67%_8.32%_16.67%]" data-name="Group">
      <div className="absolute inset-[-5%_-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 18.3361">
          <g id="Group">
            <path d={svgPaths.p23b4ae44} id="Vector" stroke="var(--stroke-0, #ECFDF5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p50f7f00} id="Vector_2" stroke="var(--stroke-0, #ECFDF5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="SVG">
      <Group2 />
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(236,253,245,0.15)] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[40px]" data-name="Overlay">
      <Svg3 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[19px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[15px] w-[109.39px]">
        <p className="leading-[normal] whitespace-pre-wrap">Verified Profile</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[13px] w-[140.84px]">
        <p className="leading-[normal] whitespace-pre-wrap">Aadhaar Authenticated</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading4 />
      <Container9 />
    </div>
  );
}

function Background3() {
  return (
    <div className="absolute bg-white bottom-[60px] content-stretch flex gap-[16px] items-center px-[20px] py-[16px] right-[-30px] rounded-[6px]" data-name="Background">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[6px] shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.1)]" data-name="Overlay+Shadow" />
      <Overlay2 />
      <Container8 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative rounded-[12px]" data-name="Container">
      <Worker />
      <Background2 />
      <Background3 />
    </div>
  );
}

function Container() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center max-w-[inherit] size-full">
        <div className="content-stretch flex gap-[64px] items-center justify-center max-w-[inherit] px-[48px] relative w-full">
          <Container1 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Section() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[rgba(26,60,110,0.03)] items-start left-0 overflow-clip pb-[120px] pt-[80px] px-[80px] right-0 to-[#f8fafc] top-[80px]" data-name="Section">
      <Container />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[49px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[40px] text-center tracking-[-0.8px] w-[252.45px]">
        <p className="leading-[normal] whitespace-pre-wrap">How it Works</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.69px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[58px] justify-center leading-[28.8px] not-italic relative shrink-0 text-[#64748b] text-[18px] text-center w-[529.6px] whitespace-pre-wrap">
        <p className="mb-0">Three simple steps to connect talent with opportunity. Built for</p>
        <p>simplicity and speed.</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[14.9px] items-start max-w-[600px] relative shrink-0 w-[600px]" data-name="Container">
      <Heading1 />
      <Container12 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[12.5%_8.33%]" data-name="Group">
      <div className="absolute inset-[-5.56%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 33.3333">
          <g id="Group">
            <path d={svgPaths.p311a7f00} id="Vector" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
            <path d={svgPaths.p25da9b80} id="Vector_2" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
            <path d="M30 10V20M35 15H25" id="Vector_3" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg4() {
  return (
    <div className="overflow-clip relative shrink-0 size-[40px]" data-name="SVG">
      <Group3 />
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="absolute bg-[#0f172a] content-stretch flex items-center justify-center p-[3px] right-[-8px] rounded-[12px] size-[28px] top-[-8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-3 border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#f8fafc] text-[14px] text-center w-[6.05px]">
        <p className="leading-[normal] whitespace-pre-wrap">1</p>
      </div>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="-translate-x-1/2 absolute bg-[rgba(26,60,110,0.08)] content-stretch flex items-center justify-center left-1/2 rounded-[12px] size-[80px] top-[49px]" data-name="Overlay">
      <Svg4 />
      <BackgroundBorder1 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[33px] right-[33px] top-[161px]" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[26px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[22px] text-center w-[202.11px]">
        <p className="leading-[normal] whitespace-pre-wrap">Create Your Profile</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[33px] pb-[0.685px] right-[33px] top-[202.1px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[77px] justify-center leading-[25.6px] not-italic relative shrink-0 text-[#64748b] text-[16px] text-center w-[254.46px] whitespace-pre-wrap">
        <p className="mb-0">Sign up in minutes using just your</p>
        <p className="mb-0">phone number. Add your skills,</p>
        <p>experience, and location.</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)]" data-name="Overlay+Shadow" />
      <Overlay3 />
      <Heading2 />
      <Container14 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Group">
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 36.6667">
          <g id="Group">
            <path d={svgPaths.p29db7df0} id="Vector" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
            <path d={svgPaths.p13248f00} id="Vector_2" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
            <path d={svgPaths.p324b1cf0} id="Vector_3" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="overflow-clip relative shrink-0 size-[40px]" data-name="SVG">
      <Group4 />
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="absolute bg-[#0f172a] content-stretch flex items-center justify-center p-[3px] right-[-8px] rounded-[12px] size-[28px] top-[-8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-3 border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#f8fafc] text-[14px] text-center w-[8.83px]">
        <p className="leading-[normal] whitespace-pre-wrap">2</p>
      </div>
    </div>
  );
}

function Overlay4() {
  return (
    <div className="-translate-x-1/2 absolute bg-[rgba(26,60,110,0.08)] content-stretch flex items-center justify-center left-1/2 rounded-[12px] size-[80px] top-[49px]" data-name="Overlay">
      <Svg5 />
      <BackgroundBorder3 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[33px] right-[33px] top-[161px]" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[26px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[22px] text-center w-[137.61px]">
        <p className="leading-[normal] whitespace-pre-wrap">Get Matched</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[33px] pb-[0.685px] right-[33px] top-[202.1px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[77px] justify-center leading-[25.6px] not-italic relative shrink-0 text-[#64748b] text-[16px] text-center w-[271.14px] whitespace-pre-wrap">
        <p className="mb-0">Our smart system instantly matches</p>
        <p className="mb-0">your profile with verified employers</p>
        <p>looking for your exact skills.</p>
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)]" data-name="Overlay+Shadow" />
      <Overlay4 />
      <Heading5 />
      <Container15 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[8.33%_8.33%_16.67%_8.33%]" data-name="Group">
      <div className="absolute inset-[-5.56%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.6667 33.3333">
          <g id="Group">
            <path d={svgPaths.p53ac080} id="Vector" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
            <path d={svgPaths.p1e22a700} id="Vector_2" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg6() {
  return (
    <div className="overflow-clip relative shrink-0 size-[40px]" data-name="SVG">
      <Group5 />
    </div>
  );
}

function BackgroundBorder5() {
  return (
    <div className="absolute bg-[#0f172a] content-stretch flex items-center justify-center p-[3px] right-[-8px] rounded-[12px] size-[28px] top-[-8px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-3 border-solid border-white inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#f8fafc] text-[14px] text-center w-[9.05px]">
        <p className="leading-[normal] whitespace-pre-wrap">3</p>
      </div>
    </div>
  );
}

function Overlay5() {
  return (
    <div className="-translate-x-1/2 absolute bg-[rgba(26,60,110,0.08)] content-stretch flex items-center justify-center left-1/2 rounded-[12px] size-[80px] top-[49px]" data-name="Overlay">
      <Svg6 />
      <BackgroundBorder5 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[33px] right-[33px] top-[161px]" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[26px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[22px] text-center w-[148.84px]">
        <p className="leading-[normal] whitespace-pre-wrap">Start Working</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-[33px] pb-[0.685px] right-[33px] top-[202.1px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[77px] justify-center leading-[25.6px] not-italic relative shrink-0 text-[#64748b] text-[16px] text-center w-[284.62px] whitespace-pre-wrap">
        <p className="mb-0">Connect directly, agree on terms, and</p>
        <p className="mb-0">start working. Earn ratings to unlock</p>
        <p>better opportunities.</p>
      </div>
    </div>
  );
}

function BackgroundBorder4() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] self-stretch" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)]" data-name="Overlay+Shadow" />
      <Overlay5 />
      <Heading6 />
      <Container16 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[40px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <BackgroundBorder2 />
      <BackgroundBorder4 />
    </div>
  );
}

function Container10() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[64px] items-center max-w-[inherit] px-[48px] relative w-full">
          <Container11 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 px-[80px] py-[96px] right-0 top-[1034px]" data-name="Section">
      <Container10 />
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#1a3c6e] text-[14px] tracking-[1.4px] uppercase w-full">
        <p className="leading-[normal] whitespace-pre-wrap">For Workers</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] relative w-full">
        <Container18 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[36px] tracking-[-0.72px] w-full whitespace-pre-wrap">
        <p className="mb-0">{`Dignity, Freedom & Better`}</p>
        <p>Pay</p>
      </div>
    </div>
  );
}

function Heading2Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[40px] relative w-full">
        <Heading7 />
      </div>
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p39be50} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#1a3c6e] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Background">
      <Svg7 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start pt-[2px] relative shrink-0 w-[28px]" data-name="Margin">
      <Background4 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[168.81px]">
        <p className="leading-[normal] whitespace-pre-wrap">Direct Connections</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[45px] justify-center leading-[22.5px] not-italic relative shrink-0 text-[#64748b] text-[15px] w-[406.53px] whitespace-pre-wrap">
        <p className="mb-0">No middlemen taking a cut. Talk directly to the employers</p>
        <p>and negotiate your own fair rates.</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[5.25px] items-start relative shrink-0" data-name="Container">
      <Heading8 />
      <Container22 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin1 />
      <Container21 />
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p39be50} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#1a3c6e] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Background">
      <Svg8 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start pt-[2px] relative shrink-0 w-[28px]" data-name="Margin">
      <Background5 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[131.45px]">
        <p className="leading-[normal] whitespace-pre-wrap">Verified Safety</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[45px] justify-center leading-[22.5px] not-italic relative shrink-0 text-[#64748b] text-[15px] w-[379.52px] whitespace-pre-wrap">
        <p className="mb-0">Every employer is verified to ensure you work in safe,</p>
        <p>reliable, and professional environments.</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[5.25px] items-start relative shrink-0" data-name="Container">
      <Heading9 />
      <Container25 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin2 />
      <Container24 />
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p39be50} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#1a3c6e] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Background">
      <Svg9 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start pt-[2px] relative shrink-0 w-[28px]" data-name="Margin">
      <Background6 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[189.23px]">
        <p className="leading-[normal] whitespace-pre-wrap">Build Your Reputation</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[45px] justify-center leading-[22.5px] not-italic relative shrink-0 text-[#64748b] text-[15px] w-[400.64px] whitespace-pre-wrap">
        <p className="mb-0">Earn ratings and reviews for your hard work, helping you</p>
        <p>secure more jobs at better pay over time.</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[5.25px] items-start relative shrink-0" data-name="Container">
      <Heading10 />
      <Container28 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin3 />
      <Container27 />
    </div>
  );
}

function Container19() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative w-full">
        <Container20 />
        <Container23 />
        <Container26 />
      </div>
    </div>
  );
}

function OverlayBorder() {
  return (
    <div className="bg-[rgba(26,60,110,0.04)] flex-[1_0_0] min-h-px min-w-px relative rounded-[12px] self-stretch" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(26,60,110,0.1)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[49px] py-[65px] relative size-full">
          <Margin />
          <Heading2Margin />
          <Container19 />
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#d97706] text-[14px] tracking-[1.4px] uppercase w-full">
        <p className="leading-[normal] whitespace-pre-wrap">For Employers</p>
      </div>
    </div>
  );
}

function Margin4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] relative w-full">
        <Container29 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[normal] not-italic relative shrink-0 text-[#0f172a] text-[36px] tracking-[-0.72px] w-full whitespace-pre-wrap">
        <p className="mb-0">{`Speed, Trust & Quality`}</p>
        <p>Talent</p>
      </div>
    </div>
  );
}

function Heading2Margin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[40px] relative w-full">
        <Heading11 />
      </div>
    </div>
  );
}

function Svg10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p29e7a880} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#f59e0b] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Background">
      <Svg10 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start pt-[2px] relative shrink-0 w-[28px]" data-name="Margin">
      <Background7 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[118.73px]">
        <p className="leading-[normal] whitespace-pre-wrap">Instant Hiring</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[45px] justify-center leading-[22.5px] not-italic relative shrink-0 text-[#64748b] text-[15px] w-[388.91px] whitespace-pre-wrap">
        <p className="mb-0">Post a job and start getting calls from available, nearby</p>
        <p>workers within minutes, not days.</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col gap-[5.25px] items-start relative shrink-0" data-name="Container">
      <Heading12 />
      <Container33 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin5 />
      <Container32 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[8.33%_16.67%_8.32%_16.67%]" data-name="Group">
      <div className="absolute inset-[-5%_-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14.6689">
          <g id="Group">
            <path d={svgPaths.p3d943700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d={svgPaths.p1d045800} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg11() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="SVG">
      <Group6 />
    </div>
  );
}

function Background8() {
  return (
    <div className="bg-[#f59e0b] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Background">
      <Svg11 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start pt-[2px] relative shrink-0 w-[28px]" data-name="Margin">
      <Background8 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[155.95px]">
        <p className="leading-[normal] whitespace-pre-wrap">Verified Identities</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[45px] justify-center leading-[22.5px] not-italic relative shrink-0 text-[#64748b] text-[15px] w-[417.42px] whitespace-pre-wrap">
        <p className="mb-0">Hire with confidence. All workers on BlueLink are Aadhaar-</p>
        <p>verified for complete peace of mind.</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[5.25px] items-start relative shrink-0" data-name="Container">
      <Heading13 />
      <Container36 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin6 />
      <Container35 />
    </div>
  );
}

function Svg12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p1149f380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Background9() {
  return (
    <div className="bg-[#f59e0b] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Background">
      <Svg12 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col h-[30px] items-start pt-[2px] relative shrink-0 w-[28px]" data-name="Margin">
      <Background9 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[186.95px]">
        <p className="leading-[normal] whitespace-pre-wrap">Skill-Based Matching</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.75px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[45px] justify-center leading-[22.5px] not-italic relative shrink-0 text-[#64748b] text-[15px] w-[427.14px] whitespace-pre-wrap">
        <p className="mb-0">Our algorithm ensures you only see candidates who actually</p>
        <p>match the trade and experience you need.</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col gap-[5.25px] items-start relative shrink-0" data-name="Container">
      <Heading14 />
      <Container39 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <Margin7 />
      <Container38 />
    </div>
  );
}

function Container30() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative w-full">
        <Container31 />
        <Container34 />
        <Container37 />
      </div>
    </div>
  );
}

function OverlayBorder1() {
  return (
    <div className="bg-[rgba(255,251,235,0.08)] flex-[1_0_0] min-h-px min-w-px relative rounded-[12px] self-stretch" data-name="Overlay+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(255,251,235,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[49px] py-[65px] relative size-full">
          <Margin4 />
          <Heading2Margin1 />
          <Container30 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[32px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <OverlayBorder />
      <OverlayBorder1 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute bg-[rgba(243,246,249,0.5)] content-stretch flex flex-col items-start left-0 px-[128px] py-[96px] right-0 top-[1741.38px]" data-name="Section">
      <Container17 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[56px] justify-center leading-[0] not-italic relative shrink-0 text-[#f59e0b] text-[56px] text-center w-[151.66px]">
        <p className="leading-[56px] whitespace-pre-wrap">12M+</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center tracking-[0.8px] uppercase w-[119.8px]">
        <p className="leading-[normal] whitespace-pre-wrap">Jobs Posted</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Heading15 />
      <Container42 />
    </div>
  );
}

function Heading16() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[56px] justify-center leading-[0] not-italic relative shrink-0 text-[#f59e0b] text-[56px] text-center w-[143.94px]">
        <p className="leading-[56px] whitespace-pre-wrap">8.5M</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center tracking-[0.8px] uppercase w-[158.38px]">
        <p className="leading-[normal] whitespace-pre-wrap">Workers Placed</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Heading16 />
      <Container44 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[56px] justify-center leading-[0] not-italic relative shrink-0 text-[#f59e0b] text-[56px] text-center w-[137.36px]">
        <p className="leading-[56px] whitespace-pre-wrap">150+</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center tracking-[0.8px] uppercase w-[142.34px]">
        <p className="leading-[normal] whitespace-pre-wrap">Cities Covered</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Heading17 />
      <Container46 />
    </div>
  );
}

function Heading18() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[56px] justify-center leading-[0] not-italic relative shrink-0 text-[#f59e0b] text-[56px] text-center w-[91.88px]">
        <p className="leading-[56px] whitespace-pre-wrap">4.8</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.8)] text-center tracking-[0.8px] uppercase w-[148.59px]">
        <p className="leading-[normal] whitespace-pre-wrap">Average Rating</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative self-stretch" data-name="Container">
      <Heading18 />
      <Container48 />
    </div>
  );
}

function Container40() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center max-w-[inherit] size-full">
        <div className="content-stretch flex gap-[32px] items-start justify-center max-w-[inherit] px-[48px] relative w-full">
          <Container41 />
          <Container43 />
          <Container45 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute bg-[#1a3c6e] content-stretch flex flex-col items-start left-0 p-[80px] right-0 top-[2496.38px]" data-name="Section">
      <Container40 />
    </div>
  );
}

function Heading19() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[49px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[40px] text-center tracking-[-0.8px] w-[323.31px]">
        <p className="leading-[normal] whitespace-pre-wrap">Stories of Impact</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[0.695px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[58px] justify-center leading-[28.8px] not-italic relative shrink-0 text-[#64748b] text-[18px] text-center w-[535.11px] whitespace-pre-wrap">
        <p className="mb-0">Hear from the millions of workers and businesses growing with</p>
        <p>BlueLink.</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col gap-[14.895px] items-start max-w-[600px] relative shrink-0 w-[600px]" data-name="Container">
      <Heading19 />
      <Container51 />
    </div>
  );
}

function Svg13() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg13 />
    </div>
  );
}

function Svg14() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg14 />
    </div>
  );
}

function Svg15() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg15 />
    </div>
  );
}

function Svg16() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg16 />
    </div>
  );
}

function Svg17() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg17 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <IconifyIcon />
      <IconifyIcon1 />
      <IconifyIcon2 />
      <IconifyIcon3 />
      <IconifyIcon4 />
    </div>
  );
}

function Margin8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] relative w-full">
        <Container53 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[-0.9px_0_32px_0] items-start" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[144px] justify-center leading-[28.8px] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[297.22px] whitespace-pre-wrap">
        <p className="mb-0">{`"Before BlueLink, I had to stand at`}</p>
        <p className="mb-0">the city square waiting for</p>
        <p className="mb-0">contractors. Now, the jobs come to</p>
        <p className="mb-0">my phone directly. My income has</p>
        <p>{`doubled."`}</p>
      </div>
    </div>
  );
}

function Margin9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container54 />
      </div>
    </div>
  );
}

function Rajesh() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[56px]" data-name="Rajesh">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRajesh} />
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[107.64px]">
        <p className="leading-[normal] whitespace-pre-wrap">Rajesh Kumar</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[133.94px]">
        <p className="leading-[normal] whitespace-pre-wrap">Electrician · Mumbai</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading20 />
      <Container57 />
    </div>
  );
}

function Container55() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative w-full">
        <Rajesh />
        <Container56 />
      </div>
    </div>
  );
}

function BackgroundBorder6() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[33px] py-[41px] relative rounded-[8px] self-stretch shrink-0 w-[373.33px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)]" data-name="Overlay+Shadow" />
      <Margin8 />
      <Margin9 />
      <Container55 />
    </div>
  );
}

function Svg18() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg18 />
    </div>
  );
}

function Svg19() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg19 />
    </div>
  );
}

function Svg20() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg20 />
    </div>
  );
}

function Svg21() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon8() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg21 />
    </div>
  );
}

function Svg22() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon9() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg22 />
    </div>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <IconifyIcon5 />
      <IconifyIcon6 />
      <IconifyIcon7 />
      <IconifyIcon8 />
      <IconifyIcon9 />
    </div>
  );
}

function Margin10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] relative w-full">
        <Container58 />
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[-0.9px_0_32px_0] items-start" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[144px] justify-center leading-[28.8px] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[296.81px] whitespace-pre-wrap">
        <p className="mb-0">{`"Finding verified, reliable plumbers`}</p>
        <p className="mb-0">used to take days. Yesterday, I</p>
        <p className="mb-0">posted a requirement and hired a</p>
        <p className="mb-0">great professional within 30</p>
        <p>{`minutes."`}</p>
      </div>
    </div>
  );
}

function Margin11() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container59 />
      </div>
    </div>
  );
}

function Priya() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[56px]" data-name="Priya">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgPriya} />
      </div>
    </div>
  );
}

function Heading21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[104.09px]">
        <p className="leading-[normal] whitespace-pre-wrap">Priya Sharma</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[154.52px]">
        <p className="leading-[normal] whitespace-pre-wrap">Facility Manager · Delhi</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading21 />
      <Container62 />
    </div>
  );
}

function Container60() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative w-full">
        <Priya />
        <Container61 />
      </div>
    </div>
  );
}

function BackgroundBorder7() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[33px] py-[41px] relative rounded-[8px] self-stretch shrink-0 w-[373.33px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)]" data-name="Overlay+Shadow" />
      <Margin10 />
      <Margin11 />
      <Container60 />
    </div>
  );
}

function Svg23() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon10() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg23 />
    </div>
  );
}

function Svg24() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon11() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg24 />
    </div>
  );
}

function Svg25() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon12() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg25 />
    </div>
  );
}

function Svg26() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon13() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg26 />
    </div>
  );
}

function Svg27() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="SVG">
          <path d={svgPaths.p2f71ed80} id="Vector" stroke="var(--stroke-0, #F59E0B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function IconifyIcon14() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative self-stretch shrink-0" data-name="iconify-icon">
      <Svg27 />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Container">
      <IconifyIcon10 />
      <IconifyIcon11 />
      <IconifyIcon12 />
      <IconifyIcon13 />
      <IconifyIcon14 />
    </div>
  );
}

function Margin12() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] relative w-full">
        <Container63 />
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute content-stretch flex flex-col inset-[-1.3px_0_32px_0] items-start" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[116px] justify-center leading-[28.8px] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[302.2px] whitespace-pre-wrap">
        <p className="mb-0">{`"The platform is so easy to use,`}</p>
        <p className="mb-0">even on a slow internet connection.</p>
        <p className="mb-0">The multilingual feature helped me</p>
        <p>{`find work in my native language."`}</p>
      </div>
    </div>
  );
}

function Margin13() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container64 />
      </div>
    </div>
  );
}

function Suresh() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[56px]" data-name="Suresh">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgSuresh} />
      </div>
    </div>
  );
}

function Heading22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[16px] w-[92.8px]">
        <p className="leading-[normal] whitespace-pre-wrap">Suresh Patil</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[142.92px]">
        <p className="leading-[normal] whitespace-pre-wrap">Delivery Agent · Pune</p>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading22 />
      <Container67 />
    </div>
  );
}

function Container65() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative w-full">
        <Suresh />
        <Container66 />
      </div>
    </div>
  );
}

function BackgroundBorder8() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start px-[33px] py-[41px] relative rounded-[8px] self-stretch shrink-0 w-[373.34px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05)]" data-name="Overlay+Shadow" />
      <Margin12 />
      <Margin13 />
      <Container65 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex gap-[32px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder6 />
      <BackgroundBorder7 />
      <BackgroundBorder8 />
    </div>
  );
}

function Container49() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center max-w-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[64px] items-center max-w-[inherit] px-[48px] relative w-full">
          <Container50 />
          <Container52 />
        </div>
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 px-[80px] py-[96px] right-0 top-[2740.38px]" data-name="Section">
      <Container49 />
    </div>
  );
}

function Svg28() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p2db27e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Background10() {
  return (
    <div className="bg-[#1a3c6e] content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[36px]" data-name="Background">
      <Svg28 />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-full" data-name="Container">
      <Background10 />
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[29px] justify-center leading-[0] not-italic relative shrink-0 text-[#f8fafc] text-[24px] tracking-[-0.72px] w-[96.5px]">
        <p className="leading-[normal] whitespace-pre-wrap">BlueLink</p>
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[320px] pb-[0.685px] relative shrink-0 w-[320px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[77px] justify-center leading-[25.6px] not-italic relative shrink-0 text-[#94a3b8] text-[16px] w-[298.94px] whitespace-pre-wrap">
        <p className="mb-0">Empowering the Core of the Nation.</p>
        <p className="mb-0">Connecting skilled workers with trusted</p>
        <p>employers across India seamlessly.</p>
      </div>
    </div>
  );
}

function Svg29() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p2c872cd8} id="Vector" stroke="var(--stroke-0, #F8FAFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container74() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg29 />
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start max-w-[320px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[16px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[10px] w-[49.88px]">
        <p className="leading-[16px] whitespace-pre-wrap">GET IT ON</p>
      </div>
    </div>
  );
}

function Heading23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 6">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#f8fafc] text-[14px] w-[80.52px]">
        <p className="leading-[normal] whitespace-pre-wrap">Google Play</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Container76 />
        <Heading23 />
      </div>
    </div>
  );
}

function BackgroundBorder9() {
  return (
    <div className="bg-[#1e293b] content-stretch flex gap-[12px] items-center px-[17px] py-[11px] relative rounded-[6px] self-stretch shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#334155] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container74 />
      <Container75 />
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex items-start pt-[0.9px] relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder9 />
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col gap-[23.1px] items-start relative self-stretch shrink-0 w-[396.8px]" data-name="Container">
      <Container71 />
      <Container72 />
      <Container73 />
    </div>
  );
}

function Heading24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#f8fafc] text-[16px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">For Workers</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Create Profile</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Browse Jobs</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Skill Assessments</p>
      </div>
    </div>
  );
}

function Item3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Safety Guidelines</p>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <Item />
      <Item1 />
      <Item2 />
      <Item3 />
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative self-stretch shrink-0 w-[198.39px]" data-name="Container">
      <Heading24 />
      <List />
    </div>
  );
}

function Heading25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#f8fafc] text-[16px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">For Employers</p>
      </div>
    </div>
  );
}

function Item4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Post a Job</p>
      </div>
    </div>
  );
}

function Item5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Search Workers</p>
      </div>
    </div>
  );
}

function Item6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Pricing Plans</p>
      </div>
    </div>
  );
}

function Item7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Enterprise Solutions</p>
      </div>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <Item4 />
      <Item5 />
      <Item6 />
      <Item7 />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative self-stretch shrink-0 w-[198.41px]" data-name="Container">
      <Heading25 />
      <List1 />
    </div>
  );
}

function Heading26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 4">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#f8fafc] text-[16px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Company</p>
      </div>
    </div>
  );
}

function Item8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">About Us</p>
      </div>
    </div>
  );
}

function Item9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Careers</p>
      </div>
    </div>
  );
}

function Item10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">{`Press & Media`}</p>
      </div>
    </div>
  );
}

function Item11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Item">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[15px] w-full">
        <p className="leading-[normal] whitespace-pre-wrap">Contact Support</p>
      </div>
    </div>
  );
}

function List2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="List">
      <Item8 />
      <Item9 />
      <Item10 />
      <Item11 />
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative self-stretch shrink-0 w-[198.39px]" data-name="Container">
      <Heading26 />
      <List2 />
    </div>
  );
}

function Container69() {
  return (
    <div className="content-stretch flex gap-[64px] items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container70 />
      <Container77 />
      <Container78 />
      <Container79 />
    </div>
  );
}

function Container80() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#94a3b8] text-[14px] w-[335.83px]">
          <p className="leading-[normal] whitespace-pre-wrap">© 2025 BlueLink Technologies. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

function Svg30() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p327a8900} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[20px]" data-name="Container">
      <Svg30 />
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Container83 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[8.33%_8.33%_12.5%_8.33%]" data-name="Group">
      <div className="absolute inset-[-5.26%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3334 17.5">
          <g id="Group">
            <path d={svgPaths.p21986800} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p6ab2500} id="Vector_2" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg31() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="SVG">
      <Group7 />
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[20px]" data-name="Container">
      <Svg31 />
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Container85 />
    </div>
  );
}

function Svg32() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p26ef1d00} id="Vector" stroke="var(--stroke-0, #94A3B8)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[20px]" data-name="Container">
      <Svg32 />
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container">
      <Container87 />
    </div>
  );
}

function Container81() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-start relative">
        <Container82 />
        <Container84 />
        <Container86 />
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[33px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#334155] border-solid border-t inset-0 pointer-events-none" />
      <Container80 />
      <Container81 />
    </div>
  );
}

function Container68() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[64px] items-start max-w-[inherit] px-[48px] relative w-full">
        <Container69 />
        <HorizontalBorder />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bottom-0 content-stretch flex flex-col items-start left-0 pb-[40px] pt-[80px] px-[80px] right-0" data-name="Footer" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1440 452.79\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(101.82 0 0 32.017 720 226.39)\\'><stop stop-color=\\'rgba(255,255,255,0.05)\\' offset=\\'0.029463\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0.029463\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(15, 23, 42) 0%, rgb(15, 23, 42) 100%)" }}>
      <Container68 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute inset-[12.5%_8.33%]" data-name="Group">
      <div className="absolute inset-[-5.56%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 20">
          <g id="Group">
            <path d={svgPaths.pef0db38} id="Vector" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p39f7e600} id="Vector_2" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg33() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="SVG">
      <Group8 />
    </div>
  );
}

function Overlay6() {
  return (
    <div className="bg-[rgba(26,60,110,0.08)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Overlay">
      <Svg33 />
    </div>
  );
}

function Heading27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[64.61px]">
        <p className="leading-[normal] whitespace-pre-wrap">200M+</p>
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[101.55px]">
        <p className="leading-[normal] whitespace-pre-wrap">Workers Reach</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading27 />
      <Container90 />
    </div>
  );
}

function Container88() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative w-full">
        <Overlay6 />
        <Container89 />
      </div>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute inset-[8.33%_16.67%]" data-name="Group">
      <div className="absolute inset-[-5%_-6.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 21.9998">
          <g id="Group">
            <path d={svgPaths.p2c09b400} id="Vector" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p3725e000} id="Vector_2" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg34() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="SVG">
      <Group9 />
    </div>
  );
}

function Overlay7() {
  return (
    <div className="bg-[rgba(26,60,110,0.08)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Overlay">
      <Svg34 />
    </div>
  );
}

function Heading28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[90.28px]">
        <p className="leading-[normal] whitespace-pre-wrap">50+ Cities</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[111.19px]">
        <p className="leading-[normal] whitespace-pre-wrap">Active Locations</p>
      </div>
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading28 />
      <Container93 />
    </div>
  );
}

function Container91() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative w-full">
        <Overlay7 />
        <Container92 />
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute inset-[8.35%_8.35%_8.32%_8.29%]" data-name="Group">
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0061 21.9983">
          <g id="Group">
            <path d={svgPaths.pcc0c780} id="Vector" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p17af0980} id="Vector_2" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg35() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="SVG">
      <Group10 />
    </div>
  );
}

function Overlay8() {
  return (
    <div className="bg-[rgba(26,60,110,0.08)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Overlay">
      <Svg35 />
    </div>
  );
}

function Heading29() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[50.33px]">
        <p className="leading-[normal] whitespace-pre-wrap">100%</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[106.69px]">
        <p className="leading-[normal] whitespace-pre-wrap">Verified Profiles</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading29 />
      <Container96 />
    </div>
  );
}

function Container94() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative w-full">
        <Overlay8 />
        <Container95 />
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute inset-[8.33%]" data-name="Group">
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
          <g id="Group">
            <path d={svgPaths.p390edb70} id="Vector" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pe208500} id="Vector_2" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p11cd2a00} id="Vector_3" stroke="var(--stroke-0, #1A3C6E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Svg36() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="SVG">
      <Group11 />
    </div>
  );
}

function Overlay9() {
  return (
    <div className="bg-[rgba(26,60,110,0.08)] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[48px]" data-name="Overlay">
      <Svg36 />
    </div>
  );
}

function Heading30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 5">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold h-[21px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[18px] w-[99.81px]">
        <p className="leading-[normal] whitespace-pre-wrap">AI Powered</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[106.06px]">
        <p className="leading-[normal] whitespace-pre-wrap">Smart Matching</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Heading30 />
      <Container99 />
    </div>
  );
}

function Container97() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center relative w-full">
        <Overlay9 />
        <Container98 />
      </div>
    </div>
  );
}

function BackgroundBorder10() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[32px] items-start justify-center left-[128px] px-[49px] py-[33px] right-[128px] rounded-[8px] top-[-60px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.08)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[8px] shadow-[0px_10px_30px_-10px_rgba(0,0,0,0.08)]" data-name="Overlay+Shadow" />
      <Container88 />
      <Container91 />
      <Container94 />
      <Container97 />
    </div>
  );
}

function Margin14() {
  return (
    <div className="absolute h-[54px] left-0 right-0 top-[980px]" data-name="Margin">
      <BackgroundBorder10 />
    </div>
  );
}

function Svg37() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p2db27e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Background11() {
  return (
    <div className="bg-[#1a3c6e] content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[36px]" data-name="Background">
      <Svg37 />
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Container">
      <Background11 />
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold h-[29px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[24px] tracking-[-0.72px] w-[96.5px]">
        <p className="leading-[normal] whitespace-pre-wrap">BlueLink</p>
      </div>
    </div>
  );
}

function Container103() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[15px] w-[95.69px]">
        <p className="leading-[normal] whitespace-pre-wrap">How It Works</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[15px] w-[87.3px]">
        <p className="leading-[normal] whitespace-pre-wrap">For Workers</p>
      </div>
    </div>
  );
}

function Container105() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[15px] w-[102.39px]">
        <p className="leading-[normal] whitespace-pre-wrap">For Employers</p>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[19px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[15px] w-[43.11px]">
        <p className="leading-[normal] whitespace-pre-wrap">About</p>
      </div>
    </div>
  );
}

function Container102() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Container103 />
      <Container104 />
      <Container105 />
      <Container106 />
    </div>
  );
}

function Container109() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#64748b] text-[14px] w-[5.03px]">
        <p className="leading-[normal] whitespace-pre-wrap">|</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[19.11px]">
        <p className="leading-[normal] whitespace-pre-wrap">EN</p>
      </div>
      <Container109 />
      <div className="flex flex-col font-['FreeSans:Semi_Bold',sans-serif] h-[17px] justify-center leading-[0] not-italic relative shrink-0 text-[#0f172a] text-[14px] w-[20.14px]">
        <p className="leading-[normal] whitespace-pre-wrap">हिंदी</p>
      </div>
    </div>
  );
}

function Background12() {
  return (
    <div className="bg-[#1a3c6e] content-stretch flex items-center justify-center px-[28px] py-[14px] relative rounded-[6px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[19px] justify-center leading-[0] not-italic relative shrink-0 text-[15px] text-center text-white w-[82.53px]">
        <p className="leading-[normal] whitespace-pre-wrap">Get Started</p>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Container">
      <Container108 />
      <Background12 />
    </div>
  );
}

function Container100() {
  return (
    <div className="max-w-[1280px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center max-w-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] pl-[48px] pr-[48.02px] relative w-full">
          <Container101 />
          <Container102 />
          <Container107 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="absolute bg-[#f8fafc] content-stretch flex flex-col items-start left-0 pb-[17px] pt-[16px] px-[80px] right-0 top-0" data-name="Nav">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.08)] border-b border-solid inset-0 pointer-events-none" />
      <Container100 />
    </div>
  );
}

export default function Background() {
  return (
    <div className="bg-[#f8fafc] relative size-full" data-name="Background">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Footer />
      <Margin14 />
      <Nav />
    </div>
  );
}