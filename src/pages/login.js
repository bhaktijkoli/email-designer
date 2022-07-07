import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import supabase from "../utils/supabase";

async function loginWithGoogle() {
  const { user, session, error } = await supabase.auth.signIn({
    // provider can be 'github', 'google', 'gitlab', and more
    provider: "google",
  });
}

export default function Login() {
  const [profie, setProfile] = useState(null);
  const router = useRouter();

  const loginWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "google",
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <Button variant="outlined" onClick={loginWithGoogle}>
        Login through google
      </Button>
    </div>
  );
}
