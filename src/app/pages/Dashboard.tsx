import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";

import {
  UploadCloud,
  Search,
  Bell,
  Loader2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";

/* ================= CONFIG ================= */

const BASE_URL = "http://localhost:8080";
const API_KEY = "GYNEX_OCR_123";

/* ================= COMPONENT ================= */

export function Dashboard() {

  /* ---------- AUTH ---------- */
  const [user, setUser] = useState<any>(null);

  /* ---------- CORE STATES ---------- */
  const [output, setOutput] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [asking, setAsking] = useState(false);

  /* ================= AUTH PROTECT ================= */

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) window.location.href = "/login";
      else setUser(u);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

  /* ================= LOGOUT ================= */

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  /* ================= UPLOAD → OCR ================= */

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setOutput("");
      setAnswer("");

      const res = await fetch(`${BASE_URL}/extract-text`, {
        method: "POST",
        headers: {
          "x-api-key": API_KEY
        },
        body: formData
      });

      const data = await res.json();
      setOutput(data.text || "No text detected");

    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ================= CHAT WITH DOCUMENT ================= */

  const askDocument = async () => {
    if (!output || !question) return;

    try {
      setAsking(true);

      const res = await fetch(`${BASE_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: output,
          question
        })
      });

      const data = await res.json();
      setAnswer(data.answer);

    } catch {
      alert("AI failed");
    } finally {
      setAsking(false);
    }
  };

  /* ================= EXPORT TO EXCEL ================= */

  const exportExcel = async () => {
    if (!output) return;

    const res = await fetch(`${BASE_URL}/extract-text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: output })
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "gynex-output.xlsx";
    a.click();
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 ml-64">

      {/* TOP BAR */}
      <header className="h-20 border-b bg-white flex items-center justify-between px-10">

        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search..."
            className="pl-11 h-11 rounded-full bg-slate-50"
          />
        </div>

        <div className="flex items-center gap-5">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5 text-slate-500" />
          </Button>

          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>

          <Avatar>
            <AvatarImage src={user?.photoURL || "https://i.pravatar.cc/100"} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* MAIN */}
      <main className="p-10 space-y-8">

        {/* UPLOAD */}
        <Card>
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
          </CardHeader>

          <CardContent>
            <label className="border-2 border-dashed rounded-xl p-14 flex flex-col items-center justify-center cursor-pointer bg-slate-50">

              <UploadCloud className="w-10 h-10 text-rose-400 mb-4" />
              <p>Click or drag file</p>

              <input hidden type="file" onChange={handleUpload} />

              {uploading && (
                <Loader2 className="mt-4 animate-spin" />
              )}

            </label>
          </CardContent>
        </Card>

        {/* OCR OUTPUT */}
        {output && (
          <Card>
            <CardHeader>
              <CardTitle>Extracted Text</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="whitespace-pre-wrap text-sm">{output}</pre>

              <div className="mt-4 flex gap-4">
                <Button onClick={exportExcel}>
                  Export Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CHAT */}
        {output && (
          <Card>
            <CardHeader>
              <CardTitle>Chat With Document</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">

              <Input
                placeholder="Ask question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />

              <Button onClick={askDocument} disabled={asking}>
                {asking ? "Thinking..." : "Ask"}
              </Button>

              {answer && (
                <div className="p-3 bg-slate-100 rounded">
                  {answer}
                </div>
              )}

            </CardContent>
          </Card>
        )}

      </main>
    </div>
  );
}
