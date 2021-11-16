```
      _       _           _   
 _ __(_) __ _| |__   ___ | |_ 
| '__| |/ _` | '_ \ / _ \| __|
| |  | | (_| | |_) | (_) | |_ 
|_|  |_|\__, |_.__/ \___/ \__|
        |___/                 

```

**rigbot is a simple Discord bot to remote control the Hamlib TCP rig control daemon rigctld.**

rigctld is a is a radio control daemon that handles client requests via TCP sockets. All input to the rigbot Discord Bot is passed directly to rigctld. Likewise, the output of rigctld is shown in the Discord Chat.

**Installation**

rigbot requires a Node.js environment and a running and correctly set up rigctld instance. You can install rigbot using the npm package manager:

```
sudo npm install rigbot --global
```

Information about Hamlib and rigctld can be found here:

https://github.com/Hamlib/Hamlib/wiki/Documentation

At https://discord.com/developers you have to create a Discord app and an associated bot. See the Discord documentation for more information. 

Specify the necessary parameters when starting rigbot or adjust the settings in the `config.json` file included in this package. First of all you have to enter the bot token you got from Discord, e.g.:

```
rigbot -t YOUR_TOKEN_HERE
```

Replace "YOUR_TOKEN_HERE" with the token you got on the Discord developers page.

By default, rigbot expects a running rigctld server on localhost, TCP port 4532. 

For more information about the possible rigbot parameters call call:

```
rigbot -h
```

For a first test of rigctld you can start the rigctld from the console without any further parameters. rigctld then works with a dummy device.

Later you may want to run rigctld as a background service. This also applies to rigbot. If you don't want to do this, you can skip reading the next paragraph.

For the purpose of installation as a service the file `rigbot.service` is included to this package, which can be used as a basis for system-based operating systems. Adapt this file to your requirements and copy it to `/etc/systemd/systemv.` The rigbot application files are expected in `/usr/local/lib/node_modules/rigbot` if you have not specified this otherwise in the `rigbot.service` file. Then start rigbot with `systemctl start rigbot`. Enable it to run on boot by calling `systemctl enable rigbot`. 

**Usage**

rigbot forwards all input directly (and without further verification) to rigctld. In order for rigbot to recognize your command, you must prefix your command with the prefix `rig`.

For example (to set a frequency), if the rigctld command is

```
!F 145123345
```

in Discord you will need to write:

```
rig !F 145123345
```

**License**

MIT License
