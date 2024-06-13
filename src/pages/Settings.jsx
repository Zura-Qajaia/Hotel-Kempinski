import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useLanguage } from "../LanguageContext";

function Settings() {
  const { translations } = useLanguage();
  return (
    <Row>
      <Heading as="h1">{translations.header}</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
