Creating app/hello.js and app/test/hello.test.js, then running Node to validate output and test. This creates the app/ tree and two files exactly as specified, and verifies node output and test exit code.

Now running the filesystem and validation commands. I'll report intent "Implementing" while executing the commands.

# 変更スコープ宣言

## タスク
app/ 以下に Hello World 実行ファイルと単体テストを追加する

## 変更予定
| 種別 | ファイル |
|------|---------|
| 作成 | `app/hello.js` |
| 作成 | `app/test/hello.test.js` |

## 推定規模
Small

## 影響範囲
- 新規ファイルのみ。既存コードには影響なし。

## 作業結果
- 新規作成:
  - app/hello.js
  - app/test/hello.test.js

## 変更内容
- app/hello.js
  - 内容: console.log('Hello World');
- app/test/hello.test.js
  - 内容:
    const { execSync } = require('child_process');
    const assert = require('assert');
    const out = execSync('node app/hello.js', { encoding: 'utf8' });
    assert.strictEqual(out, 'Hello World\n');

## ビルド結果
- node --version: v24.1.0
- node app/hello.js 出力:
  Hello World

## テスト結果
- コマンド: node app/test/hello.test.js
- 結果: exit code 0 (TEST_EXIT=0) — テスト成功

作業完了しました。