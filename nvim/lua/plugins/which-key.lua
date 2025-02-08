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
	{ "<leader>m", "<cmd>Mason<cr>", desc = "Find File", mode = "n" },
	{ "<leader>fn", "<cmd>tabedit<cr>", desc = "New blank file", mode = "n" },
	{ "<leader>bd", "<cmd>tabclose<cr>", desc = "Close tab", mode = "n" },
	{ "<leader>e", "<cmd>Neotree filesystem toggle right<cr>", desc = "File tree", mode = "n" },
    },
}
