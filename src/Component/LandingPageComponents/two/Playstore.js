import { GooglePlayButton } from "react-mobile-app-button";

export const Playstore = () => {
  const APKUrl = "https://play.google.com/store/apps/details?id=com.loanunbox.realscore&hl=en";

  return (
    <div className="play">
      <GooglePlayButton
      height={55}
      width={250}
        url={APKUrl}
        theme={"light"}
        className={"custom-style"}
      />
    </div>
  );
};