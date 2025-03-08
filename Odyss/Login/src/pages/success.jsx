import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  "https://dnowrakzwviryvkpqlzd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRub3dyYWt6d3Zpcnl2a3BxbHpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5OTI0MTcsImV4cCI6MjA1NjU2ODQxN30.MQy_pnkg6Gxh88qPPv3aNMF-GVy2i30vXL3v_rBmsBw"
);

function Success() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        return;
      }
      setUser(data?.user || null);
    };

    getUserData();
  }, []);

  // Fonction pour se déconnecter
  const signOutUser = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/"); // Redirection vers l'accueil après la déconnexion
  };

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <>
            <h1>Success</h1>
            <p>Bienvenue, {user.email}</p>
            <button onClick={signOutUser}>Sign Out</button>
          </>
        ) : (
          <>
            <h1>User is not logged in</h1>
            <button onClick={() => navigate("/")}>Go back home!</button>
          </>
        )}
      </header>
    </div>
  );
}

export default Success;
