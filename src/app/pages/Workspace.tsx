import React, { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Send, Bot, User, Download, FileText, X, Maximize2, RotateCcw } from "lucide-react";
import { Link } from 'react-router-dom';

export function WorkspacePage() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: "Hello! I've analyzed your document. Ask me anything about 'Annual_Report_2025.pdf'." }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: "I can certainly help with that. Based on page 3, the revenue grew by 15% YoY." }]);
    }, 1000);
  };

  return (
    <div className="h-screen bg-[#FAFAFA] text-[#111111] flex overflow-hidden">
      {/* Sidebar Mockup - Reusing Sidebar component conceptually but integrated */}
      
      {/* Main Workspace */}
      <div className="flex-1 flex flex-col pl-64 transition-all duration-300"> 
        {/* Top Bar */}
        <header className="h-16 border-b border-[#F0F0F0] flex items-center justify-between px-6 bg-white shadow-sm z-10">
            <div className="flex items-center gap-4">
                 <Link to="/tools" className="p-2 hover:bg-[#FAFAFA] rounded-full text-[#666666]">
                    <X className="w-5 h-5" />
                 </Link>
                 <div className="flex items-center gap-3">
                     <div className="p-2 bg-[#F6A5C0]/10 rounded text-[#F6A5C0]">
                         <FileText className="w-5 h-5" />
                     </div>
                     <div>
                         <h1 className="text-sm font-semibold text-[#111111]">Annual_Report_2025.pdf</h1>
                         <p className="text-xs text-green-600">Processed Successfully</p>
                     </div>
                 </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" className="border-[#F0F0F0] bg-white text-[#666666] hover:text-[#111111] hover:bg-[#FAFAFA]">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                </Button>
                <Button className="bg-[#F6A5C0] text-white hover:bg-[#EC8AAE] font-semibold border-none">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                </Button>
            </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
            {/* Left: Document Preview */}
            <div className="w-1/2 border-r border-[#F0F0F0] bg-[#FAFAFA] relative flex flex-col">
                <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                    {/* Mock PDF Viewer */}
                    <div className="w-full max-w-xl aspect-[1/1.4] bg-white shadow-lg rounded overflow-hidden relative border border-[#F0F0F0] hover:shadow-xl transition-shadow">
                        <div className="absolute inset-0 bg-white flex items-center justify-center text-[#999999]">
                            [Document Preview Placeholder]
                        </div>
                        {/* Lines mimicking text */}
                        <div className="p-8 space-y-4 opacity-50">
                            <div className="h-8 bg-gray-200 w-3/4 rounded mb-8"/>
                            <div className="h-4 bg-gray-100 w-full rounded"/>
                            <div className="h-4 bg-gray-100 w-full rounded"/>
                            <div className="h-4 bg-gray-100 w-5/6 rounded"/>
                            <div className="h-4 bg-gray-100 w-full rounded"/>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="h-20 bg-gray-100 rounded"/>
                                <div className="h-20 bg-gray-100 rounded"/>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Floating controls */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white p-1.5 rounded-full border border-[#F0F0F0] shadow-md">
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full text-[#666666] hover:text-[#111111] hover:bg-[#FAFAFA]">-</Button>
                    <span className="text-xs font-mono w-12 text-center text-[#666666]">100%</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full text-[#666666] hover:text-[#111111] hover:bg-[#FAFAFA]">+</Button>
                    <div className="w-px h-4 bg-[#F0F0F0] mx-1"/>
                    <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full text-[#666666] hover:text-[#111111] hover:bg-[#FAFAFA]"><Maximize2 className="w-4 h-4"/></Button>
                </div>
            </div>

            {/* Right: Chat Interface */}
            <div className="w-1/2 bg-white flex flex-col">
                <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <Avatar className="h-8 w-8 mt-1 border border-[#F0F0F0]">
                                    {msg.role === 'bot' ? (
                                        <div className="w-full h-full bg-[#F6A5C0] flex items-center justify-center text-white">
                                            <Bot className="w-5 h-5" />
                                        </div>
                                    ) : (
                                        <AvatarFallback className="bg-gray-100 text-[#666666]">
                                            <User className="w-4 h-4" />
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed shadow-sm ${
                                    msg.role === 'bot' 
                                        ? 'bg-[#FAFAFA] text-[#111111] rounded-tl-none border border-[#F0F0F0]' 
                                        : 'bg-[#F6A5C0] text-white rounded-tr-none'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-4 border-t border-[#F0F0F0]">
                    <div className="relative">
                        <Input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask something about the document..." 
                            className="bg-[#FAFAFA] border-[#F0F0F0] pr-12 h-12 rounded-xl focus:border-[#F6A5C0] focus:ring-[#F6A5C0]/20 text-[#111111] placeholder:text-[#999999]"
                        />
                        <Button 
                            onClick={handleSend}
                            size="icon" 
                            className="absolute right-1 top-1 h-10 w-10 bg-[#F6A5C0] text-white hover:bg-[#EC8AAE] rounded-lg"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                    <p className="text-center text-xs text-[#999999] mt-2">
                        Gynex AI can make mistakes. Verify critical information.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
