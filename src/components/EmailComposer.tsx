import { useState } from "react";
import { toast } from "react-toastify";
import EmojiPicker from "emoji-picker-react";

interface Props {
  toName: string;
  toEmail: string;
  onClose: () => void;
}

export default function EmailComposer({ toName, toEmail, onClose }: Props) {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const handleEmojiClick = (emojiData: any) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleSend = () => {
    if (!message.trim()) return toast.error("Message is empty");
    if (!subject.trim()) return toast.error("Subject is required");

    setSending(true);

    // Mock email sending for testing
    setTimeout(() => {
      console.log("Mock email sent:", {
        to: toEmail,
        subject: subject,
        message: message,
        attachment: file?.name || null
      });
      
      toast.success(`Mock email sent to ${toEmail}!`);
      setMessage("");
      setSubject("");
      setFile(null);
      setSending(false);
      onClose();
    }, 1000); // Simulate 1 second delay
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border shadow-xl rounded-xl p-4 w-[320px] z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-700">New Message to {toName}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✖</button>
      </div>

      {/* Subject Field */}
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject..."
        className="w-full text-sm p-2 border rounded mb-2"
      />

      {/* Message Field */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        rows={4}
        className="w-full text-sm p-2 border rounded mb-2"
      />

      {/* Attachment & Emoji */}
      <div className="flex justify-between items-center mb-2 text-xl">
        <div className="flex items-center gap-3">
          <label className="cursor-pointer">
            📎
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
          <button onClick={() => setShowEmoji(!showEmoji)}>😀</button>
        </div>
        {file && <span className="text-xs text-gray-500 truncate max-w-[120px]">{file.name}</span>}
      </div>

      {showEmoji && (
        <div className="mb-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} height={250} />
        </div>
      )}

      <button
        onClick={handleSend}
        disabled={sending}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded disabled:opacity-50"
      >
        {sending ? "Sending..." : "Send Email"}
      </button>
    </div>
  );
}