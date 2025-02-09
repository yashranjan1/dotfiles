import { App } from "astal/gtk3";
import Bar from "@Bar/Bar";
import { exec, execAsync, readFileAsync, Variable } from "astal";
import PowerMenu from "@Power/PowerMenu";
import ControlCenter from "@CC/ControlCenter";
import AppLauncher from "@/AppLauncher/AppLauncher";
import NotificationPopups from "@/Notification/Popups";
import CalendarCenter from "@/CalendarCenter/CalendarCenter";
import NotificationCenter from "@/NotificationCenter/NotificationCenter";
import { config, split, theme, themeOpts } from "./variables/theme-variables";
import VolumeControl from "@/VolumeControl/VolumeControl";
import WifiMenu from "@/WifiMenu/WifiMenu";
import NewNetwork from "@/NewNetwork/NewNetwork";
import { splitBar } from "./helpers/bar";

exec(["sass", "./style.scss", "/tmp/style.css"]);

// config creation

await readFileAsync(`${SRC}/currentTheme.json`).then((data) => {
  const parsed: { name: string; split: boolean } = JSON.parse(data);
  theme.set(parsed.name);
  split.set(parsed.split);
});

await execAsync(`../scripts/theme_generator.sh`).then(async (data) => {
  const parsed: Array<Config> = JSON.parse(data);
  config.set(parsed);

  themeOpts.set(parsed.map((t) => t.name));
});

const menuState = Variable<string>("none");

App.start({
  requestHandler(request: string, res: (response: any) => void) {
    if (request.startsWith("none")) {
      menuState.set("none");
      res("closed!");
    }

    if (request.startsWith("app-launcher")) {
      const newValue: string =
        "app-launcher-" +
        App.get_monitors()[Number(request.split("-")[2])].get_model();
      if (newValue === menuState.get()) {
        menuState.set("none");
        res("closed!");
        return;
      }
      menuState.set(newValue);
      res("opened!");
    }
  },
  css: "/tmp/style.css",
  icons: `${SRC}/icons`,
  main() {
    App.get_monitors().map((monitor) => {
      Bar({ gdkmonitor: monitor, menuState: menuState });
    });
    App.get_monitors().map((monitor) => {
      CalendarCenter({ gdkmonitor: monitor, menuState: menuState });
    });
    App.get_monitors().map((monitor) => {
      PowerMenu({ gdkmonitor: monitor, menuState: menuState });
    });
    App.get_monitors().map((monitor) => {
      ControlCenter({ gdkmonitor: monitor, menuState: menuState });
    });
    App.get_monitors().map((monitor) => {
      AppLauncher({ gdkmonitor: monitor, menuState: menuState });
    });
    App.get_monitors().map((monitor) => {
      NotificationCenter({ gdkmonitor: monitor, menuState: menuState });
    });
    App.get_monitors().map((monitor) => {
      VolumeControl({ gdkmonitor: monitor, menuState: menuState });
    });
    App.get_monitors().map((monitor) => {
      WifiMenu({ gdkmonitor: monitor, menuState: menuState });
    });
    App.get_monitors().map((monitor) => {
      NewNetwork({ gdkmonitor: monitor, menuState: menuState });
    });
    NotificationPopups(App.get_monitors()[0]);
  },
});
