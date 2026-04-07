import HeroContent from "./components/HeroContent";
import { SignInContent } from "./components/SignInContent";
const SignInPage = async () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <SignInContent />
      <HeroContent />
    </div>
  );
};

export default SignInPage;
