export interface BookRef {
  chapter: number
  note: string
}

export interface Session {
  id: string
  title: string
  tag: string
  tagColor: string
  date: string
  concept: string
  bookRefs: BookRef[]
  tasks: string[]
  quiz: string[]
  claudePrompt: string
}

export interface Week {
  id: string
  label: string
  color: string
  light: string
  title: string
  subtitle: string
  sessions: Session[]
}

export interface BookChapters {
  [chapter: number]: string
}

export interface BookEntry {
  name: string
  short: string
  chapters: BookChapters
}

export interface ResourceLink {
  title: string
  url: string
  note: string
}

export interface Resources {
  reference: ResourceLink[]
  tools: ResourceLink[]
  reading: ResourceLink[]
}

export const BOOK: { linux: BookEntry } = {
  linux: {
    name: "Linux Notes for Professionals (GoalKicker)",
    short: "📗 Linux Book",
    chapters: {
      1:  "Ch 1: Getting Started — Useful shortcuts (1.1), File Management Commands (1.2), Hello World (1.3), Basic Utilities (1.4), Searching patterns (1.5), File Manipulation (1.6), File/Directory details (1.7)",
      2:  "Ch 2: Detecting distro — debian-based (2.1), systemd-based (2.2), RHEL/CentOS/Fedora (2.3), uname (2.4), basic info (2.5), GNU coreutils (2.6), find release (2.7)",
      3:  "Ch 3: Kernel info — uname -a (3.1)",
      4:  "Ch 4: Shell — Change default (4.1), Basic Utilities (4.2), Aliases (4.3), Locate files (4.4)",
      5:  "Ch 5: Disk Space — Investigate Directories (5.1), Checking Space (5.2)",
      6:  "Ch 6: System Info — CPU/Memory/Network/Disk stats (6.1), lscpu/lshw (6.2), List Hardware (6.3), CPU model/speed (6.4), Process monitoring (6.5)",
      7:  "Ch 7: ls — Options (7.1), most used examples (7.2)",
      8:  "Ch 8: tar — Compress folder (8.1), Extract (8.2), List contents (8.3), List archive (8.4), Compress exclude (8.5), Strip components (8.6)",
      9:  "Ch 9: Services — List Ubuntu (9.1), systemd management (9.2)",
      10: "Ch 10: Managing Services — Troubleshoot (10.1), Start/Stop (10.2), Status (10.3)",
      11: "Ch 11: Users — Own password (11.1), Another user (11.2), Add user (11.3), Remove user (11.4), Remove with home (11.5), List groups current (11.6), List groups user (11.7)",
      12: "Ch 12: Bash scripting — Shebang (12.1), Variables (12.2), Arrays (12.3), Conditionals (12.4), Loops (12.5), Functions (12.6)",
      13: "Ch 13: tee — To stdout and file (13.1), From pipe chain (13.2), To multiple files (13.3), Append (13.4)",
      14: "Ch 14: SSH — Connect server (14.1), Install OpenSSH (14.2), Configure server (14.3), Passwordless (14.4), Generate key (14.5), Disable service (14.6)",
      15: "Ch 15: SCP — Basic Usage (15.1), Secure Copy (15.2)",
      16: "Ch 16: Cron Jobs — Crontab syntax (16.1), List crons (16.2), Edit crontab (16.3), Special strings (16.4)",
      17: "Ch 17: Network Config — Local DNS (17.1), Configure DNS (17.2), Manipulate routes (17.3), Hostname other system (17.4), Interface details (17.5), Adding IP (17.6)",
      18: "Ch 18: Grep — Basic usage (18.1), Regular expressions (18.2), Recursive (18.3), Context lines (18.4)",
      19: "Ch 19: AWK — Print fields (19.1), Conditionals (19.2), Built-in variables (19.3)",
      20: "Ch 20: Package Managers — Update apt (20.1), Install pacman (20.2), Update pacman (20.3), Update yum (20.4)",
    },
  },
}

export const RESOURCES: Resources = {
  reference: [
    { title: "Anthropic API Docs", url: "https://docs.anthropic.com", note: "Official Claude API reference — tool use, models, pricing, limits" },
    { title: "Claude Code Docs", url: "https://docs.anthropic.com/claude-code", note: "Claude Code CLI documentation" },
    { title: "Linux man pages online", url: "https://man7.org/linux/man-pages/", note: "Full Linux manual pages — use when a command behaves unexpectedly" },
    { title: "GoalKicker Free Books", url: "https://goalkicker.com", note: "Free PDF books: Linux, Bash, Python, SQL — all used in this curriculum" },
    { title: "OverTheWire: Bandit", url: "https://overthewire.org/wargames/bandit/", note: "Linux skills wargame — complete alongside Week 1 sessions" },
  ],
  tools: [
    { title: "WSL2 Install Guide", url: "https://learn.microsoft.com/en-us/windows/wsl/install", note: "Official Microsoft guide for WSL2 setup on Windows" },
    { title: "Supabase Dashboard", url: "https://supabase.com/dashboard", note: "Manage your Supabase project, tables, and API keys" },
    { title: "Vercel Dashboard", url: "https://vercel.com/dashboard", note: "Deploy and monitor your projects" },
    { title: "Render.com", url: "https://render.com", note: "Free tier Flask/Python API hosting used in Week 3" },
    { title: "GitHub Actions", url: "https://github.com/features/actions", note: "CI/CD pipeline setup covered in Week 4" },
  ],
  reading: [
    { title: "Anthropic Prompt Engineering Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", note: "Official prompting strategies for Claude" },
    { title: "Tool Use (Function Calling)", url: "https://docs.anthropic.com/en/docs/build-with-claude/tool-use", note: "How to build Claude agents with tools — core Week 2–3 skill" },
    { title: "Flask Documentation", url: "https://flask.palletsprojects.com", note: "Python web framework used in Week 3 REST API session" },
    { title: "Docker Getting Started", url: "https://docs.docker.com/get-started/", note: "Container fundamentals — prep for Week 2" },
  ],
}

export const WEEKS: Week[] = [
  // ════════════════════════ PRE-START ═════════════════════════
  {
    id: "w0",
    label: "Pre-Start",
    color: "#4A148C",
    light: "#FAF0FF",
    title: "WSL2 + Claude Code Setup",
    subtitle: "Complete this Saturday before Day 1.",
    sessions: [
      {
        id: "s0",
        title: "Setup: WSL2 + Claude Code on Windows",
        tag: "SETUP",
        tagColor: "#4A148C",
        date: "Pre-Start — before Day 1",
        concept: "Your Windows PC runs WSL2 — a real Ubuntu kernel inside Windows. It shares your filesystem and network so you use genuine Linux commands. Claude Code is an AI assistant that runs in your terminal, reads your codebase, and writes code with you.",
        bookRefs: [
          { chapter: 1, note: "Read Ch 1 Sections 1.1–1.2 now: Useful shortcuts & File Management Commands — so the terminal feels familiar on Day 1" },
          { chapter: 20, note: "Read Ch 20 Section 20.1: apt package manager basics — you'll run apt install dozens of times" },
        ],
        tasks: [
          "Open PowerShell as Administrator",
          "Run: wsl --install (restart when prompted)",
          "Open Ubuntu from Start Menu → set username and password",
          "Run: sudo apt update && sudo apt upgrade -y",
          "Run: sudo apt install -y git curl wget vim htop net-tools tree",
          "Node.js 22: curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs",
          "Verify: node --version && npm --version",
          "Run: sudo apt install -y python3 python3-pip",
          "Run: pip3 install anthropic --break-system-packages",
          "Install Claude Code: npm install -g @anthropic-ai/claude-code",
          "Get API key from console.anthropic.com → API Keys",
          "Store key: echo 'export ANTHROPIC_API_KEY=\"sk-ant-YOUR-KEY-HERE\"' >> ~/.bashrc",
          "Run: source ~/.bashrc",
          "Secure: chmod 600 ~/.bashrc",
          "Test Claude Code: claude 'list the files in the current directory'",
          "Run: mkdir -p ~/projects && cd ~/projects",
          "Create a GitHub account if you don't have one (github.com)",
          "Configure git: git config --global user.name 'Your Name' && git config --global user.email 'you@email.com'",
        ],
        quiz: [
          "What is WSL2 and why is it better than a full VM for development?",
          "Why do we store the API key in ~/.bashrc instead of hardcoding it?",
          "What does chmod 600 do to ~/.bashrc and why is that important?",
        ],
        claudePrompt: "Say to Claude Code: 'Pre-start complete — verify my WSL2, Python, and Claude Code setup and tell me if anything is missing.'",
      },
    ],
  },

  // ════════════════════════ WEEK 1 ════════════════════════════
  {
    id: "w1",
    label: "Week 1",
    color: "#1A237E",
    light: "#EEF2FF",
    title: "Linux Filesystem & Basic Tools",
    subtitle: "Master navigation, permissions, shell scripting, packages + first real agent.",
    sessions: [
      {
        id: "s1",
        title: "Day 1 — Filesystem, ls, grep, find",
        tag: "LINUX",
        tagColor: "#1A237E",
        date: "Day 1 — Monday",
        concept: "The Linux filesystem starts at / (root). Everything is a file — even devices and processes. ls lists directory contents, grep searches text patterns inside files, find locates files by name, type, or size. These three cover 80% of daily navigation and debugging work.",
        bookRefs: [
          { chapter: 1, note: "Read ALL of Ch 1 today (Sections 1.1–1.7): shortcuts, file management, grep/find patterns, file manipulation — run every example in the terminal" },
          { chapter: 7, note: "Read Ch 7 Sections 7.1–7.2: Every ls option and example — type each one yourself" },
        ],
        tasks: [
          "📗 Read Linux Book Ch 1 (all sections) and Ch 7",
          "OverTheWire Bandit Levels 0–3: bandit.labs.overthewire.org",
          "ls -la /",
          "ls -la /etc && ls -la /var && ls -la /home && ls -la /usr",
          "grep -r 'root' /etc/passwd",
          "grep -rn 'PermitRootLogin' /etc/ssh/ 2>/dev/null",
          "find / -name '*.log' -size +1M 2>/dev/null | head -10",
          "find /home -type f -name '*.py' 2>/dev/null",
          "find /etc -name '*.conf' -mtime -7 2>/dev/null | head -10",
          "AGENT: claude 'Create a Python script that lists all .py files in ~/projects, prints their filenames and line counts, and shows a total'",
          "Read the generated script carefully before running it",
          "python3 file_lister.py",
          "Create GitHub repo 'linux-ai-tools' and push the script",
        ],
        quiz: [
          "What does ls -la show that plain ls does not?",
          "What is the difference between grep and find?",
          "What does 2>/dev/null do in the find command?",
          "What is the difference between /etc, /var, and /usr directories?",
        ],
        claudePrompt: "Say: 'Starting Day 1 — I'm learning the Linux filesystem. Teach me ls, grep, and find with practical examples.'",
      },
      {
        id: "s2",
        title: "Day 2 — Permissions & Users",
        tag: "LINUX",
        tagColor: "#1A237E",
        date: "Day 2 — Tuesday",
        concept: "Linux permissions use three triads: owner (u), group (g), others (o) — each with read (r=4), write (w=2), execute (x=1). chmod changes permissions, chown changes ownership. Users and groups are the foundation of Linux security.",
        bookRefs: [
          { chapter: 11, note: "Read Ch 11 fully: user management — add/remove users, change passwords, manage groups" },
          { chapter: 1, note: "Review Ch 1 Section 1.6: File manipulation — chmod and chown examples to run yourself" },
        ],
        tasks: [
          "📗 Read Linux Book Ch 11",
          "OverTheWire Bandit Levels 4–7",
          "cat /etc/passwd | grep -v nologin | grep -v false",
          "cat /etc/group | head -20",
          "id && whoami && groups",
          "ls -la /home",
          "sudo useradd -m testuser && sudo passwd testuser",
          "sudo usermod -aG sudo testuser",
          "su - testuser (switch to testuser then exit)",
          "touch testfile.txt && chmod 644 testfile.txt && ls -la testfile.txt",
          "chmod 755 testfile.txt && ls -la testfile.txt",
          "chmod 600 testfile.txt && ls -la testfile.txt",
          "AGENT: claude 'Create a Python script that takes a file path and prints its permissions in both octal (e.g. 644) and symbolic (e.g. rw-r--r--) format'",
          "python3 permissions_reader.py /etc/passwd",
          "sudo userdel -r testuser",
        ],
        quiz: [
          "What does 755 mean in chmod notation — break down each digit?",
          "Why should most config files NOT be chmod 777?",
          "What is the difference between su and sudo?",
          "How do groups allow multiple users to share file access?",
        ],
        claudePrompt: "Say: 'Starting Day 2 — teach me Linux file permissions and user management. I want to understand chmod, chown, users, and groups.'",
      },
      {
        id: "s3",
        title: "Day 3 — Shell Scripting + tar",
        tag: "LINUX + SCRIPTING",
        tagColor: "#4527A0",
        date: "Day 3 — Wednesday",
        concept: "Bash scripts automate repetitive commands. A script is just a text file starting with #!/bin/bash — it runs top-to-bottom, supports variables ($VAR), loops (for/while), conditionals (if/then), and functions. tar creates compressed archives.",
        bookRefs: [
          { chapter: 4, note: "Read Ch 4 Sections 4.1–4.4: Shell basics, change default shell, aliases (add yours today), locate files" },
          { chapter: 8, note: "Read Ch 8 Sections 8.1–8.6: tar compress, extract, list, strip components — run every example" },
          { chapter: 12, note: "Read Ch 12 Sections 12.1–12.6: Bash scripting — shebang, variables, arrays, conditionals, loops, functions" },
        ],
        tasks: [
          "📗 Read Linux Book Ch 4, Ch 8, and Ch 12",
          "nano ~/.bashrc — add at least 3 useful aliases (e.g. alias ll='ls -la')",
          "source ~/.bashrc && test your new aliases",
          "mkdir -p ~/scripts && cd ~/scripts",
          "Write backup.sh: archives ~/projects to ~/backups/backup-$(date +%Y%m%d).tar.gz",
          "chmod +x backup.sh && ./backup.sh",
          "tar -tzf ~/backups/backup-*.tar.gz | head -20 (list archive contents)",
          "mkdir -p /tmp/restore-test && tar -xzf ~/backups/backup-*.tar.gz -C /tmp/restore-test/",
          "Write a for loop script: iterate over all *.sh files in ~/scripts and print name + line count",
          "Write a conditional script: check if ~/projects exists, create it if not",
          "AGENT: claude 'Create a Bash script that monitors disk usage: if any partition is over 80% full, print a warning with the partition name and current usage'",
          "Review the generated script, then: chmod +x disk_monitor.sh && ./disk_monitor.sh",
        ],
        quiz: [
          "What does tar -czf archive.tar.gz folder/ do vs tar -xzf archive.tar.gz?",
          "How do you make a Bash script executable, and what is the shebang line?",
          "What is $() used for in shell scripts — give an example?",
          "Why are aliases saved in ~/.bashrc and not in the script itself?",
        ],
        claudePrompt: "Say: 'Starting Day 3 — teach me Bash scripting fundamentals and tar archiving with practical examples.'",
      },
      {
        id: "s4",
        title: "Day 4 — Package Management + Services",
        tag: "LINUX + SYSADMIN",
        tagColor: "#1B5E20",
        date: "Day 4 — Thursday",
        concept: "apt is Ubuntu's package manager — it installs, updates, and removes software from curated repositories. systemd manages every service on modern Linux: it starts them on boot, restarts them on crash, and logs everything to journalctl.",
        bookRefs: [
          { chapter: 9, note: "Read Ch 9 Sections 9.1–9.2: List services on Ubuntu, systemd management — run systemctl status on 5 services" },
          { chapter: 10, note: "Read Ch 10 Sections 10.1–10.3: Troubleshoot, start/stop, check status — essential for debugging" },
          { chapter: 20, note: "Read Ch 20 Sections 20.1–20.4: apt, pacman, yum — understand all three even if you only use apt daily" },
        ],
        tasks: [
          "📗 Read Linux Book Ch 9, Ch 10, and Ch 20",
          "OverTheWire Bandit Levels 8–11",
          "sudo apt update && sudo apt upgrade -y",
          "apt list --installed | wc -l (count installed packages)",
          "sudo apt install -y htop tree jq",
          "systemctl status ssh",
          "systemctl list-units --type=service --state=running",
          "sudo systemctl stop ssh && sudo systemctl start ssh",
          "journalctl -u ssh -n 50 (last 50 SSH log lines)",
          "sudo apt install -y nginx && systemctl status nginx",
          "curl http://localhost (verify nginx is serving)",
          "sudo systemctl disable nginx (don't start on boot)",
          "AGENT: claude 'Create a Python script that checks if a list of services (ssh, nginx, cron) are running and prints their status with color coding'",
          "python3 service_checker.py",
        ],
        quiz: [
          "What is the difference between apt install and apt upgrade?",
          "What does systemctl enable do vs systemctl start?",
          "Where does systemd write service logs, and how do you read them?",
          "What is a package repository and why does Ubuntu use them?",
        ],
        claudePrompt: "Say: 'Starting Day 4 — teach me apt package management and systemd service management with practical examples.'",
      },
      {
        id: "s5",
        title: "Day 5 — Processes, Cron + First Claude Agent",
        tag: "LINUX + AI AGENT",
        tagColor: "#BF360C",
        date: "Day 5 — Friday",
        concept: "Linux processes are tracked by PID. ps aux shows all running processes, top/htop shows real-time CPU/memory usage, kill sends signals. Cron automates scheduled tasks using a time syntax: minute hour day month weekday. Your first Claude agent combines Linux monitoring with AI analysis.",
        bookRefs: [
          { chapter: 6, note: "Read Ch 6 Sections 6.1–6.5: System info, CPU/memory stats, lscpu, process monitoring — run every command" },
          { chapter: 16, note: "Read Ch 16 Sections 16.1–16.4: Cron syntax, list crons, edit crontab, special strings (@reboot, @daily)" },
        ],
        tasks: [
          "📗 Read Linux Book Ch 6 and Ch 16",
          "OverTheWire Bandit Levels 12–15",
          "ps aux | head -20",
          "ps aux | sort -k3 -rn | head -5 (top CPU processes)",
          "ps aux | sort -k4 -rn | head -5 (top memory processes)",
          "htop (press q to quit)",
          "kill -l (list all signals)",
          "crontab -l (list current cron jobs)",
          "crontab -e — add: */5 * * * * echo 'cron test' >> /tmp/cron.log",
          "Wait 5 min, check: cat /tmp/cron.log",
          "AGENT: claude 'Create a Python script that uses the Anthropic API to monitor system health: check CPU usage, memory, and disk, then ask Claude to summarize the health status and recommend any actions'",
          "pip3 install psutil --break-system-packages",
          "Review the generated script carefully",
          "export ANTHROPIC_API_KEY='your-key' && python3 system_health_agent.py",
          "Push all Week 1 scripts to your linux-ai-tools GitHub repo",
        ],
        quiz: [
          "What is the difference between kill and kill -9?",
          "Explain the cron syntax: 0 2 * * 1 — when does this run?",
          "What is a zombie process and why does it happen?",
          "What does the Anthropic SDK's client.messages.create() function return?",
        ],
        claudePrompt: "Say: 'Day 5 complete — I have all Week 1 Linux scripts. Review my linux-ai-tools repo and suggest improvements to any script.'",
      },
    ],
  },

  // ════════════════════════ WEEK 2 ════════════════════════════
  {
    id: "w2",
    label: "Week 2",
    color: "#1B5E20",
    light: "#F1F8E9",
    title: "SSH, Networking & Services",
    subtitle: "Connect to remote servers, diagnose networks, deploy services + multi-turn agents.",
    sessions: [
      {
        id: "s6",
        title: "Day 6 — SSH + Remote Access",
        tag: "NETWORKING",
        tagColor: "#1B5E20",
        date: "Day 6 — Monday",
        concept: "SSH (Secure Shell) encrypts all traffic between your machine and a remote server. Public key auth is more secure than passwords — you generate a key pair, put the public key on the server, keep the private key safe. SCP copies files over SSH.",
        bookRefs: [
          { chapter: 14, note: "Read ALL of Ch 14: SSH connect, install OpenSSH, configure, passwordless auth, generate keys, disable service" },
          { chapter: 15, note: "Read Ch 15 Sections 15.1–15.2: SCP basic usage and secure copy examples" },
        ],
        tasks: [
          "📗 Read Linux Book Ch 14 and Ch 15",
          "ssh-keygen -t ed25519 -C 'your-email@example.com'",
          "cat ~/.ssh/id_ed25519.pub (view your public key)",
          "eval $(ssh-agent -s) && ssh-add ~/.ssh/id_ed25519",
          "Add public key to GitHub: github.com/settings/keys",
          "Test: ssh -T git@github.com",
          "sudo systemctl start ssh && sudo systemctl status ssh",
          "ssh localhost (connect to your own machine to test)",
          "scp ~/.bashrc localhost:/tmp/bashrc-copy (test file copy)",
          "cat /etc/ssh/sshd_config | grep -v '#' | grep -v '^$'",
          "AGENT: claude 'Create a Python script that SSHs to localhost, runs a system health check (uptime, df -h, free -m), and returns the output as structured JSON'",
          "pip3 install paramiko --break-system-packages",
          "python3 ssh_health_check.py",
        ],
        quiz: [
          "What is the difference between a public key and a private key in SSH?",
          "Why is key-based auth more secure than password auth?",
          "What does ssh-agent do and why is it useful?",
          "What port does SSH use by default, and how would you change it?",
        ],
        claudePrompt: "Say: 'Starting Day 6 — teach me SSH key management, remote access, and SCP with practical examples.'",
      },
      {
        id: "s7",
        title: "Day 7 — Networking Diagnostics",
        tag: "NETWORKING",
        tagColor: "#1B5E20",
        date: "Day 7 — Tuesday",
        concept: "Networking is just computers talking through layers of protocols. IP addresses identify machines, ports identify services. curl tests HTTP, ping tests reachability, netstat/ss shows open ports, traceroute shows the path packets take.",
        bookRefs: [
          { chapter: 17, note: "Read ALL of Ch 17: Local DNS, configure DNS, manipulate routes, hostname, interface details, adding IP addresses" },
          { chapter: 5, note: "Read Ch 5 Sections 5.1–5.2: Disk space investigation — you need this for capacity planning" },
        ],
        tasks: [
          "📗 Read Linux Book Ch 17 and Ch 5",
          "ip addr show (list network interfaces and IPs)",
          "ip route show (routing table)",
          "ping -c 4 google.com",
          "traceroute google.com (or tracepath if traceroute not installed)",
          "curl -I https://github.com (HTTP headers only)",
          "curl -o /dev/null -s -w '%{http_code}\\n' https://google.com",
          "ss -tulpn (list listening ports and which process owns them)",
          "cat /etc/resolv.conf (DNS servers)",
          "nslookup github.com && dig github.com",
          "df -h && du -sh /var/log/* 2>/dev/null | sort -rh | head -10",
          "AGENT: claude 'Create a Python network diagnostic script that: checks internet connectivity, measures latency to 3 hosts, lists open ports, and summarizes findings'",
          "python3 network_diag.py",
        ],
        quiz: [
          "What is the difference between a public IP and a private IP address?",
          "What does netstat -tulpn (or ss -tulpn) tell you?",
          "What is DNS and what does /etc/resolv.conf configure?",
          "What does curl -I do differently than curl?",
        ],
        claudePrompt: "Say: 'Starting Day 7 — teach me Linux networking diagnostics: ping, traceroute, curl, and port scanning.'",
      },
      {
        id: "s8",
        title: "Day 8 — grep, awk, sed + Log Analysis",
        tag: "LINUX + SCRIPTING",
        tagColor: "#4527A0",
        date: "Day 8 — Wednesday",
        concept: "grep, awk, and sed are the Unix text processing triumvirate. grep finds lines matching a pattern, awk processes fields in structured text, sed edits text in-stream. Together they turn raw log files into useful information.",
        bookRefs: [
          { chapter: 18, note: "Read ALL of Ch 18: grep basic usage, regular expressions, recursive search, context lines — grep is one of the most-used Linux commands" },
          { chapter: 19, note: "Read ALL of Ch 19: AWK print fields, conditionals, built-in variables — awk for parsing CSV/log data" },
          { chapter: 13, note: "Read ALL of Ch 13: tee — essential for logging output to file AND seeing it on screen simultaneously" },
        ],
        tasks: [
          "📗 Read Linux Book Ch 18, Ch 19, and Ch 13",
          "OverTheWire Bandit Levels 16–19",
          "grep -r 'ERROR' /var/log/ 2>/dev/null | head -20",
          "grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}' /var/log/syslog 2>/dev/null | head -10",
          "awk '{print $1}' /etc/passwd | head -10 (first field = username)",
          "awk -F: '{print $1, $3}' /etc/passwd | head -10 (username and UID)",
          "ps aux | awk '{print $1, $3, $11}' | sort -k2 -rn | head -10",
          "sed 's/root/ROOT/g' /etc/passwd | head -5 (substitute without editing)",
          "cat /var/log/auth.log 2>/dev/null | grep 'Failed' | tail -20",
          "AGENT: claude 'Create a Python script that analyzes /var/log/syslog (or auth.log), extracts the top 10 most frequent log patterns, and asks Claude to identify any security concerns'",
          "python3 log_analyzer.py 2>/dev/null || python3 log_analyzer.py /var/log/dpkg.log",
        ],
        quiz: [
          "What is the difference between grep -E and grep -F?",
          "In awk, what are $1, $2, $NF?",
          "What does sed -i do and why is it dangerous without a backup?",
          "How would you use tee to log output to a file and see it on screen?",
        ],
        claudePrompt: "Say: 'Starting Day 8 — teach me grep, awk, and sed for log analysis with practical examples.'",
      },
      {
        id: "s9",
        title: "Day 9 — Cron, Environment & Multi-turn Agent",
        tag: "LINUX + AI AGENT",
        tagColor: "#BF360C",
        date: "Day 9 — Thursday",
        concept: "Environment variables pass configuration to processes without hardcoding values. .env files store them locally. A multi-turn agent maintains conversation history across multiple API calls — each call includes all previous messages so Claude remembers context.",
        bookRefs: [
          { chapter: 16, note: "Re-read Ch 16 Cron Jobs — now implement a real monitoring cron with your Python skills" },
          { chapter: 4, note: "Re-read Ch 4 Shell section: environment variables and how they propagate to child processes" },
        ],
        tasks: [
          "printenv | sort (all environment variables)",
          "echo $PATH | tr ':' '\\n' (each PATH entry on new line)",
          "export MY_VAR='hello' && echo $MY_VAR",
          "Create ~/projects/.env: API_KEY=test123, DEBUG=true, MAX_RETRIES=3",
          "Write Python: load .env with python-dotenv, print each variable",
          "pip3 install python-dotenv --break-system-packages",
          "AGENT: claude 'Create a multi-turn Python CLI chatbot using the Anthropic API that maintains conversation history, supports a /clear command to reset, and /history to show turns'",
          "Review the script carefully, run it: python3 chatbot.py",
          "Test: ask it 3 questions, use /history, then /clear",
          "Set up a cron job: every hour, run your system_health_agent.py and append output to ~/logs/health.log",
          "mkdir -p ~/logs && crontab -e (add the hourly job)",
          "Push all new scripts to GitHub",
        ],
        quiz: [
          "What is the difference between export VAR=value and VAR=value in bash?",
          "Why do we use .env files instead of hardcoding API keys in scripts?",
          "What makes a 'multi-turn' agent different from a single API call?",
          "What is the messages array structure in the Anthropic API?",
        ],
        claudePrompt: "Say: 'Day 9 — I'm building a multi-turn CLI agent. Help me add a conversation summary feature that kicks in after 10 turns to keep the context window manageable.'",
      },
      {
        id: "s10",
        title: "Day 10 — Git Workflows + Week 2 Review",
        tag: "DEVOPS",
        tagColor: "#006064",
        date: "Day 10 — Friday",
        concept: "Git is the version control system that every developer uses. Branches let you work on features without breaking main. Pull requests are the code review mechanism. A good Git workflow prevents bugs, enables collaboration, and creates an audit trail.",
        bookRefs: [
          { chapter: 1, note: "Review Ch 1 Section 1.7: File/Directory details — reinforce ls -la for git repo inspection" },
        ],
        tasks: [
          "OverTheWire Bandit Levels 20–25",
          "cd ~/projects && git init week2-review",
          "git config --global init.defaultBranch main",
          "cd week2-review && git checkout -b feature/monitoring",
          "Copy your best scripts from Days 6–9 into this repo",
          "git add . && git commit -m 'Add Week 2 monitoring scripts'",
          "git checkout main && git merge feature/monitoring",
          "git log --oneline --graph (visual commit history)",
          "git diff HEAD~1 HEAD (changes in last commit)",
          "Push to GitHub: create repo linux-ai-week2, push main",
          "AGENT: claude 'Review my monitoring scripts in this repo and suggest 3 specific improvements with code examples'",
          "Write a README.md for the repo documenting each script",
          "Tag the release: git tag -a v1.0 -m 'Week 2 complete' && git push origin v1.0",
        ],
        quiz: [
          "What is the difference between git merge and git rebase?",
          "What does git stash do and when would you use it?",
          "What is a .gitignore file and what should it contain?",
          "What is the difference between git pull and git fetch?",
        ],
        claudePrompt: "Say: 'Week 2 complete — I have networking, SSH, text processing, and multi-turn agent skills. What should I focus on most in Week 3?'",
      },
    ],
  },

  // ════════════════════════ WEEK 3 ════════════════════════════
  {
    id: "w3",
    label: "Week 3",
    color: "#BF360C",
    light: "#FBE9E7",
    title: "Python Agents & Claude API Deep Dive",
    subtitle: "Structured JSON output, tool use, Flask REST API, deploy to Render.",
    sessions: [
      {
        id: "s11",
        title: "Day 11 — Structured JSON Output + Tool Use",
        tag: "AI AGENT",
        tagColor: "#BF360C",
        date: "Day 11 — Monday",
        concept: "Claude can return structured JSON when you ask it to — making outputs machine-readable and reliably parseable. Tool use (function calling) lets Claude decide to call external functions you define: weather APIs, databases, shell commands. This is how real agents work.",
        bookRefs: [],
        tasks: [
          "Read: docs.anthropic.com/en/docs/build-with-claude/tool-use",
          "AGENT: claude 'Create a Python script that asks Claude to analyze a Linux log file and return structured JSON: { issues: [], recommendations: [], severity: string }'",
          "Run it on /var/log/syslog or a log file of your choice",
          "AGENT: claude 'Create a Python tool-use agent that has 3 tools: run_shell_command, read_file, and write_file. The agent should use these to complete a task I describe in plain English'",
          "Test: ask the agent to 'check disk space and create a report file'",
          "Test: ask the agent to 'find all Python files modified today'",
          "Explore: what happens when Claude calls the wrong tool?",
          "Add error handling for when tool calls fail",
          "Push to GitHub with clear docstrings",
        ],
        quiz: [
          "What is the difference between a regular API call and tool use?",
          "How does Claude decide which tool to call?",
          "Why is structured JSON output more useful than plain text in production?",
          "What happens if a tool returns an error — how should your agent handle it?",
        ],
        claudePrompt: "Say: 'Starting Day 11 — help me build a tool-use agent. I want Claude to be able to run shell commands and read files. Show me the full tool schema format.'",
      },
      {
        id: "s12",
        title: "Day 12 — Flask REST API",
        tag: "WEB + AI",
        tagColor: "#E65100",
        date: "Day 12 — Tuesday",
        concept: "Flask is a lightweight Python web framework. A REST API exposes endpoints that clients call over HTTP. When you combine Flask with the Anthropic SDK, you get an AI-powered API that any frontend, mobile app, or other service can call.",
        bookRefs: [],
        tasks: [
          "pip3 install flask --break-system-packages",
          "AGENT: claude 'Create a Flask REST API with 4 endpoints: POST /analyze (takes text, returns Claude analysis), GET /health (returns status), POST /summarize (summarizes long text), POST /classify (classifies text into categories)'",
          "Run: python3 app.py",
          "Test with curl: curl -X POST http://localhost:5000/analyze -H 'Content-Type: application/json' -d '{\"text\": \"explain grep\"}'",
          "Test all 4 endpoints",
          "Add request validation: return 400 if text is missing or empty",
          "Add rate limiting: max 10 requests per minute per IP",
          "pip3 install flask-limiter --break-system-packages",
          "Add logging: log every request to ~/logs/api.log",
          "Test the rate limiter by sending 15 rapid requests",
          "Push to GitHub",
        ],
        quiz: [
          "What is the difference between GET and POST HTTP methods?",
          "What does a 400 status code mean vs 500?",
          "Why should you validate API inputs before passing them to Claude?",
          "What is rate limiting and why is it important for AI APIs?",
        ],
        claudePrompt: "Say: 'Starting Day 12 — I'm building a Flask API wrapping Claude. Help me add authentication using API keys in the request header.'",
      },
      {
        id: "s13",
        title: "Day 13 — Deploy Flask API to Render",
        tag: "DEPLOYMENT",
        tagColor: "#1565C0",
        date: "Day 13 — Wednesday",
        concept: "Deployment means running your code on a server that's always on and reachable from the internet. Render.com is a platform that runs Docker containers or Python apps for free. Environment variables in Render replace your local .env file.",
        bookRefs: [],
        tasks: [
          "Create account at render.com",
          "Add requirements.txt: flask, anthropic, flask-limiter, gunicorn",
          "Add Procfile: web: gunicorn app:app",
          "git add requirements.txt Procfile && git commit -m 'Add deployment config'",
          "Push to GitHub",
          "Render Dashboard → New → Web Service → Connect GitHub repo",
          "Set environment variable: ANTHROPIC_API_KEY",
          "Deploy and wait for build to complete",
          "Test live URL: curl https://YOUR-APP.onrender.com/health",
          "Test: curl -X POST https://YOUR-APP.onrender.com/analyze ...",
          "AGENT: claude 'Create a Python script that stress tests the deployed API: send 20 requests in parallel and measure average response time and error rate'",
          "python3 stress_test.py",
        ],
        quiz: [
          "What is gunicorn and why do we use it instead of Flask's built-in server?",
          "What is a Procfile and what does it tell the hosting platform?",
          "Why do we use environment variables in production instead of .env files?",
          "What would you check first if your deployed API returns 500 errors?",
        ],
        claudePrompt: "Say: 'Day 13 — my Flask API is live on Render. Help me add a /webhook endpoint that receives GitHub push events and uses Claude to summarize the changes.'",
      },
      {
        id: "s14",
        title: "Day 14 — Agent Memory + Context Management",
        tag: "AI AGENT",
        tagColor: "#BF360C",
        date: "Day 14 — Thursday",
        concept: "Context windows have limits. A production agent needs memory strategies: summarization (compress old messages), sliding window (keep last N turns), or external storage (save facts to a database). Choosing the right strategy affects cost, coherence, and performance.",
        bookRefs: [],
        tasks: [
          "Read: docs.anthropic.com/en/docs/build-with-claude/context-windows",
          "AGENT: claude 'Build a Python agent with three memory modes: (1) full history, (2) sliding window of last 5 turns, (3) summarization mode where every 10 turns you ask Claude to summarize and reset. Add a --mode flag to switch.'",
          "Test all three modes with a 15-message conversation",
          "Compare: token usage of each mode (log it)",
          "AGENT: claude 'Add persistent memory to the agent: save key facts from each conversation to a JSON file, load them as a system prompt prefix on startup'",
          "Test: start agent, mention your name, exit, restart, verify it remembers",
          "Push with documentation explaining when to use each memory mode",
        ],
        quiz: [
          "What is a context window and what happens when you exceed it?",
          "What are the trade-offs between summarization vs sliding window memory?",
          "What is a system prompt and when should it include user-specific context?",
          "How would you implement agent memory in a multi-user production system?",
        ],
        claudePrompt: "Say: 'Day 14 — I've built memory modes. Now help me build a RAG system: embed my ~/scripts folder so Claude can answer questions about my code without pasting it all in.'",
      },
      {
        id: "s15",
        title: "Day 15 — Week 3 Review + Integration Project",
        tag: "PROJECT",
        tagColor: "#880E4F",
        date: "Day 15 — Friday",
        concept: "Integration is where the real learning happens. Combining Linux sysadmin, Python scripting, Claude API, and web deployment into one coherent system is a meaningful portfolio project that demonstrates real capability.",
        bookRefs: [],
        tasks: [
          "Build the integration project: Linux System Monitor with AI Insights",
          "collect_metrics.sh: bash script that gathers CPU, memory, disk, top processes",
          "metrics_api.py: Flask API that runs collect_metrics.sh and passes to Claude",
          "Claude prompt: analyze metrics and return JSON { status, issues[], recommendations[], alert_level }",
          "dashboard.html: simple HTML page that polls /metrics every 30s and displays results",
          "deploy.sh: automates deployment to Render",
          "Set up a cron job to call your live API every hour and log the results",
          "Push the complete project to GitHub as 'linux-ai-monitor'",
          "Write a README with architecture diagram (ASCII art is fine)",
          "AGENT: claude 'Review my linux-ai-monitor project and identify the 3 most important improvements for production reliability'",
        ],
        quiz: [
          "How does your system handle the case where Claude's API is unavailable?",
          "What monitoring would you add to know if your own API goes down?",
          "How would you scale this to monitor 100 servers instead of 1?",
          "What security vulnerabilities exist in running shell commands from an API?",
        ],
        claudePrompt: "Say: 'Week 3 complete — I've built a deployed AI-powered Linux monitor. Review the architecture and tell me what a senior engineer would critique.'",
      },
    ],
  },

  // ════════════════════════ WEEK 4 ════════════════════════════
  {
    id: "w4",
    label: "Week 4",
    color: "#1A237E",
    light: "#E8EAF6",
    title: "Advanced Agents & Production",
    subtitle: "Agent orchestration, GitHub Actions CI/CD, monitoring, capstone project.",
    sessions: [
      {
        id: "s16",
        title: "Day 16 — Docker Fundamentals",
        tag: "DEVOPS",
        tagColor: "#006064",
        date: "Day 16 — Monday",
        concept: "Docker packages your app and all its dependencies into a container — a lightweight, isolated process. Containers run identically on any machine: your laptop, a CI server, AWS. This eliminates 'works on my machine' problems.",
        bookRefs: [],
        tasks: [
          "curl -fsSL https://get.docker.com | sh",
          "sudo usermod -aG docker $USER && newgrp docker",
          "docker run hello-world",
          "docker run -it ubuntu bash (explore inside a container)",
          "docker ps && docker ps -a",
          "Write a Dockerfile for your Flask API from Week 3",
          "docker build -t linux-ai-api:v1 .",
          "docker run -p 5000:5000 -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY linux-ai-api:v1",
          "curl http://localhost:5000/health",
          "docker logs CONTAINER_ID",
          "AGENT: claude 'Create a docker-compose.yml that runs my Flask API + Redis for caching, with proper networking and environment variable handling'",
          "docker-compose up -d && docker-compose ps",
          "docker-compose down",
        ],
        quiz: [
          "What is the difference between a Docker image and a container?",
          "What does COPY vs ADD do in a Dockerfile?",
          "Why do we use multi-stage builds in production Dockerfiles?",
          "What is docker-compose and when would you use it?",
        ],
        claudePrompt: "Say: 'Starting Day 16 — I'm containerizing my Flask API. Help me optimize the Dockerfile: minimal image size, non-root user, and health check.'",
      },
      {
        id: "s17",
        title: "Day 17 — GitHub Actions CI/CD",
        tag: "DEVOPS + CICD",
        tagColor: "#1565C0",
        date: "Day 17 — Tuesday",
        concept: "CI/CD (Continuous Integration/Continuous Deployment) automates testing and deployment. GitHub Actions runs workflows on push/PR events. A good pipeline tests your code, builds a Docker image, and deploys to production — all automatically.",
        bookRefs: [],
        tasks: [
          "Create .github/workflows/ci.yml in your linux-ai-monitor repo",
          "AGENT: claude 'Write a GitHub Actions workflow that: (1) runs on every push to main, (2) installs Python deps, (3) runs pytest on any test files, (4) builds Docker image, (5) pushes to Docker Hub if tests pass'",
          "Create a Docker Hub account at hub.docker.com",
          "Add GitHub secrets: DOCKERHUB_USERNAME, DOCKERHUB_TOKEN, ANTHROPIC_API_KEY",
          "Write at least 3 pytest tests for your Flask API endpoints",
          "Push to GitHub and watch the Actions tab",
          "Fix any failing tests",
          "Verify Docker image is pushed to Docker Hub",
          "Update README with CI badge: ![CI](https://github.com/USERNAME/REPO/actions/workflows/ci.yml/badge.svg)",
        ],
        quiz: [
          "What triggers a GitHub Actions workflow?",
          "Why do we use secrets instead of hardcoding credentials in workflows?",
          "What is the difference between a job and a step in GitHub Actions?",
          "What is pytest and how do you write a basic test for a Flask endpoint?",
        ],
        claudePrompt: "Say: 'Day 17 — my CI pipeline is running. Help me add a deployment step that SSH-es into a server and runs docker pull + docker restart when tests pass.'",
      },
      {
        id: "s18",
        title: "Day 18 — Monitoring + Observability",
        tag: "SYSADMIN + AI",
        tagColor: "#1B5E20",
        date: "Day 18 — Wednesday",
        concept: "In production, you need to know when things break before users do. Logging captures what happened. Metrics show trends over time. Alerts notify you instantly. A monitoring stack typically includes log aggregation, metrics collection, and alerting.",
        bookRefs: [],
        tasks: [
          "sudo apt install -y prometheus-node-exporter",
          "curl http://localhost:9100/metrics | head -30",
          "AGENT: claude 'Create a Python monitoring script that: collects node exporter metrics via HTTP, identifies anomalies (CPU > 80%, disk > 90%), and sends a summary to Claude for analysis and suggested fixes'",
          "pip3 install prometheus-client --break-system-packages",
          "Add Prometheus metrics to your Flask API: request_count, response_time_seconds, error_count",
          "Write a log aggregator: tail -f multiple log files, parse JSON logs, alert on ERROR level",
          "Create a monitoring dashboard script: displays live metrics in the terminal",
          "Test: simulate high load and verify alerts trigger",
          "Push everything to GitHub",
        ],
        quiz: [
          "What is the difference between logs, metrics, and traces?",
          "What is Prometheus and what is an exporter?",
          "What makes a good alert vs a noisy one?",
          "How would you set up alerting that pages you at 3am only for critical issues?",
        ],
        claudePrompt: "Say: 'Day 18 — I have metrics and logging set up. Help me build an AI-powered alert: when anomalies are detected, Claude should diagnose the likely cause and suggest the top 3 fixes.'",
      },
      {
        id: "s19",
        title: "Day 19 — Agent Orchestration",
        tag: "AI AGENT",
        tagColor: "#BF360C",
        date: "Day 19 — Thursday",
        concept: "Orchestration means multiple agents working together: a coordinator agent breaks down tasks and delegates to specialist agents. Each specialist has specific tools. The pattern scales beyond what a single context window can handle.",
        bookRefs: [],
        tasks: [
          "Read: docs.anthropic.com/en/docs/build-with-claude/agents",
          "AGENT: claude 'Build a multi-agent orchestration system with: (1) Orchestrator agent that receives tasks and delegates, (2) Linux agent with shell tools, (3) Analysis agent that interprets results, (4) Report agent that formats output as Markdown'",
          "Test with a complex task: 'Audit the security configuration of this server and produce a report'",
          "Add parallel execution: Linux agent and Analysis agent should run concurrently",
          "Add agent communication logging: each message between agents should be logged",
          "Test error propagation: what happens when a sub-agent fails?",
          "Measure total token usage vs single-agent approach",
          "Push to GitHub with architecture documentation",
        ],
        quiz: [
          "What is the advantage of multi-agent systems over single long prompts?",
          "What is the risk of giving agents shell command execution?",
          "How do you prevent an agent loop from running forever?",
          "What is 'prompt injection' in the context of agent tool calls?",
        ],
        claudePrompt: "Say: 'Day 19 — I've built a multi-agent system. Now help me add a human-in-the-loop checkpoint: before executing any destructive command, the orchestrator must ask me for confirmation.'",
      },
      {
        id: "s20",
        title: "Day 20–30 — Capstone + Portfolio Complete",
        tag: "CAPSTONE",
        tagColor: "#880E4F",
        date: "Days 20–30",
        concept: "The capstone synthesizes everything: Linux admin, Python scripting, Claude agents, REST APIs, Docker, CI/CD, and monitoring. Your portfolio should demonstrate a working system that solves a real problem and is deployed publicly.",
        bookRefs: [],
        tasks: [
          "Design your capstone: an AI-powered DevOps assistant for your own server",
          "Core features: natural language → shell commands, log analysis, deployment automation",
          "Build the CLI: devops-ai.py — takes natural language input, uses tool-use agent",
          "Tools: run_command, read_log, restart_service, check_health, deploy_app",
          "Safety layer: Claude must explain what it will do before executing",
          "Add web interface: Flask app with a chat UI (WebSocket for streaming)",
          "Dockerize everything: single docker-compose.yml to run the whole stack",
          "Set up CI/CD: GitHub Actions → Docker Hub → Auto-deploy to Render",
          "Set up monitoring: Prometheus metrics, log aggregation, AI-powered alerts",
          "Write technical README: architecture, setup, usage, examples",
          "Deploy the complete system publicly (Render or VPS)",
          "Record a 3-minute demo video showing the full system working",
          "Share on LinkedIn/Twitter with what you built in 30 days",
          "AGENT: claude 'Review my complete capstone project and give me an honest senior engineer assessment: what works well, what needs improvement, and what would you add for a v2?'",
        ],
        quiz: [
          "What was the hardest concept from the past 4 weeks and how did you overcome it?",
          "Describe your capstone architecture — what would you change if you started over?",
          "What is the most important security consideration in your deployed system?",
          "What would you build next to continue learning?",
        ],
        claudePrompt: "Say: 'I've completed the 30-day Linux to AI curriculum. Review everything I've built and help me write a compelling technical summary for my portfolio/LinkedIn that highlights the key skills I've demonstrated.'",
      },
    ],
  },
]

// Flat list of all sessions in order
export const ALL_SESSIONS = WEEKS.flatMap(w =>
  w.sessions.map(s => ({ weekId: w.id, sessionId: s.id, weekLabel: w.label }))
)

export function getSession(sessionId: string): Session | undefined {
  for (const week of WEEKS) {
    const session = week.sessions.find(s => s.id === sessionId)
    if (session) return session
  }
  return undefined
}

export function getWeekForSession(sessionId: string): Week | undefined {
  return WEEKS.find(w => w.sessions.some(s => s.id === sessionId))
}

export function getTotalTaskCount(): number {
  return WEEKS.flatMap(w => w.sessions.flatMap(s => s.tasks)).length
}

export function getSessionTaskKeys(sessionId: string): string[] {
  const session = getSession(sessionId)
  if (!session) return []
  return session.tasks.map((_, i) => `${sessionId}-${i}`)
}
