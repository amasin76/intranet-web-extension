# 💫 ALX Intranet Extension 💫

<p align="center"> <a rel="noreferrer noopener" target="_blank" href="https://chromewebstore.google.com/detail/alx-intranet/eagnmhadjdelkimfjbelmndejpepgmef"><img alt="Chrome Web Store" src="https://img.shields.io/badge/Chrome-203424.svg?&style=for-the-badge&logo=google-chrome&logoColor=white"></a></p>
<p>
<div align="center"> <img src="https://i.imgur.com/8hmgGKr.png" alt="Preview" height="400" width="250"> </div>
<p align="center"><sub>(Screenshot from v0.2.2)</sub></p> <br />
<img height="32" width="32" src="https://cdn.simpleicons.org/youtube"/>
<p><a rel="noreferrer noopener" target="_blank" href="https://youtu.be/6FhrEXUd1m4"> Tutorial Video</a> By <a rel="noreferrer noopener" target="_blank" href="https://github.com/nuuxcode">Mounssif</a> ❤️</p>

## 🎛️ Features

**Initial Files and Directories:**  
Provides you with a command that includes all the files and directories trees of the tasks.  
Simply copy and paste the command into your terminal

**Task Navigation:**  
Scroll to your desired task with ease using the keyboard shortcut.

**Checker Control:**  
Select checks you want to run. Also Get feedback on which tasks have failed or succeeded.  
( Please try keep servers healthy 💚 by only running the checks you need )

**Easy Quiz:**  
You dont have any more keep scroll down and up to correct you ansewrs,  
allows you to easily review and change your responses

**Collapse Tasks:**  
Allows to collapse individual tasks or all successful/failed tasks at once

**User Style:**  
fully customize the styling of your intranet page

## 🧩 Installation

There are several ways to install the extension:

- **Web Stores**: For chromium-based browsers <a rel="noreferrer noopener" target="_blank" href="https://chromewebstore.google.com/detail/alx-intranet/eagnmhadjdelkimfjbelmndejpepgmef">Chrome Web Store</a>.

- **Release Assets**: Download the ZIP file from the <a rel="noreferrer noopener" target="_blank" href="https://github.com/amasin76/intranet-web-extension/releases">Release Assets</a> and extract it to a folder. Then,  
  1- Navigate to the dev extension page (Chrome `chrome://extensions`, Edge `edge://extensions`,  
   Firefox `about:debugging#/runtime/this-firefox`).  
  2- Enable developer mode by toggling the switch in the top right corner of the extensions page.  
  3- Click on the `Load Unpacked`, in Firefox click `Load Temporary Add-on`.  
  4- Select the folder where you extracted the extension files.  
  5- The extension should now be installed and ready to use!
- **Build from Source**: check following [section](#🔧-dev-and-build) to build the extension. After, you will have a `dist` folder. Follow the previous instructions in the "Release Assets" start from step 1 to install the extension from the `dist` folder.

## 🔧 Dev and Build

> [!NOTE]  
> Requires nodeJs v18 or higher, install `pnpm` (recommended)

### Chrome

- run in dev mode

```sh
pnpm dev
```

- build the extension

```sh
pnpm build
```

### Firefox

- run in dev mode

```sh
pnpm dev:firefox
```

- build the extension

```sh
pnpm build:firefox
```

## 🧭 Usage

- **Initial Files and Directories:**  
  Click `[Tasks]` button, and paste the command in your terminal, then click Enter
- **Task Navigation:**
  - `[0-9]` Press the number keys on your keyboard to navigate to the corresponding task.
  - `Shift + [0-9] + [0-9]` task with a two-digit number, hold down the Shift while pressing number keys.  
    Example task 13 => "Shift + 1 + 3"
  - `ctrl + k` toggle search bar
- **Checker Control**, **Easy Quiz**, **Collapse Tasks:**  
  The user interface is simple and self-explanatory
- **User Style:**  
  Go to extension settings ( click the top-right icon ⚙️ in popup )

## 🛡️ Privacy and Policies

### Privacy

- Our extension is designed to be offline-first, meaning that it does not rely on any external servers or backdoors.

- We do not collect any personal data from our users. The only data we have access to is provided by the web store, which shows us information such as the number of installs and uninstalls.

### Policies

- The purpose of our extension is to improve the user experience on the intranet. It is not intended to help users break any rules.

- If someone from the staff of the ALX SE notices something that is not in line with their rules, they can contact us and we will take appropriate action.

We are committed to providing a safe and enjoyable experience for all users.

## ❤️ Contributing

As an open-source project, contributions are welcome and appreciated! If you would like to contribute, please kindly follow these steps:

- Fork the repository on GitHub.
- Clone your forked repository to your local machine.
- Create a new branch for your changes.
- Make your changes and commit them to your branch.
- Push your changes to your forked repository on GitHub.
- Open a pull request from your forked repository to the original repository.

If you have any questions or need help with the contribution process, feel free to open an issue on the project’s GitHub repository or Discord: Bio#2408

## 🚀 Feedback

Report a bug ➡️ <a rel="noreferrer noopener" target="_blank" href="https://github.com/amasin76/intranet-web-extension/issues/new/choose">GitHub Issue > Bug Report.</a>  
Request a feature ➡️ <a rel="noreferrer noopener" target="_blank" href="https://github.com/amasin76/intranet-web-extension/issues/new/choose">GitHub Issue > Feature Request.</a>  
Chit Chat ➡️ <a rel="noreferrer noopener" target="_blank" href="https://discord.gg/H3SYN7yanW">Discord Server</a>  
Form ➡️ <a rel="noreferrer noopener" target="_blank" href="https://forms.gle/BLn5yXcwQeK8aKgu5">Google forms</a>
