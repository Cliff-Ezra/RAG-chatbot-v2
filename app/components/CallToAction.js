import CTAGooBG from "../../public/cta-goo-bg.webp";

export default function CallToAction() {
  // todo: make this real goo
  return (
    <div
      className="guide-footer-cta sm:flex items-center bg-pink-600 justify-between p-12 space-y-4"
      style={{
        background: `url(${CTAGooBG.src}) no-repeat center center`,
        backgroundSize: "cover",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div>
        <h1 className="text-2xl sm:text-3xl text-white font-bold">
          Law Guru👨🏽‍⚖️
        </h1>
        <p className="text-white mx-auto mt-2 sm:mt-0">
          A law chatbot for Kenya Law
        </p>
      </div>
    </div>
  );
}
