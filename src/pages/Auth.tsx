
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Login berhasil",
        description: "Anda berhasil masuk ke sistem",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login gagal",
        description: error.message,
      });
      console.error("Error signing in:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[hsl(220,20%,97%)]">
      <div className="w-full max-w-sm mx-4">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[hsl(220,13%,18%)] mb-5">
            <span className="text-white text-lg font-semibold">D</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-[hsl(220,13%,18%)]">
            Doughstock Optimizer
          </h1>
          <p className="text-sm text-[hsl(220,10%,54%)] mt-1">
            Sistem Manajemen Stok Bahan Baku
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04),0_6px_24px_rgba(0,0,0,0.06)] p-8">
          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[13px] font-medium text-[hsl(220,13%,30%)]">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-[hsl(220,15%,90%)] bg-white text-sm text-[hsl(220,13%,18%)] placeholder:text-[hsl(220,10%,72%)] outline-none transition-all focus:border-[hsl(220,13%,40%)] focus:ring-2 focus:ring-[hsl(220,13%,40%,0.08)]"
                required
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-[13px] font-medium text-[hsl(220,13%,30%)]">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3.5 rounded-lg border border-[hsl(220,15%,90%)] bg-white text-sm text-[hsl(220,13%,18%)] placeholder:text-[hsl(220,10%,72%)] outline-none transition-all focus:border-[hsl(220,13%,40%)] focus:ring-2 focus:ring-[hsl(220,13%,40%,0.08)]"
                required
              />
            </div>

            <button 
              className="w-full h-11 rounded-lg bg-[hsl(220,13%,18%)] text-white text-sm font-medium transition-colors hover:bg-[hsl(220,13%,26%)] disabled:opacity-50 disabled:cursor-not-allowed mt-1"
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memproses...
                </span>
              ) : (
                "Masuk"
              )}
            </button>
          </form>
        </div>

        <p className="text-xs text-center text-[hsl(220,10%,64%)] mt-6">
          Hanya untuk admin yang berwenang
        </p>
      </div>
    </div>
  );
};

export default Auth;
