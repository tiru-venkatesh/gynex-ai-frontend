import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/app/components/ui/card";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import {
  UploadCloud,
  FileType,
  ArrowRight,
  Loader2,
  Send,
} from "lucide-react";

/* ================= CONFIG ================= */

const OCR_URL = "https://img2xl-backend-3-production.up.railway.app/extract-text";
const CHAT_URL = "https://img2xl-backend-3-production.up.railway.app/analyze";
const API_KEY = "GYNEX_OCR_123";

/* ================= COMPONENT ================= */

export function UploadPage() {

  const [searchParams] = useSearchParams();
  const defaultTool = searchParams.get("tool") || "ocr";

  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<number>(1);
  const [tool, setTool] = useState<string>(defaultTool);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [output, setOutput] = useState<string>("");
  const [chatInput, setChatInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);

  /* ================= AUTO STEP ================= */

  useEffect(() => {
    if (searchParams.get("tool")) setStep(2);
  }, []);

  /* ================= FILE SELECT ================= */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 10 * 1024 * 1024) {
      alert("File size must be under 10MB");
      return;
    }

    setFile(selected);
    setStep(1);
    setOutput("");
    setChatHistory([]);
  };

  const handleUpload = () => {
    if (!file) return;
    setStep(2);
  };

  /* ================= OCR PROCESS ================= */

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setOutput("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(OCR_URL, {
        method: "POST",
        headers: { "x-api-key": API_KEY },
        body: formData,
      });

      const data = await res.json();
      setOutput(data.text || "No text detected");

    } catch (err) {
      console.error(err);
      setOutput("Processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  /* ================= CHAT ================= */

  const sendChat = async () => {
    if (!chatInput.trim() || !output) return;

    const userMsg = chatInput;
    setChatInput("");

    setChatHistory((p) => [...p, { role: "user", text: userMsg }]);
    setChatHistory((p) => [...p, { role: "ai", text: "Thinking..." }]);

    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: output,
          question: userMsg,
        }),
      });

      const data = await res.json();

      setChatHistory((p) => {
        const copy = [...p];
        copy[copy.length - 1] = { role: "ai", text: data.answer };
        return copy;
      });

    } catch {
      setChatHistory((p) => {
        const copy = [...p];
        copy[copy.length - 1] = { role: "ai", text: "Server error" };
        return copy;
      });
    }
  };

  /* ================= UI ================= */

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">New Process</h2>
        <p className="text-muted-foreground">
          Upload documents and select an AI tool to process them.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* STEP 1 */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>1. Upload Document</CardTitle>
            <CardDescription>
              Supported: PDF, DOCX, JPG, PNG (max 10MB)
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition relative">

              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />

              <div className="mb-4 p-4 bg-indigo-100 rounded-full">
                <UploadCloud className="w-8 h-8 text-indigo-600" />
              </div>

              {file ? (
                <div className="text-center">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF, DOCX, JPG, PNG
                  </p>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="justify-between border-t p-4 bg-slate-50">
            <span className="text-xs text-muted-foreground">
              Secure encrypted upload
            </span>

            <Button disabled={!file} onClick={handleUpload}>
              Upload File <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* STEP 2 */}
        <Card className={step < 2 ? "opacity-50 pointer-events-none" : ""}>
          <CardHeader>
            <CardTitle>2. Select Tool</CardTitle>
          </CardHeader>

          <CardContent>
            <RadioGroup value={tool} onValueChange={setTool} className="space-y-4">

              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="ocr" id="ocr" />
                <Label htmlFor="ocr">OCR Extraction</Label>
                <FileType className="w-4 h-4 text-muted-foreground ml-auto" />
              </div>

              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="chatdoc" id="chatdoc" />
                <Label htmlFor="chatdoc">Chat with Document</Label>
                <FileType className="w-4 h-4 text-muted-foreground ml-auto" />
              </div>

            </RadioGroup>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full"
              disabled={!file || isProcessing}
              onClick={handleProcess}
            >
              {isProcessing ? "Processing..." : "Start Processing"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* OUTPUT */}
      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">{output}</pre>
          </CardContent>
        </Card>
      )}

      {/* CHAT */}
      {tool === "chatdoc" && output && (
        <Card>
          <CardHeader>
            <CardTitle>Chat with Document</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="h-64 overflow-y-auto border rounded-md p-3 mb-3">
              {chatHistory.map((m, i) => (
                <div
                  key={i}
                  className={`mb-2 ${
                    m.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <span
                    className={`inline-block px-3 py-2 rounded-md text-sm ${
                      m.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200"
                    }`}
                  >
                    {m.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                className="flex-1 border rounded-md px-3 py-2"
                placeholder="Ask something..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
              />

              <Button onClick={sendChat}>
                <Send className="w-4 h-4" />
              </Button>
            </div>

          </CardContent>
        </Card>
      )}

      {/* QUEUE */}
      {isProcessing && (
        <Card className="flex items-center p-4">
          <Loader2 className="w-5 h-5 animate-spin mr-3" />
          <span>Analyzing {file?.name}</span>
        </Card>
      )}

    </div>
  );
}
