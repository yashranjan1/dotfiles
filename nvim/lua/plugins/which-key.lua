return {
    "folke/which-key.nvim",
    event = "VeryLazy",
    opts = {
      -- your configuration comes here
      -- or leave it empty to use the default settings
      -- refer to the configuration section below
    },
    keys = {
	{ "<leader><leader>", "<cmd>Telescope find_files<cr>", desc = "Find File", mode = "n" },
    },
}
