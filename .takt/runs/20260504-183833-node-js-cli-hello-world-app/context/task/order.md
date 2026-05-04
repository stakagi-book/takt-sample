タスク: Node.jsスクリプトで CLI に "Hello World" を出力し、単体テストを追加する（ファイルは app/ 以下に格納）。ワークフロー: plan → implement → ai_review → 並列レビュー → 完了

制約（ユーザー指定）
- 変更・作成するのは app/ 以下の下記ファイルのみ。既存ファイルの編集は禁止。既に同名ファイルが存在する場合は上書きせず報告して中止すること。

優先度一覧（高/中/低）
- 高: app/hello.js の作成（動作要件の中心）
- 高: app/test/hello.test.js の作成（受け入れ基準確認用）
- 高: 実行・検証（node 実行での動作確認）
- 中: 実装報告と必要事項のログ出力（implement の必須出力フォーマット）
- 低: 追加ドキュメント（不要）

参照資料
- なし（新規作成）

ファイル別作業指示（必須詳細）
1) app/hello.js — 優先度: 高
- 作業: 新規作成のみ。内容は標準出力に "Hello World" を出す単純な Node.js スクリプト。
- 動作仕様（必須）:
  - コードは: console.log('Hello World');
  - 実行方法: node app/hello.js
  - 標準出力は正確に "Hello World\n"（改行含む）であること

2) app/test/hello.test.js — 優先度: 高
- 作業: 新規作成の単体テスト。Node 標準モジュールのみを用いる（外部テストランナー不使用）。
- 実装要件（必須）:
  - child_process.execSync を用いて node app/hello.js を同期実行し、encoding:'utf8' を指定して出力を取得すること
  - assert.strictEqual(output, 'Hello World\n') で検証すること
  - テストは node app/test/hello.test.js で実行可能で、失敗時は例外でプロセスが非0終了すること

エージェント別具体タスク
A. plan（Planner） — 優先度: 高
- 事前確認:
  - リポジトリルートに app/ が存在するかを確認する（ls/glob）。存在する場合は中身を列挙し、app/hello.js または app/test/hello.test.js が既に存在するかを確認する。
  - 既存ファイルが存在する場合は、編集しない旨に従い「実装中止・報告」する（overwrite を行わない）。
- 出力（必須）:
  - 実装スコープ宣言（implement ロールの Scope 出力契約と整合）
  - 影響範囲の最小列挙（今回: app/ 以下の新規ファイルのみ。既存ファイルは非変更）
  - 実装ガイドライン（ファイルの正確な内容、テストの期待値、実行コマンド）
  - もし app/ が既に存在して同名ファイルがある場合の具体的手順（中止・報告テンプレを含む）

B. implement（Coder） — 優先度: 高
- 前提: Planner のスコープ宣言に従うこと。設計判断は行わない。疑問は報告する。
- 実装手順（必須順序）:
  1. app/ ディレクトリを作成（存在しない場合）。
  2. app/hello.js を新規作成（内容: console.log('Hello World');）。
  3. app/test/hello.test.js を新規作成（下記サンプル要件を満たすこと）。
  4. 自己チェック:
     - node --version を確認（任意だが報告に含めてもよい）
     - node app/hello.js を実行し stdout が "Hello World\n" であることを確認
     - node app/test/hello.test.js を実行し exit code 0（成功）であることを確認
  5. 出力: implement の必須出力フォーマットを満たす（## 作業結果／## 変更内容／## ビルド結果／## テスト結果）。
- 必須スコープ宣言（実装開始時に出力すること）: implement の Scope 出力契約に従う（タスク1行要約、変更予定ファイル一覧、推定規模、影響範囲）。
- テスト内容サンプル（実装に従うこと）:
  - const {execSync} = require('child_process');
    const assert = require('assert');
    const out = execSync('node app/hello.js', { encoding: 'utf8' });
    assert.strictEqual(out, 'Hello World\n');
- 注意事項（実装者）:
  - 他ファイルは編集しない
  - 新規導入の文字列はハードコード可（小タスク）。契約文字列の定義を別ファイルに切り出す必要はない
  - テストは Node 標準機能のみで完結させる（npm 依存は不可）

C. ai_review（AI Antipattern Reviewer） — 優先度: 中
- レビュー対象: implement が作成した差分
- チェック項目（網羅的）:
  - 生成コードに幻覚 API・存在しないメソッドが使われていないか
  - テストが実際に「Hello World\n」を正確に検証しているか（トリミング等で誤検出していないか）
  - 不要なフォールバックや過剰実装が含まれていないか
  - 実装が指定スコープ外の変更を行っていないか
- 判定基準:
  - ブロッキング問題があれば REJECT（修正要求）
  - 初回レビューは網羅的に問題を列挙すること

受け入れ基準（ワークフロー最終判定）
- node app/hello.js を実行すると標準出力が正確に "Hello World\n" を返すこと
- node app/test/hello.test.js を実行すると exit code 0（失敗時は非0）で終了すること
- 変更は app/hello.js と app/test/hello.test.js のみで、他ファイルに変更がないこと
- ai_review が重大な AI 特有の問題を報告していないこと（重大問題がある場合は修正→再レビュー）

再現手順（検証コマンド）
1. node app/hello.js
   - 期待出力: Hello World
2. node app/test/hello.test.js
   - 期待: プロセスは exit code 0（成功）。失敗時はスタックトレースが出力される。

エラー処理指針
- app/hello.js または app/test/hello.test.js が既に存在する場合: 実装は中止し、Planner に「既存ファイルあり。上書き不可」の報告を返すこと（overwrite は行わない）。
- 実行環境で node が見つからない場合: implement はエラーとして報告（install の自動化は範囲外）。

Open Questions（技術的な不明点のみ）
- なし（Node バージョン指定や外部テストランナーの指定はユーザーから指示がないため不要）

受け渡しメタ（ワークフロー用）
- ワークフロー: default-mini（plan → implement → ai_review → 並列レビュー → 完了）
- 実行順: Planner が最初にリポジトリを確認してから Implement、次に AI Review
- 成果物: app/hello.js, app/test/hello.test.js と implement の必須出力ログ（作業結果等）