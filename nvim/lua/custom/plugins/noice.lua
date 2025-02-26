return {
  'folke/noice.nvim',
  event = 'VeryLazy',
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
    'MunifTanjim/nui.nvim',
    {
      'rcarriga/nvim-notify',
      opts = {
        top_down = false,
      },
    },
  },
}
