import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";


// Initialisation de Supabase
const supabase = createClient(
  "https://dnowrakzwviryvkpqlzd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRub3dyYWt6d3Zpcnl2a3BxbHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5OTI0MTcsImV4cCI6MjA1NjU2ODQxN30.MQy_pnkg6Gxh88qPPv3aNMF-GVy2i30vXL3v_rBmsBw"
);

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        window.location.href = "/Odyss/Dashboard/index.html";
      }
      setLoading(false);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          navigate("/success");
        } else {
          navigate("/");
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [navigate]);

  // Fonction pour vérifier si un mot de passe est compromis
  async function isPasswordCompromised(password) {
    const hashedPassword = sha1(password).toString().toUpperCase();
    const prefix = hashedPassword.substring(0, 5);
    const suffix = hashedPassword.substring(5);

    try {
      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const hashes = await response.text();
      return hashes.includes(suffix); // Si le suffixe est trouvé, le mot de passe est compromis
    } catch (error) {
      console.error("Erreur lors de la vérification du mot de passe :", error);
      return false; // En cas d'erreur, on considère que le mot de passe est sûr (fail safe)
    }
  }

  // Fonction d'inscription avec vérification
  const handleSignup = async (email, password) => {
    setError(null);

    const isCompromised = await isPasswordCompromised(password);
    if (isCompromised) {
      setError("Ce mot de passe a été compromis dans des fuites de données. Veuillez en choisir un autre.");
      return;
    }

    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error("Erreur d'inscription :", error);
      setError(error.message);
    } else {
      console.log("Utilisateur inscrit :", user);
      window.location.href = "/Odyss/Dashboard/index.html";

    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["discord", "github"]}
          // Interception du formulaire pour ajouter la vérification du mot de passe
          view="sign_up"
          callback={(response) => {
            if (response && response.email && response.password) {
              handleSignup(response.email, response.password);
            }
          }}
        />
      </header>
    </div>
  );
}

export default Login;
