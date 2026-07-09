"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquarePlus, X, Send, CheckCircle2 } from "lucide-react";

import { submitSuggestion } from "@/app/actions/suggestionActions";

export function SuggestionBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);

    try {
      const result = await submitSuggestion(null, formData);
      
      if (result.success) {
        setIsSuccess(true);
        // Reset after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
          setTimeout(() => {
            setIsSuccess(false);
            setName("");
            setMessage("");
          }, 300); // Wait for close animation
        }, 3000);
      } else {
        alert(result.error || "Failed to submit suggestion.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-[9990] p-4 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 hover:scale-110 hover:shadow-primary/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open suggestion box"
      >
        <MessageSquarePlus className="w-6 h-6" />
      </button>

      {/* Suggestion Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: -50 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, x: -50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-6 z-[9995] w-[340px] max-w-[calc(100vw-3rem)] glass rounded-2xl shadow-2xl border border-border/50 overflow-hidden flex flex-col bg-white/80 dark:bg-card/80"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/30 bg-muted/30">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <MessageSquarePlus className="w-4 h-4 text-primary" />
                <span>Suggestion Board</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close suggestion box"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-5">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-6 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mb-3 text-success">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Got it!</h3>
                    <p className="text-sm text-muted-foreground">
                      Thanks for your suggestion. I appreciate the feedback!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Have an idea for my portfolio or just want to leave some feedback? Let me know below!
                    </p>
                    
                    <div className="space-y-1.5">
                      <label htmlFor="suggestion-name" className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Name <span className="text-muted-foreground font-normal lowercase">(Optional)</span>
                      </label>
                      <input
                        id="suggestion-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Anonymous"
                        className="w-full px-3 py-2 text-sm bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-muted-foreground"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="suggestion-msg" className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Suggestion <span className="text-destructive">*</span>
                      </label>
                      <textarea
                        id="suggestion-msg"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What should I add next?"
                        className="w-full px-3 py-2 text-sm bg-background/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all min-h-[100px] resize-none placeholder:text-muted-foreground"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !message.trim()}
                      className="mt-2 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-lg font-bold text-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Suggestion</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
