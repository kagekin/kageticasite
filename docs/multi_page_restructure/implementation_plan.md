# マルチページ化リストラチャ

現在のシングルページ構成を、複数の独立したページ（Profile, Works, News, Schedule, Contact）に分割し、`index.html`をハブページとして再構成します。

## ユーザーレビューが必要な項目

> [!IMPORTANT]
> - 「ノベルゲーム」セクションは、一旦トップページから削除しました。
> - Subpage（Profile, Works等）から巨大なヒーローエリア（アイキャッチ画像）を削除し、固定メニューバーとシンプルなテキストタイトルのみの構成に洗練します。
> - **SFモード（バーチャルモード）時、左上のロゴアイコンを白黒反転（filter: invert）させて視認性を向上させます。**
> - 「Contact」リンクはGoogleフォームに直接リンクします。

## 変更内容の提案

---

### コア構成の変更

#### [NEW] [profile.html](file:///d:/github/kageticasite/profile.html)
詳細なプロフィールページ。ビジョン、経歴、スキルなどを掲載。

#### [NEW] [works.html](file:///d:/github/kageticasite/works.html)
事業紹介と活動実績（History）を統合したページ。

#### [NEW] [news.html](file:///d:/github/kageticasite/news.html)
最新情報の一覧ページ。

#### [NEW] [schedule.html](file:///d:/github/kageticasite/schedule.html)
月ごとの予定を表示。

#### [MODIFY] [character_counter.html](file:///d:/github/kageticasite/lab/character_counter.html)
Labセクションのツール第一弾：高機能文字数カウント＆ライティング分析ツール。
- ReactによるモダンなUI/UX
- リアルタイムでの詳細な分析（読了時間、読み上げ時間、原稿用紙換算）
- コピー・保存機能の実装
- SFモードへの完全対応

#### [NEW] [kagekin.html](file:///d:/github/kageticasite/kagekin.html)
隠しページ：マッドバーチャリスト時代のアーカイブ。

#### [MODIFY] [index.html](file:///d:/github/kageticasite/index.html)
各ページへの導線を備えたハブページにリニューアル。

---

### デザイン・スタイリング

#### [MODIFY] [style.css](file:///d:/github/kageticasite/css/style.css)
マルチページ化に伴う新規セクション（Topics, Profile Layout, Timeline等）のスタイル追加と、既存のノベルゲーム用スタイルの整理。

#### [MODIFY] サブページのヘッダー洗練
Top以外の各ページから巨大なヒーローエリアを削除し、コンテンツへのアクセス性を向上させます。
- `profile.html`, `works.html`, `news.html`, `schedule.html` のヒーローエリア（画像・グリッチ）を削除。
- ページ上部に、現在地を示すシンプルなテキストタイトル（h1等）を配置。
- 固定ナビゲーションとの重なりを防ぐため、メインエリアに `padding-top: var(--header-height)` を追加。

#### [MODIFY] 全般：OGP（Open Graph Protocol）の実装
SNSシェア時の視認性向上のため、主要ページにOGPタグを追加します。
- `index.html`, `lab/sandai_banashi.html`, `lab/one_hour_writing.html`, `lab/character_counter.html` が対象。
- タイトル、説明文、シェア用画像（assets/header.png等）を指定。

## 検証プラン

### 手動検証
- 各ページのナビゲーションリンクが正しく機能し、アクティブなページがハイライトされることの確認。
- Googleフォームへのリンクが正しく機能することの確認。
- `lab/character_counter.html` で文字入力時にカウントが正しく反映されることの確認。
- `kagekin.html` のグリッチ演出が意図通り表示されることの確認。
