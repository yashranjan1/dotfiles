return {
  "folke/noice.nvim",
  event = "VeryLazy",
  opts = {
   views = {
      cmdline_popup = {
        position = {
          row = 3,
        },
      },
    },
  },
  dependencies = {
    -- if you lazy-load any plugin below, make sure to add proper `module="..."` entries
    "MunifTanjim/nui.nvim",
    -- OPTIONAL:
    --   `nvim-notify` is only needed, if you want to use the notification view.
    --   If not available, we use `mini` as the fallback
    { "rcarriga/nvim-notify", opts = { top_down = false }}
    }
}
