# 密码生成器 V8

一个轻量、纯前端的密码生成器，支持中文和英文界面。

**在线体验：** [密码生成器 V8 — 中英文双语言](https://the-password-generator.pages.dev/)

## 功能特点

- 支持普通密码和纯数字 PIN 两种模式。
- 一次生成 1 至 10 组密码。
- 普通密码长度支持 1 至 256 位。
- PIN 长度支持 3 至 32 位。
- 可选择小写字母、大写字母、数字和自定义特殊字符。
- 勾选的每种字符类别至少会在密码中出现一次。
- 可以编辑特殊字符内容，再参与密码生成。
- 提供高级过滤选项：
  - 易于朗读：过滤容易产生歧义的字符。
  - 易于阅读：过滤外观相似的字符。
  - 智能手机输入简单：自动处理大写字母与特殊字符的冲突。
- 自动分析密码强度，并显示理论熵、有效熵等信息。
- 支持复制单组密码或全部生成结果。
- 支持中英文语言切换。
- 支持日间和夜间主题切换。
- 适配桌面端和移动端屏幕。

## 工作方式

普通密码会根据已选择的字符集建立字符池。生成时，程序先从每个已选择的类别中放入至少一个字符，再从有效字符池补齐剩余长度，最后随机打乱字符顺序。

PIN 模式只生成数字，并使用独立的长度范围。切换到 PIN 模式后，普通密码的字符集和高级选项会隐藏。

随机值通过浏览器 Web Crypto API 的 `crypto.getRandomValues` 生成。所有生成过程都在浏览器本地完成，本项目不会将密码发送到服务器。

## 本地运行

项目无需构建，也无需安装依赖。

1. 克隆或下载本项目。
2. 使用现代浏览器打开 `index.html`。
3. 选择模式并调整生成选项。
4. 点击“生成密码”。

为了获得更可靠的剪贴板体验，建议使用本地 HTTP 服务器运行，或直接访问 HTTPS 在线版本。直接打开本地文件时，浏览器可能限制剪贴板权限。

使用 Python 启动本地服务器：

```bash
python -m http.server 8018
```

然后访问 <http://localhost:8018/>。

### 8018 端口故障排查

如果 `http://localhost:8018/` 无法访问，可以使用 PowerShell 查找并停止占用 8018 端口的进程。

**查找占用端口的进程：**

```powershell
Get-NetTCPConnection -LocalPort 8018 | Select-Object LocalAddress, LocalPort, @{Name="PID";Expression={$_.OwningProcess}}, @{Name="ProcessName";Expression={(Get-Process -Id $_.OwningProcess).ProcessName}}, @{Name="Path";Expression={(Get-Process -Id $_.OwningProcess).Path}}
```

**停止占用端口的进程：**

```powershell
Get-NetTCPConnection -LocalPort 8018 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

**再次检查端口：**

```powershell
Get-NetTCPConnection -LocalPort 8018
```

如果最后一条命令没有返回连接，说明 8018 端口已经释放。然后重新运行 `python -m http.server 8018`，再访问 <http://localhost:8018/>。

## 项目结构

| 文件 | 用途 |
| --- | --- |
| `index.html` | 主页面结构和双语界面标签。 |
| `script.js` | 密码生成、校验、过滤、强度分析、复制、语言切换和主题切换逻辑。 |
| `style.css` | 响应式布局、控件、结果区以及日间/夜间主题样式。 |
| `password-generator_V6.html` | 较早的 V6 独立版本。 |
| `password-generator_V7.html` | 较早的 V7 独立版本。 |

## 浏览器要求

建议使用支持以下能力的现代浏览器：

- JavaScript ES2019 或更高版本特性。
- Web Crypto API。
- 用于复制生成结果的 Clipboard API。

## 隐私与安全提示

这是一个浏览器本地工具。请避免将生成的密码复制到不可信应用，也不要把密码放进截图、日志或共享终端中。强度评分仅用于估算和比较，不能保证密码绝对安全。

## 许可证

当前仓库中未包含许可证文件。
