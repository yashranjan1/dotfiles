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
	{ "<leader>bf", "<cmd>Telescope buffers<cr>", desc = "Find Buffer", mode = "n" },
	{ "<leader>m", "<cmd>Mason<cr>", desc = "Mason", mode = "n" },
	{ "<leader>bd", "<cmd>bd<cr>", desc = "Close buffer", mode = "n" },
	{ "<leader>bn", "<cmd>enew<cr>", desc = "New empty buffer", mode = "n" },
	{ "<leader>e", "<cmd>Neotree filesystem toggle right<cr>", desc = "File tree", mode = "n" },
    },
}
