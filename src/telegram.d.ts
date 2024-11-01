declare global {
    interface Window {
        Telegram: any;
    }
}

interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
        user: {
            id: number;
            first_name: string;
            last_name: string;
            username: string;
            language_code: string;
        };
    };
    themeParams: {
        bg_color: string;
        text_color: string;
        hint_color: string;
        link_color: string;
        button_color: string;
        button_text_color: string;
    };
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    MainButton: {
        setText(text: string): this;
        onClick(callback: () => void): void;
        show(): this;
        hide(): this;
        enable(): this;
        disable(): this;
        setParams(params: { color?: string; text_color?: string }): this;
    };
    HapticFeedback: {
        impactOccurred(style: 'light' | 'medium' | 'heavy'): void;
        notificationOccurred(type: 'error' | 'success' | 'warning'): void;
        selectionChanged(): void;
    };
    onEvent(eventType: string, callback: () => void): void;
    offEvent(eventType: string, callback: () => void): void;
    sendData(data: string): void;
    close(): void;
}

declare const Telegram: {
    WebApp: TelegramWebApp;
};

export { };
