import Image from "next/image";

/**
 * Decorative shapes around the final CTA (from 1280px — the mobile frame has none, and at
 * 1024px the cube would touch the heading).
 * Positions come from the 1280px Figma frame: shapes on the left half are anchored with
 * `left`, shapes on the right half with `right`, so they hug the edges on wider screens.
 */
export function CtaDecorations() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
      {/* Left side */}
      <span className="absolute top-4 left-5.5 size-27 rounded-full border-2 border-orange-light" />
      <span className="absolute top-[373px] left-14 size-30 rounded-full bg-orange-light" />
      <span className="absolute top-[235px] -left-7 size-14 rotate-12 rounded-lg bg-orange-light" />
      <span className="absolute top-[48px] left-[322px] size-14 rotate-12 rounded-lg border border-orange-light" />
      <Image
        src="/icons/decor/chat-bubble.svg"
        alt=""
        width={32}
        height={32}
        unoptimized
        className="absolute top-[214px] left-[141px]"
      />
      <Image
        src="/icons/decor/shape-b.svg"
        alt=""
        width={83}
        height={83}
        unoptimized
        className="absolute top-[369px] left-[281px] rotate-15"
      />

      {/* Right side */}
      <span className="absolute -top-[13px] right-2.5 size-[115px] rotate-12 rounded-lg bg-orange-light" />
      <span className="absolute top-[43px] right-[371px] size-8 rounded-full border-2 border-orange-light" />
      <span className="absolute top-[429px] right-10 size-8 rounded-full border-2 border-orange-light" />
      <span className="absolute top-[468px] right-44 size-10 rounded-full bg-orange-light" />
      <Image
        src="/icons/decor/drop.svg"
        alt=""
        width={61}
        height={61}
        unoptimized
        className="absolute top-[82px] right-[203px]"
      />
      <Image
        src="/icons/decor/cube.svg"
        alt=""
        width={160}
        height={160}
        unoptimized
        className="absolute top-[180px] right-10"
      />
      <Image
        src="/icons/decor/frame.svg"
        alt=""
        width={48}
        height={48}
        unoptimized
        className="absolute top-[381px] right-[269px]"
      />
    </div>
  );
}
