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
    <div className="flex w-full min-h-screen">
      <div className="size-full">
        {children}
        <Fade>
          {images.map((img, index) => (
            <img key={index} src={img.url} alt={img.caption} />
          ))}
        </Fade>
      </div>
    </div>
  );
};
