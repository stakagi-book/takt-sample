Reading the primary spec order.md to extract requirements and identify impacted files. Reporting intent "Planning" while opening the spec file.

Checking repository for existing app/ and target files (app/hello.js, app/test/hello.test.js). Running glob to list matching paths.

要約（実施方針）
- 参照資料 order.md を読み、実装スコープは「新規ファイルのみ」かつ「app/ 以下の 2 ファイル」のみであると確認済み。
- リポジトリに app/ は存在しない（app/** に一致するファイルなし）。よって implement は app/ ディレクトリ作成と新規ファイル追加を行う。

必須成果物（新規作成）
1) ファイル: app/hello.js
- 正確な内容（1行）
  console.log('Hello World');
- 実行方法: node app/hello.js
- 期待 stdout: Hello World\n

2) ファイル: app/test/hello.test.js
- 正確な内容（テスト実行スクリプト）
  const { execSync } = require('child_process');
  const assert = require('assert');
  const out = execSync('node app/hello.js', { encoding: 'utf8' });
  assert.strictEqual(out, 'Hello World\n');
- 実行方法: node app/test/hello.test.js
- 期待: 成功時は exit code 0、失敗時は例外で非0終了

影響範囲
- 変更対象ファイル: app/hello.js（新規）、app/test/hello.test.js（新規）
- その他ファイルは一切変更しない（order.md 指定に従う）
- 既存ファイルが同名で存在した場合は上書き不可 → 実装中止・報告（現在は該当なし）

実装手順（Coder 向け、順序厳守）
1. 確認: app/ 以下に同名ファイルが無いことを再確認（ls app || true）。存在したら中止して報告。
2. 作成: mkdir -p app/test
3. 作成: app/hello.js に exactly: console.log('Hello World');
4. 作成: app/test/hello.test.js に exactly のテストコード（上記）
5. 検証（必須）:
   - node --version を報告（任意だが推奨）
   - node app/hello.js で stdout が "Hello World\n" であることを確認
   - node app/test/hello.test.js を実行して exit code 0 であることを確認
6. 出力（implement の必須出力フォーマットに従う）:
   - Scope 宣言（タスク要約、追加ファイル一覧、影響範囲）
   - 作業結果（作成したファイルパス）
   - ビルド/実行結果（node コマンドの stdout とテスト実行の exit code）
   - もし作業を中止した場合は理由（例: 既存ファイルあり）

注意点・アンチパターン
- 他ファイル編集禁止。app/ 以外に変更を加えない。
- ハードコードで問題なし（指示どおり）。
- テストは Node 標準のみを使う（npm 依存禁止）。
- 既存ファイルを上書きしない（発見時は即中止して報告）。

参照すべき既存実装パターン
- このリポジトリ内に同種の実装ファイルは見つからなかった（app/** に一致なし）。したがって参照パターンは無し。

エラーケースと対応
- node 不在: implement 停止→報告（install は範囲外）
- 同名ファイル既存: implement 停止→報告（overwrite しない）
- テスト失敗: 実行ログと差分を報告し、ai_review で修正を要求

検証コマンド（報告に含める）
- node app/hello.js
  - 期待出力: Hello World
- node app/test/hello.test.js
  - 期待: プロセス exit code 0

次のアクション（implement ステップ向け）
- 上記手順に従い新規ファイルを作成し、自己検証を行って実施ログを implement 出力フォーマットで返すこと。

以上。質問がなければこの計画に沿って implement を実行してください。