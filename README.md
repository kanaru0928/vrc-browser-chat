# VRC Browser Chat

*[English](README_EN.md) | 日本語*

VRChatでのチャットをWebブラウザから送信できるモダンなアプリケーションです。

[![Release](https://img.shields.io/github/v/release/kanaru0928/vrc-browser-chat)](https://github.com/kanaru0928/vrc-browser-chat/releases)
[![License](https://img.shields.io/github/license/kanaru0928/vrc-browser-chat)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows-blue)](https://github.com/kanaru0928/vrc-browser-chat)

## ✨ 特徴

- 🚀 **リアルタイム通信**: OSCプロトコルによるVRChatとの通信
- 📱 **マルチデバイス対応**: PC、スマホ、タブレットからアクセス可能
- 💾 **チャット履歴**: 送信履歴の保存・管理機能
- 🎨 **モダンUI**: ダークテーマ対応の直感的なインターフェース
- ⚡ **高パフォーマンス**: Rust + React製の軽量・高速アプリ

## 📋 システム要件

- **OS**: Windows 10/11
- **VRChat**: OSC機能が有効化されていること
- **ネットワーク**: ローカルネットワーク接続

## 🚀 クイックスタート

### 1. インストール

最新版を[リリースページ](https://github.com/yourusername/vrc-browser-chat/releases)からダウンロードしてインストールしてください。

### 2. VRChatの設定

1. VRChatを起動
2. 設定メニューから「OSC」を有効化
3. ポート設定を確認（デフォルト: 9000）

### 3. アプリの起動

1. VRC Browser Chatを起動
2. **OSCセクション**の「Start」ボタンをクリック
   > ⚠️ VRChat起動後にStartしてください
3. **WebServerセクション**のURLにアクセス
   - 例: `http://192.168.0.1:11087`
   - 「Open」ボタンで自動的にブラウザが開きます

### 4. チャット開始

ブラウザからメッセージを入力してVRChatに送信できます！

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！開発者向けの詳細情報は[CONTRIBUTING.md](docs/CONTRIBUTING.md)をご確認ください。

## 📄 ライセンス

このプロジェクトは[MIT License](LICENSE)の下で公開されています。

## 🙋‍♂️ サポート

- 🐛 バグ報告・💡機能要望: [Issues](https://github.com/kanaru0928/vrc-browser-chat/issues)

---

Made with ❤️ for VRChat community
