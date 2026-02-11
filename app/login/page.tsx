"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { BookOpen, Lock, Mail, User } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useRouter();

  async function submit(e : React.FormEvent) {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Fill all the fields to Login!");
      return;
    }
    try{
      console.log("Inside Login submit");
      const userData = { email, password };
      const res = await fetch('/api/auth/login', {
        method : 'POST',
        body : JSON.stringify(userData)
      })

      const data = await res.json();
      console.log(data);

      if(res.status == 200){
        alert("User Login success!");
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        navigate.push('/journals');
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4 gradient-warm">
        <div
          className="w-full max-w-md rounded-lg border border-border/30
           bg-card text-card-foreground
           shadow-sm
           animate-scale-in"
        >
          {/* <!-- Header --> */}
          <div className="flex flex-col space-y-1.5 p-6 pb-2 text-center">
            <div className="flex justify-center mb-4">
              <div
                className="w-16 h-16 rounded-2xl bg-(image:--gradient-peach)
                 flex items-center justify-center
                 shadow-soft"
              >
                <BookOpen className="w-8 h-8 text-primary-foreground" />
              </div>
             
            </div>

            <h3 className="font-display text-3xl font-semibold tracking-tight">
              MindMemo
            </h3>
            <p className="text-base text-muted-foreground">
              Your personal AI-powered journal
            </p>
          </div>

          {/* <!-- Form --> */}
          <div className="p-6 pt-6">
            <form className="space-y-4">
              
              {/* <!-- Email --> */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

                <input
                  value={email} onChange={(e) => setEmail(e.target.value)} name="email"
                  type="email"
                  placeholder="Email address"
                  required
                  className="flex h-10 w-full rounded-md border border-border/50
                   bg-background pl-10 px-3 py-2
                   text-base md:text-sm
                   placeholder:text-muted-foreground
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-ring focus-visible:ring-offset-2
                   disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* <!-- Password --> */}
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  value={password} onChange={(e) => setPassword(e.target.value)} name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="flex h-10 w-full rounded-md border border-border/50
                   bg-background pl-10 px-3 py-2
                   text-base md:text-sm
                   placeholder:text-muted-foreground
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-ring focus-visible:ring-offset-2
                   disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* <!-- Submit --> */}
              <button
                onClick={submit}
                type="submit"
                className="cursor-pointer inline-flex h-11 w-full items-center justify-center
                 rounded-md bg-primary px-4 py-2
                 text-sm font-medium text-primary-foreground
                 transition-colors hover:bg-primary/90
                 focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-ring focus-visible:ring-offset-2
                 disabled:pointer-events-none disabled:opacity-50"
              >
                Sign In
              </button>
            </form>

            {/* <!-- Footer --> */}
            <div className="mt-6 text-center">
              <p
                className="text-sm text-muted-foreground
                 transition-colors hover:text-foreground"
              >
                Don't have an account? <Link href={`/register`}>Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
