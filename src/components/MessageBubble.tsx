import { Message } from '@/types';
import { Bot, User } from 'lucide-react';
import { clsx } from 'clsx';

interface MessageBubbleProps {
    message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
    const isAssistant = message.role === 'assistant';

    // Extract text content from message (support both old and new API structure)
    const getMessageContent = (msg: Message): string => {
        // New API structure with parts
        if ('parts' in msg && Array.isArray(msg.parts)) {
            return msg.parts
                .filter((part: any) => part.type === 'text')
                .map((part: any) => part.text)
                .join('\n');
        }
        // Old API structure with content
        return msg.content || '';
    };

    const content = getMessageContent(message);

    return (
        <div className={clsx(
            "flex w-full mb-4",
            isAssistant ? "justify-start" : "justify-end"
        )}>
            <div className={clsx(
                "flex max-w-[80%] md:max-w-[70%]",
                isAssistant ? "flex-row" : "flex-row-reverse"
            )}>
                <div className={clsx(
                    "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-2 ml-2",
                    isAssistant ? "bg-primary text-primary-foreground mr-2" : "bg-secondary text-secondary-foreground ml-2"
                )}>
                    {isAssistant ? <Bot size={18} /> : <User size={18} />}
                </div>

                <div className={clsx(
                    "p-4 rounded-2xl shadow-sm",
                    isAssistant
                        ? "bg-white dark:bg-slate-800 text-foreground rounded-tl-none"
                        : "bg-secondary text-secondary-foreground rounded-tr-none"
                )}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {content}
                    </p>
                    <span className="text-[10px] opacity-70 mt-1 block">
                        {message.createdAt ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                </div>
            </div>
        </div>
    );
};
