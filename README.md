# 🤖 Ernest Bot v1.0.0

![Ernest Bot Logo](https://github.com/Ernest12287/Ernest-V2/raw/main/profile.jpg) Welcome to **Ernest Bot v1.0.0**! A powerful and versatile WhatsApp bot designed to automate tasks, provide useful utilities, and enhance your messaging experience. Developed with passion and precision by **Pese Ernest** under the umbrella of **Ernest Tech House**.

## ✨ Features

Ernest Bot v1.0.0 comes packed with an impressive array of functionalities:

* **62 Commands:** A vast collection of commands covering a wide range of utilities and automations.
* **Advanced Auto Status View:**
    * **VAD (View and Download):** Automatically views statuses and downloads associated media (images/videos) for offline access, without notifying the sender.
    * **VND (View Only):** Views statuses without downloading media or sending any notification.
    * **VNS (View and Notify):** Views statuses and sends a configurable "I've seen your status!" message back to the sender, without downloading media.
* **WhatsApp Channel Updates:** Send messages directly to a configured WhatsApp Channel using a simple command, restricted to authorized users.
* **Auto Read Messages:** Configure the bot to automatically mark incoming messages as "read" or leave them unread, based on your preference.
* And many more utilities to discover with its extensive command set!

## 🚀 About Ernest Tech House

**Ernest Tech House** is dedicated to providing innovative and effective technological solutions. Programmed by **Pese Ernest**, we believe that **"Ernest Tech House always has a solution to all problems."**

* **GitHub Repository:** [Honest Bot Repo](https://github.com/Ernest12287/Honest.git)
* **Join Our WhatsApp Channel:** Stay updated with Ernest Bot news and updates by joining our official channel: [Ernest Tech House Channel](https://whatsapp.com/channel/0029VayK4ty7DAWr0jeCZx0i)

Ernest Tech House is committed to excellence and constantly strives to deliver the best!

## ⚙️ Deployment & Resource Considerations

Ernest Bot utilizes `puppeteer` for its WhatsApp Web interactions, which means it runs a headless browser instance. While powerful, this has significant implications for deployment:

* **Resource Intensive:** Running a headless browser can be resource-intensive, especially on systems with limited RAM. If deployed on devices like phones with small RAM, this might lead to noticeable lag and performance issues.
* **Cloud Hosting Requirements:** The bot requires hosting environments that support running web instances and offer sufficient resources.
    * **Compatible Platforms:** Ideal for deployment on platforms like [Koyeb](https://www.koyeb.com/), [Render](https://render.com/), [Railway](https://railway.app/), which are designed to handle web services and provide necessary resources.
    * **Incompatible Platforms:** It **cannot** run on servers like Katabump, as they typically do not provide the environment required for web instances and browser automation.

### **Addressing "Sleeping" Bots (Keeping Ernest Alive!)**

Many free or low-tier cloud hosting providers tend to put applications to "sleep" after a period of inactivity to conserve resources. This can cause your bot to become unresponsive.

But worry not, **Ernest Tech House always has a solution!** We've developed a dedicated service to combat this:

* **Ernest Alive Keeper:** To maintain your bot's awakeness longer and prevent it from sleeping, we recommend utilizing `Ernest Alive Keeper`. You will need to get an account on our platform:
    [**https://ernest-alive-keeper.vercel.app/**](https://ernest-alive-keeper.vercel.app/)
    This service continuously pings your deployed bot instance, ensuring it remains active and responsive.

## 🛠️ Setup and Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/Ernest12287/Honest.git](https://github.com/Ernest12287/Honest.git)
    cd Honest
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory of your project and populate it with necessary configurations. Refer to the `.env.example` (if you have one, otherwise create one based on the details below).
    ```
    # .env
    PHONE_NUMBER=254712345678 # Your bot's phone number for pairing (no + or spaces)

    # --- Auto Status View Configuration ---
    # Options for AUTO_STATUS_VIEW_MODE: VAD, VND, VNS
    AUTO_STATUS_VIEW_MODE=VND 
    SEND_STATUS_VIEW_MESSAGE=false 
    STATUS_VIEW_MESSAGE_TEXT="Hey, I just saw your status! Nice one. 😊"

    # --- Channel Update Configuration ---
    CHANNEL_UPDATE_ID=your_whatsapp_channel_id@newsletter # e.g., 1234567890@newsletter
    ALLOWED_CHANNEL_UPDATE_USERS=254793859108,254103106336 # Comma-separated authorized numbers (no @c.us)

    # --- Auto Read Messages ---
    AUTO_READ=true # Set to 'false' to prevent auto-reading messages

    # --- Other General Bot Settings ---
    COMMAND_PREFIX=! # The prefix for your bot commands
    REACT_ON_SUCCESS=true # Bot reacts with a checkmark on successful command execution
    PROCESS_BOT_STATE=typing # Bot shows 'typing' indicator when processing commands
    ENABLE_AUTO_HISTORY_SYNC=true # Automatically sync chat history
    ```
4.  **Initialize the Bot:**
    ```bash
    node index.js
    # or if you have a start script in package.json
    npm start
    ```
    Follow the on-screen instructions to link your WhatsApp account.

## 🚀 Usage

Once the bot is `READY`, you can start interacting with it on WhatsApp!

* Send commands with the configured `COMMAND_PREFIX` (default: `!`).
* Example: `!help` to see the list of available commands.

## 🤝 Contributing

We welcome contributions! If you have suggestions, bug reports, or want to contribute code, please open an issue or a pull request on the [GitHub repository](https://github.com/Ernest12287/Honest.git).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### GitHub Profile Visits

![Visitor Count](https://hits.sh/Ernest12287/Honest.svg)