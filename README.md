# Hyprland Dot files 
Yash's dotfiles for Arch. Heavy inspiration taken from [Aylur's Dotfiles](https://github.com/Aylur/dotfiles), Updated to support agsv2. My agsv1 config is still available in the ags.old folder but it wont be getting anymore updates.

![1736253660](https://github.com/user-attachments/assets/ab0bc781-65cb-435d-af3e-33793bb2df18)
![1736253780](https://github.com/user-attachments/assets/1dcccd61-50e6-422d-910c-1052427bb618)
![1736253679](https://github.com/user-attachments/assets/f56dbf7f-e771-4c3e-abc6-55f0d55328ef)
![1736253592](https://github.com/user-attachments/assets/2dc1f064-ca5b-4023-8d5f-5f1799948ad6)

> [!CAUTION]
> READ THE [WARNING](#warning) BELOW


## WARNING

This config uses a script to create and remove a loopback device, which requires su privileges. I have already set this script to not require credentials and I trust it because I wrote it, but you should read the script and allow it to work on your system without credentials as well IF YOU WANT THIS FUNCTIONALITY. If you do not do this your widgets will freeze on clicking the button next to the themeswitcher, and only unfreeze when you restart your system. If you do not want this, comment the component out and the widgets will function normally. The component is called `VirtualCamButton` and is available at `.config/ags/widget/ControlCenter/widget/Options.tsx`.
IM NOT RESPONSIBLE IF YOU DO SOMETHING STUPID. EXERCISE CAUTION WHILE RUNNING SCRIPTS YOU FOUND ON THE INTERNET.

## Dependencies

You need to have these to make sure everything in my dotfiles works for you.

- [Hyprland](https://hyprland.org/)
- [agsv2](https://github.com/Aylur/ags)
- [v4l2loopback(for virtual cam for screensharing)](https://wiki.archlinux.org/title/V4l2loopback)
- gnome-bluetooth-3.0
- blueberry (for bluetooth)
- HyprPicker
- NetworkManager
- [pywal](https://github.com/dylanaraps/pywal)
- [grim](https://github.com/emersion/grim)
- [swappy](https://github.com/jtheoof/swappy)
- [slurp](https://github.com/emersion/slurp)
- [swww](https://github.com/LGFae/swww)
- Fcitx5 (Optional)
- JetBrains Mono NF (optional)
- Oh-my-zsh (optional)


## Usage

Clone the repo in your .config file. To load the ags widgets use ``` SUPER + S```. Other binds are available in the binds file in my hypr folder

## Customising the Ags widgets

Adding themes is a little unintuitive. It is somewhat like Next.js's app router. You need to create a folder in the `.config/theme` folder named after your theme. Then add your 1 folder and a file to it. The file will be called `Wallpaper.png` (any extension works doesn't NEED to be png) and the folder should be called `Colors`. Your wallper needs to be the file called `Wallpaper.png`, and in `Colors` you will have to place specific files to specify colors. An example can be seen below.

```
Gruvbox/
└── Wallpapers.png
└── Colors/
    ├── accent.#DC9547
    ├── green.#b8bb26
    ├── inactiveWs.#979274
    ├── purple.#d3869b
    ├── red.#fb4934
    ├── theme_alt_bg_color.#4C4D4F
    ├── theme_bg_color.#0E121B
    ├── theme_fg_color.#c8cbba
    └── yellow.#fabd2f
```

After doing this just reload Ags.

## Issues

Is something not working? Feel free to raise an issue and I'll try to help you as best as I can.
