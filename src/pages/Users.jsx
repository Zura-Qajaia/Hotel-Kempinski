import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import { useLanguage } from "../LanguageContext";
function NewUsers() {
  const { translations } = useLanguage();
  return (
    <>
      <Heading as="h1">{translations.createUser}</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
