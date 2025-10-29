import "react-slideshow-image/dist/styles.css";

import { Fade } from "react-slideshow-image";

import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";

type LayoutProps = {
  children: React.ReactNode;
};

const images = [
  { url: img1, caption: "img1" },
  { url: img2, caption: "img2" },
  { url: img3, caption: "img3" },
];
export const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div
      className="flex flex-col w-full min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(73, 127, 220, 0.2))",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        color: "#497FDC",
      }}
    >
      <div className="flex w-full h-screen">
        <div className="relative flex justify-center items-center w-1/2">
          {children}
        </div>
        <div className="m-4 w-1/2">
          <div className="rounded-lg h-full overflow-hidden">
            <Fade arrows={false} duration={3000} autoplay>
              {images.map((img, index) => (
                <img
                  className="size-full object-cover"
                  key={index}
                  src={img.url}
                  alt={img.caption}
                />
              ))}
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};
