
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, User, Lock } from "lucide-react";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0ea5e9] to-[#6366f1] p-4 animate-gradient-x relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-white/5 blur-3xl rounded-3xl transform -rotate-6"></div>
        
        <Card className="border-none shadow-2xl overflow-hidden bg-white/10 backdrop-blur-xl">
          <div className="bg-gradient-to-r from-[#0ea5e9] to-[#6366f1] h-2 w-full"></div>
          
          <CardHeader className="space-y-1 text-center pt-8">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Doughstock Optimizer
            </CardTitle>
            <CardDescription className="text-white/80">
              Sistem Manajemen Stok Bahan Baku Roti
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSignIn}>
            <CardContent className="space-y-5 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-white">Email Admin</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/60">
                    <User size={18} />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/30"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-white">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/60">
                    <Lock size={18} />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white/30"
                    required
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4 pb-8">
              <Button 
                className="w-full h-11 text-base font-medium bg-white hover:bg-white/90 text-[#0ea5e9] shadow-lg hover:shadow-xl transition-all duration-300"
                type="submit" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Masuk ke Sistem"
                )}
              </Button>
              <p className="text-xs text-center text-white/60 mt-2">
                Sistem ini hanya dapat diakses oleh admin yang berwenang
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
