import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { TermsOfUseEn, TermsOfUseJa } from "./constants";
import { getUserStore } from "./store";

const resources = {
  en: {
    translation: {
      // App
      newUpdateAvailable: "A new update is available",
      updateDescription: "You can update from the app info button",
      // OSC Settings
      osc: "OSC",
      send: "Send",
      connected: "Connected",
      notConnected: "Not connected",
      port: "Port",
      start: "Start",
      stop: "Stop",
      portRequired: "Port is required",
      portMustBeNumber: "Port must be a number",
      portGreaterThanZero: "Port must be greater than 0",
      portLessThanMax: "Port must be less than or equal to 65535",
      // Chat History
      chatHistory: "Chat History",
      noMessagesYet: "No messages yet.",
      // Server Status
      webStatus: "Web Status",
      serverIsDown: "Server is down",
      serverIsUp: "Server is up",
      webUrl: "Web URL",
      webServerIsDown: "Web server is down",
      open: "Open",
      copy: "Copy",
      serverUrlCopied: "Server URL copied to clipboard",
      serverError: "Server error",
      // Server Restart Form
      serverPort: "Server Port",
      restart: "Restart",
      // App Info Button
      appInfoButton: "App Info",
      // App Info Dialog
      appInfo: "App Information",
      appInfoDescription: "Detailed information about VRC Browser Chat",
      info: "Info",
      update: "Update",
      termsOfUse: "Terms of Use",
      termsOfUseContent: TermsOfUseEn,
      license: "License",
      version: "Version",
      copyright: "©2025 kanaru",
      appDescription:
        "An application that enables chat communication between VRChat and a web browser.",
      viewOnGitHub: "View on GitHub",
      currentVersion: "Current version",
      checkForUpdates: "Check for Updates",
      checkingForUpdates: "Checking for updates...",
      newUpdateAvailableDialog: "A new update is available.",
      updateApp: "Update",
      later: "Later",
      usingLatestVersion: "You are using the latest version.",
      installingUpdate: "Installing update...",
      updateInstalled: "Update has been installed. Please restart the app.",
      updateCheckFailed: "Failed to check for updates",
      updateInstallFailed: "Failed to install update",
      close: "Close",
      // Language Settings
      language: "Language",
      english: "English",
      japanese: "Japanese",
    },
  },
  ja: {
    translation: {
      // App
      newUpdateAvailable: "アップデートがあります",
      updateDescription: "アプリ情報ボタンから更新してください",
      // OSC Settings
      osc: "OSC",
      send: "送信",
      connected: "接続済み",
      notConnected: "未接続",
      port: "Port番号",
      start: "開始",
      stop: "停止",
      portRequired: "Port番号は必須です",
      portMustBeNumber: "Port番号は数値である必要があります",
      portGreaterThanZero: "Port番号は0より大きい必要があります",
      portLessThanMax: "Port番号は65535以下である必要があります",
      // Chat History
      chatHistory: "チャット履歴",
      noMessagesYet: "メッセージはまだありません。",
      // Server Status
      webStatus: "Webステータス",
      serverIsDown: "サーバーは停止しています",
      serverIsUp: "サーバーは起動しています",
      webUrl: "Web URL",
      webServerIsDown: "Webサーバーは停止しています",
      open: "開く",
      copy: "コピー",
      serverUrlCopied: "URLをクリップボードにコピーしました",
      serverError: "サーバーエラー",
      // Server Restart Form
      serverPort: "サーバーPort番号",
      restart: "再起動",
      // App Info Button
      appInfoButton: "アプリ情報",
      // App Info Dialog
      appInfo: "アプリ情報",
      appInfoDescription: "VRC Browser Chatの詳細情報",
      info: "情報",
      update: "アップデート",
      termsOfUse: "利用規約",
      termsOfUseContent: TermsOfUseJa,
      license: "ライセンス",
      version: "バージョン",
      copyright: "© 2025 kanaru",
      appDescription:
        "VRChatとWebブラウザ間でのチャット通信を可能にするアプリケーションです。",
      viewOnGitHub: "GitHubで見る",
      currentVersion: "現在のバージョン",
      checkForUpdates: "アップデート確認",
      checkingForUpdates: "アップデートを確認中...",
      newUpdateAvailableDialog: "アップデートがあります",
      updateApp: "アップデート",
      later: "後で",
      usingLatestVersion: "最新バージョンを使用しています。",
      installingUpdate: "アップデートをインストール中...",
      updateInstalled:
        "アップデートがインストールされました。アプリを再起動してください。",
      updateCheckFailed: "アップデートの確認に失敗しました",
      updateInstallFailed: "アップデートのインストールに失敗しました",
      close: "閉じる",
      // Language Settings
      language: "言語",
      english: "English",
      japanese: "日本語",
    },
  },
};

// Initialize i18n synchronously first
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

// Load language preference from userStore after initialization
const loadStoredLanguage = async () => {
  try {
    const store = await getUserStore();
    const storedLanguage = await store.get<string>("language");
    if (storedLanguage && typeof storedLanguage === "string") {
      await i18n.changeLanguage(storedLanguage);
    }
  } catch (error) {
    console.warn("Failed to load stored language:", error);
  }
};

// Watch for language changes in userStore
const watchLanguageChanges = async () => {
  try {
    const store = await getUserStore();
    store.onChange((key, value) => {
      if (key === "language" && typeof value === "string") {
        i18n.changeLanguage(value);
      }
    });
  } catch (error) {
    console.warn("Failed to setup language change watcher:", error);
  }
};

// Load stored language and start watching for changes
loadStoredLanguage().then(() => {
  watchLanguageChanges();
});

export default i18n;
