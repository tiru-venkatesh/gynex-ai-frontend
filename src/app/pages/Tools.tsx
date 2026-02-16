import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Search, FileText, FileSearch, Receipt, MessageSquare, Database, ArrowRight } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { useNavigate } from "react-router-dom";

const tools = [
  { id: 'ocr', title: "OCR Engine", desc: "Extract text from scanned PDFs and images with high precision.", icon: FileText },
  { id: 'img2xl', title: "Image to Excel", desc: "Convert tabular data in images directly to editable .xlsx files.", icon: Database },
  { id: 'pdf2txt', title: "PDF to Text", desc: "Parse complex PDF layouts into structured text or JSON.", icon: FileSearch },
  { id: 'resume', title: "Resume Parser", desc: "Extract candidate details, skills, and experience automatically.", icon: FileText },
  { id: 'invoice', title: "Invoice Extractor", desc: "Automate accounts payable by extracting invoice fields.", icon: Receipt },
  { id: 'chat', title: "Chat with Document", desc: "Ask questions and get answers from your documents instantly.", icon: MessageSquare },
];

export function ToolsPage() {

  const navigate = useNavigate(); // ✅ REQUIRED

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] ml-64 p-8">

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Tools</h1>
          <p className="text-[#666666]">
            Select a specialized tool to process your documents.
          </p>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#999999]" />
          <Input
            placeholder="Search tools..."
            className="pl-10 bg-white border-[#F0F0F0] rounded-full shadow-sm"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card
            key={tool.id}
            className="bg-white border-[#F0F0F0] hover:border-[#F6A5C0]/30 hover:shadow-lg transition-all"
          >
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-[#FAFAFA] border flex items-center justify-center mb-4">
                <tool.icon className="w-6 h-6 text-[#666666]" />
              </div>

              <CardTitle className="text-xl">
                {tool.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-[#666666]">
                {tool.desc}
              </p>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full bg-[#FAFAFA] text-[#111111] hover:bg-[#F6A5C0] hover:text-white border hover:border-[#F6A5C0]"
                onClick={() => navigate(`/upload?tool=${tool.id}`)}
              >
                Launch Tool <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

    </div>
  );
}
