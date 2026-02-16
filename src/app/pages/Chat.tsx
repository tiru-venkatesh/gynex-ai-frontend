import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { DevAnnotation } from "../components/DevAnnotation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I've analyzed your document. What would you like to know?",
    },
  ]);

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send Message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      // 🔁 Replace with real API later
      await new Promise((r) => setTimeout(r, 1000));

      const botMsg: Message = {
        role: "assistant",
        content: "The total amount due is $1,250.00 payable by March 1st, 2026.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.14))] max-h-[900px]">

      {/* Header */}
      <div className="p-6 border-b flex items-center justify-between bg-white dark:bg-slate-950">
        <div>
          <h2 className="text-xl font-bold">Chat with Document</h2>
          <p className="text-sm text-muted-foreground">
            Ask questions about "invoice_2024.pdf"
          </p>
        </div>
        <Button variant="outline" size="sm">
          Change Document
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-6 max-w-3xl mx-auto">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-4 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar>
                <AvatarFallback>
                  {msg.role === "user" ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Bot className="w-5 h-5" />
                  )}
                </AvatarFallback>
              </Avatar>

              <div
                className={`p-4 rounded-lg max-w-[80%] text-sm ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-slate-100 dark:bg-slate-800 rounded-tl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex gap-4">
              <Avatar>
                <AvatarFallback>
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg rounded-tl-none">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <Input
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />

          <Button size="icon" onClick={handleSend} disabled={isSending}>
            <Send className="w-4 h-4" />
          </Button>

          <DevAnnotation
            title="Send Chat Message"
            method="POST"
            endpoint="/api/chat"
            payload={{
              fileId: "abc123",
              message: input,
            }}
            response={{
              reply: "AI response text",
            }}
          />
        </div>
      </div>
    </div>
  );
}
