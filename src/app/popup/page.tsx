"use client";

import React, { useState } from "react";
import { 
  Eye, 
  Home,
  Clock,
  ArrowLeft, 
  Plus, 
  X, 
  Search, 
  LayoutGrid, 
  ArrowRightLeft, 
  ChevronDown,
  ArrowDownToLine,
  File,
  Send,
  Repeat,
  DollarSign,
  Maximize2,
  QrCode,
  Usb,
  Pencil,
  Copy
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const DEFAULTS = {
  chain: "Solana",
  name: "1111",
  addr: "7fXB…Hin7",
  homeName: "111",
  bal: "1.22",
  delta: "-0.0274",
  pct: "-2.21",
  banner: "Meet Phantom Terminal, your new home for desktop trading",
  tokName: "Solana",
  tokAmt: "0.01 SOL",
  tokUsd: "1.22",
  tokChg: "-0.03",
  manage: "Manage token list",
  badgeCount: "3"
};

export default function PopupPage() {
  const [data, setData] = useState(DEFAULTS);
  const [screen, setScreen] = useState("s3"); 
  const [activeTab, setActiveTab] = useState("home");
  const [privateKey, setPrivateKey] = useState("");
  const [showBanner, setShowBanner] = useState(true);

  const handleSave = () => {
    setScreen("s3");
    toast.success("Mock data updated!");
  };

  const copyAddr = () => {
    navigator.clipboard.writeText(data.addr);
    toast.info("Address copied to clipboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-[375px] h-[600px] bg-[#0F0F0F] text-zinc-100 overflow-hidden relative shadow-2xl border border-zinc-800" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="w-full h-full flex flex-col relative overflow-hidden">
          
          {/* OVERLAY SCREENS */}
          <AnimatePresence>
            {screen === "s1" && (
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="absolute inset-0 bg-[#0F0F0F] z-50 flex flex-col">
                <header className="h-14 flex items-center justify-between px-4 border-b border-white/5">
                  <button onClick={() => setScreen("s3")} className="p-2 text-zinc-100"><X className="w-6 h-6" /></button>
                  <div className="font-bold text-[18px]">Add Account</div>
                  <div className="w-10" />
                </header>
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
                  {[
                    { title: "Create New Account", sub: "Add a new multi-chain account", icon: <Plus className="w-5 h-5" strokeWidth={3} />, onClick: () => toast.info("Create new account") },
                    { title: "Connect Hardware Wallet", sub: "Use your Ledger hardware wallet", icon: <Usb className="w-5 h-5" strokeWidth={3} />, onClick: () => toast.info("Connect hardware wallet") },
                    { title: "Import Recovery Phrase", sub: "Import accounts from another wallet", icon: <File className="w-5 h-5" strokeWidth={3} />, onClick: () => setScreen("editor") },
                    { title: "Import Private Key", sub: "Import a single-chain account", icon: <ArrowDownToLine className="w-5 h-5" strokeWidth={3} />, onClick: () => setScreen("s2") },
                    { title: "Watch Address", sub: "Track any public wallet address", icon: <Eye className="w-5 h-5" strokeWidth={3} />, onClick: () => toast.info("Watch address") },
                  ].map((item, i) => (
                    <button key={i} onClick={item.onClick} className="w-full bg-[#1C1C1E] p-3.5 rounded-2xl flex items-center gap-3.5 text-left border border-white/5 active:scale-95 transition-all">
                      <div className="w-10 h-10 rounded-full bg-[#2C2C2E] flex items-center justify-center shrink-0 text-zinc-400">{item.icon}</div>
                      <div className="flex flex-col">
                        <p className="font-bold text-[15px] leading-tight">{item.title}</p>
                        <p className="text-[12px] text-zinc-500 font-bold leading-tight mt-1">{item.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="p-4 pb-8 border-t border-white/5"><button onClick={() => setScreen("s3")} className="w-full h-12 rounded-2xl bg-[#1C1C1E] font-bold text-[16px]">Close</button></div>
              </motion.div>
            )}

            {screen === "s2" && (
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="absolute inset-0 bg-[#0F0F0F] z-50 flex flex-col">
                <header className="h-14 flex items-center justify-between px-4 border-b border-white/5">
                  <button onClick={() => setScreen("s1")} className="p-2 text-zinc-100"><ArrowLeft className="w-6 h-6" strokeWidth={2} /></button>
                  <div className="font-bold text-[17px]">Import Private Key</div>
                  <div className="w-10" />
                </header>
                <div className="flex-1 px-4 space-y-6 pt-6 overflow-y-auto">
                   <div className="flex flex-col items-center gap-4">
                     <div className="w-20 h-20 bg-[#252528] rounded-full flex items-center justify-center text-3xl font-bold border border-white/5 relative">
                       P
                       <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#2C2C2E] rounded-full flex items-center justify-center border-2 border-[#0F0F0F]">
                         <Pencil className="w-3 h-3 text-zinc-400" />
                       </div>
                     </div>
                       <div className="w-full space-y-3">
                         <div className="bg-[#1C1C1E] h-12 rounded-lg px-4 flex items-center justify-between border border-white/5">
                             <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-white flex items-center justify-center rounded-[8px]">
                                 <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Solana-Crypto-Logo-Transparent-resized-1766733105389.webp" className="w-5 h-5 object-contain" alt="Solana" style={{ filter: 'brightness(0)' }} />
                               </div>
                               <span className="font-bold text-[15px]">Solana</span>
                             </div>
                           <ChevronDown className="w-4 h-4 text-zinc-500" />
                         </div>
                          <input value={data.name} onChange={e => setData({...data, name: e.target.value})} className="w-full bg-[#1C1C1E] h-12 rounded-lg px-4 border border-white/5 font-bold text-[15px]" placeholder="Name" />
                        <textarea value={privateKey} onChange={e => setPrivateKey(e.target.value)} className="w-full bg-[#1C1C1E] p-4 rounded-lg border border-white/5 h-28 font-mono text-[15px] resize-none" placeholder="Private key" style={{ WebkitTextSecurity: 'disc' } as any} />
                        {privateKey && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center py-2 px-1">
                            <span className="font-bold text-[15px]">Account Address</span>
                            <span className="text-zinc-500 font-mono text-[15px]">{data.addr}</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                 </div>
                 <div className="p-4 pb-8 border-t border-white/5">
                   <button disabled={!privateKey} onClick={() => setScreen("s3")} className="w-full h-12 rounded-2xl bg-[#AB9FF2] text-black font-bold text-[16px] disabled:opacity-50">Import</button>
                 </div>
              </motion.div>
            )}

            {screen === "editor" && (
              <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="absolute inset-0 bg-[#0F0F0F] z-50 flex flex-col">
                <header className="h-14 flex items-center justify-between px-4 border-b border-white/5">
                  <button onClick={() => setScreen("s1")} className="p-2 text-zinc-100"><ArrowLeft className="w-6 h-6" strokeWidth={2} /></button>
                  <div className="font-bold text-[17px]">Edit Mock Data</div>
                  <div className="w-10" />
                </header>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {[
                    { label: "Address", key: "addr" }, 
                    { label: "Account Name", key: "homeName" },
                    { label: "Badge Count", key: "badgeCount" },
                    { label: "Total Balance", key: "bal" },
                    { label: "Change $", key: "delta" },
                    { label: "Change %", key: "pct" },
                    { label: "Token Name", key: "tokName" },
                    { label: "Token Amount", key: "tokAmt" },
                    { label: "Token USD", key: "tokUsd" },
                    { label: "Token Change", key: "tokChg" },
                    { label: "Banner Text", key: "banner" }
                  ].map(f => (
                    <div key={f.key} className="space-y-1.5">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{f.label}</label>
                      <input value={(data as any)[f.key]} onChange={e => setData({...data, [f.key]: e.target.value})} className="w-full bg-black border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm focus:border-white/20 outline-none" />
                    </div>
                  ))}
                </div>
                <div className="p-4 pb-8 border-t border-white/5"><button onClick={handleSave} className="w-full h-12 rounded-2xl bg-[#AB9FF2] text-black font-bold">Save Changes</button></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* BASE TABS */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {activeTab === "home" && (
                <div className="p-4 flex flex-col">
                  <header className="h-12 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setScreen("s1")}>
                      <div className="w-8 h-8 bg-[#252528] rounded-full flex items-center justify-center font-bold text-[12px]">{data.badgeCount}</div>
                      <span className="font-bold text-[17px]">{data.homeName}</span>
                      <Copy className="w-4 h-4 text-zinc-500" strokeWidth={2} />
                    </div>
                    <div className="flex items-center gap-4 text-zinc-500">
                      <Search className="w-6 h-6 stroke-[2]" />
                      <div className="w-6 h-6 border-[2px] border-current rounded-[4px] relative flex items-center justify-center overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-2 border-t-[2px] border-l-[2px] border-zinc-950" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t-[2px] border-r-[2px] border-zinc-950" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[2px] border-l-[2px] border-zinc-950" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[2px] border-r-[2px] border-zinc-950" />
                        <Maximize2 className="w-4 h-4 stroke-[2]" />
                      </div>
                    </div>
                  </header>
                    <div className="flex flex-col items-center mb-8">
                      <div className="text-[48px] font-bold mb-1" style={{ letterSpacing: '-1.5px' }}>${data.bal}</div>
                      <div className="flex items-center gap-2 font-bold text-[17px]">
                        <span className={data.delta.startsWith('-') ? "text-[#FF5C33]" : "text-[#00FFA3]"}>{data.delta.startsWith('-') ? "-$" : "+$"}{data.delta.replace('-', '')}</span>
                        <div className={`rounded-[8px] px-2.5 py-0.5 font-bold text-[16px] ${data.pct.startsWith('-') ? "bg-[#FF5C33]/15 text-[#FF5C33]" : "bg-[#00FFA3]/15 text-[#00FFA3]"}`}>{data.pct}%</div>
                      </div>
                    </div>
                  <div className="grid grid-cols-4 gap-3 mb-8">
                    {[{i:<QrCode strokeWidth={2}/>,l:'Receive'}, {i:<Send strokeWidth={2}/>,l:'Send'}, {i:<Repeat strokeWidth={2}/>,l:'Swap'}, {i:<DollarSign strokeWidth={2}/>,l:'Buy'}].map((a, i) => (
                      <div key={i} className="bg-[#1C1C1E] aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-90 transition-transform">
                        <div className="text-[#AB9FF2]">{a.i}</div><span className="text-[12px] font-bold text-zinc-400">{a.l}</span>
                      </div>
                    ))}
                  </div>
                  {showBanner && (
                    <div className="bg-[#1C1C1E] rounded-[18px] p-4 mb-4 flex items-center gap-4 relative border border-white/5">
                      <div className="w-[48px] h-11 bg-[#2A2A2A] rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/b3054992e11f725109af4ccf86f775f9d3d505e0-40x40-1766684995290.png" className="w-[42px] h-[34px] object-contain" alt="Terminal" />
                      </div>
                      <p className="text-[14px] font-bold leading-snug pr-4">{data.banner}</p>
                      <X onClick={() => setShowBanner(false)} className="absolute top-2 right-2 text-zinc-500 w-4 h-4 cursor-pointer" strokeWidth={2} />
                    </div>
                  )}
                    <div className="bg-[#1C1C1E] rounded-[20px] p-4 flex items-center justify-between border border-white/5 active:bg-[#252528] transition-colors cursor-pointer" onClick={copyAddr}>
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center overflow-hidden border border-white/5">
                          <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/file-1766685022437.png" className="w-11 h-11 object-cover" alt="Solana" />
                        </div>
                        <div className="flex flex-col"><span className="font-bold text-[17px]">{data.tokName}</span><span className="text-[13.5px] text-zinc-500 font-bold">{data.tokAmt}</span></div>
                      </div>
                      <div className="flex flex-col items-end"><span className="font-bold text-[17px]">${data.tokUsd}</span><span className={`text-[13.5px] font-bold ${data.tokChg.startsWith('-') ? "text-[#FF5C33]" : "text-[#00FFA3]"}`}>{data.tokChg.startsWith('-') ? "-$" : "+$"}{data.tokChg.replace('-', '')}</span></div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 mt-6 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500"><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /><circle cx="15" cy="8" r="2" fill="#0F0F0F" stroke="currentColor" strokeWidth="2" /><circle cx="9" cy="16" r="2" fill="#0F0F0F" stroke="currentColor" strokeWidth="2" /></svg>
                       <span className="text-[15px] font-bold text-zinc-500">{data.manage}</span>
                    </div>
                </div>
              )}
              {activeTab !== "home" && <div className="flex-1 flex items-center justify-center text-zinc-500 font-bold text-sm uppercase tracking-widest">Mock Screen</div>}
            </div>
            <nav className="h-[72px] bg-[#0F0F0F] border-t border-white/5 flex items-center justify-around shrink-0 pb-2">
              {[
                { id: "home", icon: <Home className={activeTab === "home" ? "fill-current" : ""} strokeWidth={2} /> },
                { id: "grid", icon: <LayoutGrid strokeWidth={2} /> },
                { id: "swap", icon: <ArrowRightLeft strokeWidth={2} /> },
                { id: "activity", icon: <Clock strokeWidth={2} /> },
                { id: "search", icon: <Search strokeWidth={2} /> }
              ].map(t => (
                  <div key={t.id} onClick={() => setActiveTab(t.id)} className={`flex-1 flex justify-center cursor-pointer transition-colors relative h-full items-center ${activeTab === t.id ? "text-[#AB9FF2]" : "text-zinc-500 hover:text-zinc-300"}`}>
                  <div className="p-2">{t.icon}</div>
                  {activeTab === t.id && <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-[#AB9FF2] rounded-full" />}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      
      {/* Visual indicator for navigation */}
      <div className="absolute bottom-8 text-zinc-500 text-sm flex gap-4">
        <button onClick={() => window.location.href = '/'} className="hover:text-white underline">Back to Editor</button>
      </div>
    </div>
  );
}
