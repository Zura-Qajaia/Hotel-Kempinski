import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { createClient } from "@supabase/supabase-js";
import { useLanguage } from "./../../LanguageContext";

export const supabaseUrl = "https://ksdrekezbbdukriuzlhx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZHJla2V6YmJkdWtyaXV6bGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk3MjU1NTYsImV4cCI6MjAyNTMwMTU1Nn0.SJNtfmNFCz8KV8aJkD1pLci89q9uMWFaA_YUPm6rP78";
const supabase = createClient(supabaseUrl, supabaseKey);

async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

function SignupForm() {
  const { translations } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Call the signup function to create a new user
      await signup({ fullName, email, password });
      // Clear form fields on successful signup
      setFullName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
      setError("");
      // Optionally, you can redirect the user to a different page after signup
      alert("Signup successful!");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <FormRow label={translations.fullName}>
        <Input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label={translations.emailAddress}>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label={translations.password}>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormRow>
      <FormRow label={translations.repeatPassword}>
        <Input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset">
          {translations.cancel}
        </Button>
        <Button type="submit">{translations.createUser}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
