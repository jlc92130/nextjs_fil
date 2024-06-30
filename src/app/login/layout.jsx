import Image from "next/image";
import Footer from "../../components/Footer/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col ">
      {/* Image entete    */}
      <div className="absolute top-0 left-0 right-0 bottom-0 h-20 z-0">
        <Image
          src="/welcome.webp"
          alt="welcom"
          fill
          sizes="100vw"
          className="object-content"
        />
      </div>
      {/* Content */}
      <div className="flex-1 z-10 pt-[20vw]">{children}</div>
      {/* Footer  */}
      <Footer />
    </div>
  );
}
