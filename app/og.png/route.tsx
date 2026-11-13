import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Open Graph / Twitter image, served at /og.png and referenced from the [locale] layout metadata.
 * A route handler instead of the opengraph-image file convention: a root-level metadata image is
 * resolved before the [locale] layout sets metadataBase, which makes the build warn. The file
 * extension also keeps it out of the i18n proxy. Prerendered at build time (no request data).
 */
const size = { width: 1200, height: 630 };

/** Reads local fonts/photo once (cached) — keeps the OG image statically generated at build time. */
async function loadAssets() {
  "use cache";
  const root = process.cwd();
  const [jakarta, inter, photo] = await Promise.all([
    readFile(join(root, "assets/fonts/PlusJakartaSans-ExtraBold.woff")),
    readFile(join(root, "assets/fonts/Inter-Regular.woff")),
    readFile(join(root, "public/images/hero/hero-learner.jpg")),
  ]);
  return {
    jakarta: jakarta.toString("base64"),
    inter: inter.toString("base64"),
    photo: photo.toString("base64"),
  };
}

export async function GET() {
  const assets = await loadAssets();
  const jakarta = Buffer.from(assets.jakarta, "base64");
  const inter = Buffer.from(assets.inter, "base64");
  const photoSrc = `data:image/jpeg;base64,${assets.photo}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f9f8f3",
          padding: "72px 80px",
          alignItems: "center",
          gap: 64,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontFamily: "Inter",
              fontSize: 22,
              letterSpacing: 2.6,
              color: "#3157f6",
              textTransform: "uppercase",
            }}
          >
            luma. — learn at your own pace
          </div>
          <div
            style={{
              fontFamily: "Plus Jakarta Sans",
              fontSize: 72,
              lineHeight: 1.08,
              letterSpacing: -1.8,
              color: "#171b2c",
              marginTop: 24,
            }}
          >
            Build skills that actually move you forward.
          </div>
          <div style={{ fontFamily: "Inter", fontSize: 26, color: "#656770", marginTop: 28 }}>
            Practical courses taught by people who do the work every day.
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 380, height: 440 }}>
          <div
            style={{
              position: "absolute",
              right: -28,
              top: 20,
              bottom: 20,
              width: 80,
              borderRadius: 16,
              background: "#ffcb9f",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by Satori, not the browser */}
          <img
            src={photoSrc}
            alt=""
            width={380}
            height={440}
            style={{ borderRadius: 24, objectFit: "cover", position: "relative" }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plus Jakarta Sans", data: jakarta, weight: 800, style: "normal" },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
      ],
    },
  );
}
