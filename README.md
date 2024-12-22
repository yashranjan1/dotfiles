# Hyprland Dot files 
Yash's dotfiles for Arch. Heavy inspiration taken from [Aylur's Dotfiles](https://github.com/Aylur/dotfiles)

![Image one](https://raw.githubusercontent.com/yashranjan1/dotfiles/main/showcase/1725196233.png)
![Image two](https://raw.githubusercontent.com/yashranjan1/dotfiles/main/showcase/1725196177.png)
![Image three](https://raw.githubusercontent.com/yashranjan1/dotfiles/main/showcase/1725198911.png)


https://github.com/user-attachments/assets/65f9c045-56d4-4fca-8deb-851a3d128688



> [!NOTE]  
> Some features on the ags widgets are not complete and I still need to work on these. See the [WIP checklist](#features-i-want-to-add) below if you want to know what features still need work.


## Dependencies

You need to have these to make sure everything in my dotfiles works for you.

- [Hyprland](https://hyprland.org/)
- [ags](https://github.com/Aylur/ags)
- gnome-bluetooth-3.0
- blueberry
- [pywal](https://github.com/dylanaraps/pywal)
- [grim](https://github.com/emersion/grim)
- [swappy](https://github.com/jtheoof/swappy)
- [slurp](https://github.com/emersion/slurp)
- [swww](https://github.com/LGFae/swww)
- JetBrains Mono NF (optional)
- Oh-my-posh (optional)
- [Warp-terminal](https://github.com/warpdotdev/Warp) (optional)

## Usage

Clone the repo in your .config file. To load the ags widgets use ``` SUPER + R```. Other binds are available in the binds file in my hypr folder

## Customising the Ags widgets

You can add wallpapers and accent colors to the ags widgets. 

To add an accent color, go to the ```accentOptions.json``` file in the ```ags``` directory and add an entry in the following format:

```
"{ NAME }": {
    "dark": "{ HEX COLOR CODE FOR DARK MODE }",
    "light": "{ HEX COLOR CODE FOR LIGHT MODE}"
}

// Example

"Grayscale": {
    "dark": "#FFFFFF",
    "light": "#000000"
}
```


If you want to change the wallpaper switch animation, go to the ```wallpapers.json``` file in the ```ags``` directory and add an entry in the following format:

```
"{ LABEL FOR WP }": "{ PATH TO WP }"

// Example
"Samurai": ".config/wallpapers/samurai_bebop.png"
```

## Features I want to add

- [ ] Settings menu (the settings button in the control center does not do anything right now)
- [ ] Wifi Menu

## Issues

Is something not working? Feel free to raise an issue and I'll try to help you as best as I can.
